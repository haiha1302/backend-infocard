const express = require("express")
const cors = require ("cors")
const dotenv = require('dotenv')
const authApi = require('./api/auth')

const { connectToMongo } = require('./database')

dotenv.config()

const app = express()

app.use(cors({
    origin: "http://localhost:3000"
}))

app.use(express.json())

app.use('/auth', authApi)

connectToMongo()

app.listen(5000, () => {
    console.log("App is running at 5000");
})