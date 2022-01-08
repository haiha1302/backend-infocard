const { MongoClient } = require('mongodb')
require('dotenv').config();

const url = process.env.DATABASE_URL || 'mongodb://localhost:27017'
const client = new MongoClient(url)

const db = {}
const dbProfile = {}

const connectToMongo = async () => {
    await client.connect()
    console.log('DB connected!!!');

    const database = client.db('InfoCard')
    db.users = database.collection('users')

    dbProfile.profiles = database.collection('Profiles')
}

module.exports = { connectToMongo, db, dbProfile }
