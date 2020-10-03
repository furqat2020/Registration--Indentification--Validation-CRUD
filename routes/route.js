const express = require('express'),
router = express.Router()

const articleController = require("../controllers/articleController")

router.get("/", articleController.show_home)
router.get("/add", articleController.ensureAuthenticated, articleController.show_add)
router.post("/add", articleController.add)
router.get("/article/:id", articleController.show_article)
router.get("/edit/:id", articleController.ensureAuthenticated, articleController.show_edit)
router.post("/edit/:id", articleController.edit)
router.delete("/delete/:id", articleController.delete)

module.exports = router