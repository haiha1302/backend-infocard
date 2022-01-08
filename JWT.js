const res = require('express/lib/response')
const jwt = require('jsonwebtoken')
const { db } = require('./database')

const createToken = user => {
    const accessToken = jwt.sign({
        username: user.username,
    },
    process.env.SECRET_KEY
    )
    return accessToken
}

const validateToken = (req, res) => {
    const accessToken = req.cookies['access-token']
    
    if (!accessToken) {
        return res.status(400).json({
            Error: 'User not Authenticated!!!'
        })
    }

    jwt.verify(
        accessToken,
        process.env.SECRET_KEY,
        async (err, decoded) => {
            if (err) {
                res.status(401).send('Invalid JWT')
            } else {
                const username = decoded.username
                const user = await db.users.findOne({
                    username: username
                })
                req.authenticated = true;
                if (user) {
                    res.json({
                        username: user.username,
                        _id: user._id,
                        salt: user.salt,
                        hashed: user.hashed
                    })
                } else {
                    res.status(401).send('User not found!!!')
                }
            }
        }
    )
}

module.exports = { createToken, validateToken }