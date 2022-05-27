const passport = require('passport');
const User = require("../models/User");

const setUpPassport = ()=>{

    passport.serializeUser((user,done) =>
        done(null,{id:user._id,username:user.username})
    )
    passport.deserializeUser(async(user,done) =>{
        try {
            const userDB = await User.findById(user.id);
            return userDB ? done(null,{id:userDB._id,username:userDB.username}) : done(null,null);
        } catch (error) {
            return done(error,null);
        }
    })
}


module.exports = setUpPassport;