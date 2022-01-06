const GoogleStratery = require('passport-google-oauth20').Strategy
const GithubStratery = require('passport-github2').Strategy
// const DiscordStratery = require('passport-discord').Strategy
const passport = require('passport')
const { db } = require('./database')

require('dotenv').config()

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

// lOGIN WITH GOOGLE ACCOUNT
passport.use(
    new GoogleStratery({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
        return done(null, profile)
        // const newUser = {
        //     googleId: profile.id,
        //     displayName: profile.displayName,
        //     firstName: profile.name.givenName,
        //     lastName: profile.name.familyName,
        //     image: profile.photos[0].value
        // }
        // console.log(newUser);
        // try {
        //     const user = await db.users.findOne({
        //         googleId: profile.id
        //     })

        //     if (user) {
        //         return done(null, user)
        //     } else {
        //         const insertNewUser = await db.users.insertOne(newUser)
        //         return done(null, insertNewUser)
        //     }
        // } catch (err) {
        //     console.log(err);
        // }
    })
)
//

// LOGIN WITH GITHUB ACCOUNT
passport.use(
    new GithubStratery({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: '/auth/github/callback'
    },
    (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        return done(null, profile)
    })
)

// passport.use(
//     new DiscordStratery({
//         clientID: process.env.DISCORD_CLIENT_ID,
//         clientSecret: process.env.DISCORD_CLIENT_SECRET,
//         callbackURL: '/auth/discord/callback'
//     },
//     (accessToken, refreshToken, profile, done) => {
//         console.log(profile);
//         return done(null, profile)
//     })
// )