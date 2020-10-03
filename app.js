const express = require('express'),
bodyParser = require('body-parser'),
layout = require('express-ejs-layouts'),
mongoose = require('mongoose'),
session = require('express-session'),
cookieParser = require('cookie-parser'),
flash = require('express-flash'),
validat = require('express-validator'),
passport = require('passport'),
app = express()

mongoose.connect("mongodb://localhost/authen", {useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify: false})
mongoose.connection.once('open', () => {console.log("Running. BaseName: authen")})
mongoose.Promise = global.Promise

mongoose.set('useFindAndModify', false)
app.set('port', process.env.PORT || 9090)
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(validat())
app.use(express.static('public'))
app.use(layout)

app.use(cookieParser('it'))
app.use(session({
    secret:'pishik',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    },
    resave:false,
    saveUninitialized:false
}))
app.use(flash())

require('./config/passport')(passport)
app.use(passport.initialize())
app.use(passport.session())

app.get('*', (req, res, next) => {
    res.locals.user = req.user || null
    next()
})

const router = require('./routes/route'),
userRouter = require('./routes/userRoute')

app.use(router)
app.use(userRouter)

app.listen(app.get('port'), () => {
    console.log("Port: 9090")
})