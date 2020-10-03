const User = require('../models/user'),
bcrypt = require('bcrypt'),
passport = require('passport')

module.exports = {
    show_signup: (req, res) => {
        res.render('main/signup', {title:"Ro'yxatdan o'tish"})
    },

    signup: (req, res) => {

        req.check('name').notEmpty().trim().withMessage("Ism bo'sh bo'lmasin...")
        req.check('email').notEmpty().withMessage("Email bo'sh bo'lmasin...")
        req.check('email').isEmail().trim().withMessage("Email formati to'g'ri emas...")
        req.check('username').notEmpty().trim().withMessage("username bo'sh bo'lmasin...")
        req.check('password').isLength({min:6}).withMessage("Parol 6ta belgindan kam bo'lmasin...")
        req.check('password2').equals(req.body.password).withMessage("Parollar mos emas...")

        req.getValidationResult()
        .then(errors => {
            
            User.findOne({email:req.body.email})
            .then(data => {
                if(data){
                    req.flash('error', 'Bunday email mavjud...')
                    res.redirect('/signup')
                } else {
                    if(!errors.isEmpty()){
                        let error = errors.array().map(e => e.msg)
                        req.flash('error', error)
                        res.redirect('/signup')
                    } else {
                        let user = new User()
                        user.name = req.body.name 
                        user.email = req.body.email
                        user.username = req.body.username
                        user.password = req.body.password

                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(user.password, salt, (err, hash) => {
                                if(err) throw err

                                user.password = hash

                                user.save((err, data) => {
                                    if(err) throw err
                                    req.flash('success', `${data.name} ismli User muvofaqiyatli yaratildi. Iltimos signin qiling...`)
                                    res.redirect('/signin')
                                })                        
                            })
                        })
                    }                    
                }
            })
            .catch(error => {console.error(error)})
        })
    },

    show_signin: (req, res) => {
        res.render('main/signin', {title:"Sign In"})
    },

    signin: (req, res, next) => {
        passport.authenticate('local', {
            successRedirect: "/",
            failureRedirect: "/signin",
            failureFlash: true
        })(req, res, next)
    },

    log_out: (req, res) => {
        req.logout()
        req.flash('success', 'User log out boldi...')
        res.redirect('/signin')
    }
}