const session = require('express-session');
const clientDB = require('../database/db');
const dotenv = require('dotenv');
const MongoStore = require('connect-mongo');

dotenv.config();

const setUpSession = (app) => {
    console.log('session');
    app.use(session({
        secret:process.env.SESSION_KEY,
        resave:false,
        saveUninitialized:false,
        cookie:{
            maxAge:60000 * 60 * 24 * 7,
        },
        store:MongoStore.create({
            clientPromise:clientDB,
        })
    }))
}
module.exports = setUpSession;