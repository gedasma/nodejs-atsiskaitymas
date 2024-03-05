const express = require('express')
const router = express.Router({mergeParams:true})
const likeController = require('../controllers/likeController')
const authController = require('../controllers/authController')

router
.route('/')
.get(authController.protect,
    likeController.isPostLiked)
.post(authController.protect,
    likeController.likeRepairman)
.delete(authController.protect,
    likeController.unlikeRepairman)
router
.route('/getAll')
.get(likeController.getLikeCount)
module.exports = router