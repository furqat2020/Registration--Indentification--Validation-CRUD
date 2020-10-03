const Article = require('../models/article'),
User = require('../models/user')

module.exports = {

    show_home: (req, res) => {
        Article.find({}, (error, data) => {
            if(error) throw error
            res.render("main/index", {data:data, title:"Bosh sahifa"})
        })  
    },

    show_add: (req, res) => {
        res.render('main/add', {title: "Artikl qo'shish"})
    },

    add: (req, res) => {

        req.check('title').isLength({min:1}).trim().withMessage('Title b`osh bo`lmasligi kerak...'),
        req.check('author').isLength({min:1}).trim().withMessage('Avtor bo`sh bo`lmasligi kerak...'),
        req.check('body').isLength({min:1}).trim().withMessage('Body bo`sh bo`lmasligi kerak...')

        req.getValidationResult()
        .then(errors => {
            if(!errors.isEmpty()){
                var arr = errors.array().map(e => e.msg)
                req.flash('error', arr)
                res.redirect('/add')
            } else {
        
            var article = new Article()
            article.title = req.body.title
            article.author = req.body.author
            article.body = req.body.body
            article.user_id = req.user._id

            article.save((error) => {
                if(error) throw error

                req.flash("success", "Ma'lumot muvofaqiyatli qo'shildi.")
                res.redirect("/")

            })}
        })
    },

    show_article: (req, res) => {
        let id = req.params.id
        Article.findById(id, (error, data) => {
            if(error) throw error

            res.render('main/article', {data:data, title:"Artikllar"})
        })
    }, 

    show_edit: (req, res) => {
        Article.findOne({_id:req.params.id}, (error, data) => {
            if(error) throw error

            if(data.user_id.toString() == req.user._id.toString()){
                res.render("main/edit", {title:"Edit User", data:data})
            } else {
                req.flash('error', 'Siz bu artiklni o`zgartira olmaysiz...')
                res.redirect("/")
            }
        })
    },

    edit: (req, res) => {

        let id = req.params.id

        let dat = {
            title:req.body.title,
            author:req.body.author,
            body:req.body.body
        }

        Article.findOneAndUpdate({_id:id}, dat, (error) => {
            if(error) throw error

            req.flash("success", "Ma'lumot muvofaqiyatli o'zgartirildi.")
            res.redirect("/article/"+id)
        })
    },

    delete: (req, res) => {
        let id = req.params.id
        Article.findOneAndDelete({_id:id}, (error) => {
            if(error) throw error

            res.json('success')
        })
    },

    ensureAuthenticated: function(req, res, next) {
        if(req.isAuthenticated()){
            return next()
        } else {
            req.flash('error', 'Iltimos sign in qiling...')
            res.redirect('/signin')
        }
    }
}