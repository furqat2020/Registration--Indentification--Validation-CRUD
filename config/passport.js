const bcrypt = require('bcrypt'),
localStrategy = require('passport-local'),
User = require('../models/user')

module.exports = function (passport){
    passport.use(new localStrategy(function(username, password, done){
        let query = {username:username}
        User.findOne(query, (err, user) => {
            if(err) throw err
            if(!user){
                return done(null, false, {message:"User topilmadi..."})
            }

            bcrypt.compare(password, user.password, (err, isMatch) => {
                if(err) throw err
                if(isMatch){
                    return done(null, user)
                } else {
                    return done(null, false, {message:"Parol xato..."})
                }
            })
        })
    }))

    passport.serializeUser(function(user, done){
        done(null, user.id)
    })

    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
            done(err, user)
        })
    })
}