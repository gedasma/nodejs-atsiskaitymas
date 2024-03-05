const express = require('express')
const router = express.Router()
const authController = require('./../controllers/authController')
const userController = require('./../controllers/userController')

router.post('/signup', authController.signup)
router.post('/login', authController.login)

router.route('/').get(
    authController.protect,
    authController.restrictTo('admin'),
    userController.getUsers)
router.route('/:id').get(
    authController.protect,
    authController.restrictTo('admin'),
    userController.getUser)

module.exports = router