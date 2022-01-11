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
app.set('trust proxy', 1)

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,content-type,set-cookie');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     // Pass to next layer of middleware
//     next();
//   });

app.use(express.json())
app.use(cookieParser());

app.use(cookieSession({
    name: 'access-token',
    keys: [process.env.COOKIE_KEY],
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(cors({
    origin: 'https://infocard-70df1.web.app',
    // origin: '*',
    methods: 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    credentials: true,
    exposedHeaders: ['Set-cookie']
}))

app.use('/auth', authRouter)
app.use('/profile', profileRouter)
app.use('/profile', express.static('Images'), profileRouter)

app.get('/', (req, res) => res.json('Welcome!!!'))

connectToMongo()

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
})