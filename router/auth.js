const express = require('express')
const passport = require('passport')
const authController = require('../controller/authController')
const { createToken, validateToken } = require('../JWT')
const router = express.Router()

const ORIGINAL_URL = process.env.ORIGINAL_URL

router.post("/login", async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    try {
        const user = await authController.login(username, password)
        const token = createToken(user)

        res.cookie("access-token", token, {
            maxAge: 24 * 60 * 60 * 1000,
            secure: true,
            httpOnly: false,
            sameSite: 'none'
        });

        res.json({
            user: {
                username: user.username,
                _id: user._id
            },
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

router.get('/login/success', validateToken, (req, res) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            message: 'successful',
            user: req.user
        })
    }
})

router.get('/login/oauth', (req, res) => {
    console.log(req);
    if (req.user) {
        res.status(200).json({
            success: true,
            message: 'successful',
            user: req.user
        })
    }
})

router.get('/login/failed', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'failure'
    })
})

router.post('/logout', (req, res) => {
    res.cookie('access-token', 'none', {
        expires: new Date(Date.now() + 1000),
        secure: true,
        httpOnly: false,
        sameSite: 'none'
    })
    res
        .status(200)
        .json({ success: true, message: 'User logged out successfully' })

    // req.logout()
    // res.status(200).clearCookie('access-token', {
    //     path: '/',
    //     secure: false,
    //     httpOnly: true,
    //     sameSite: true,
    //   });
    // res.redirect(process.env.TRUSTED_URL)
})

// Login with Google
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}))

router.get('/google/callback', passport.authenticate('google', {
    successRedirect: ORIGINAL_URL,
    failureRedirect: '/login/failed'
}))
//

// Login with Github
router.get('/github', passport.authenticate('github', {
    scope: ['profile']
}))

router.get('/github/callback', passport.authenticate('github', {
    successRedirect: ORIGINAL_URL,
    failureRedirect: '/login/failed'
}))
//

module.exports = router;
