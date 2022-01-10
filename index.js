const express = require("express")
const cors = require ("cors")
const dotenv = require('dotenv')
const authRouter = require('./router/auth')
const profileRouter = require('./router/profile')
const cookieSession = require('cookie-session')
const passport = require('passport')
const cookieParser = require("cookie-parser");

require('./passportConfigs')

const { connectToMongo } = require('./database')

dotenv.config()

const ORIGINAL_URL = process.env.TRUSTED_URL

const app = express()

app.use(express.json())
app.use(cookieParser());

app.use(cookieSession({
    name: 'access-token',
    keys: [process.env.COOKIE_KEY],
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(cors({
    origin: ORIGINAL_URL,
    methods: 'GET, POST, PUT, DELETE',
    credentials: true
}))

app.use('/auth', authRouter)
app.use('/profile', profileRouter)
app.use('/profile', express.static('Images'), profileRouter)

app.get('/', (req, res) => res.json('Welcome!!!'))

connectToMongo()

app.listen(process.env.PORT, () => {
    console.log("App is running at 5000");
})