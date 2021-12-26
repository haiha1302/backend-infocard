const jwt = require('jsonwebtoken')
const { db } = require('./database')

const createToken = user => {
    const accessToken = jwt.sign({
        username: user.username,
    },
    process.env.SECRET_KEY,
    {
        expiresIn: 3600
    }
    )
    return accessToken
}

const validateToken = (req, res, next) => {
    const accessToken = req.headers.authorization

    if (!accessToken) {
        return res.status(400).json({
            Error: 'User not Authenticated!!!'
        })
    }

    const jwtStr = accessToken.split(' ')[1]

    jwt.verify(
        jwtStr,
        process.env.SECRET_KEY,
        async (err, decoded) => {
            if (err) {
                res.status(401).send('Invalid JWT')
            } else {
                const username = decoded.username
                const user = await db.users.findOne({
                    username: username
                })

                if (user) {
                    res.json({
                        username: user.username
                    })
                } else {
                    res.status(401).send('User not found!!!')
                }
            }
        }
    )
}

module.exports = { createToken, validateToken }