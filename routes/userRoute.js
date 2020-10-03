const express = require('express'),
router = express.Router()

const userController = require('../controllers/userController')

router.get('/signup', userController.show_signup)
router.post('/signup', userController.signup)
router.get('/signin', userController.show_signin)
router.post('/signin', userController.signin)
router.get('/signout', userController.log_out)

module.exports = router