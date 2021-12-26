const express = require('express')
const authController = require('../controller/authController')
const { createToken, validateToken } = require('../JWT')
const router = express.Router()

router.post("/login", async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    try {
        const user = await authController.login(username, password)
        const token = createToken(user)
        res.json({
            user: {
                username: user.username
            },
            token: token
        })
    } catch (error) {
        res.status(401).send(error.message)
    }
});

router.post("/register", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const users = await authController.register(username, password);
        res.json(users);
    } catch (error) {
        res.status(401).send(error.message);
    }
});

router.get('/me', validateToken, (req, res) => {
    // const token = req.headers.authorization

    // if (!token) {
    //     res.status(401).send('JWT is missing!!!')
    //     return
    // }
    res.json('me')
})

module.exports = router;
