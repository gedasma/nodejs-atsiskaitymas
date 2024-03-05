const express = require('express')
const router = express.Router()
const repairmanController = require('../controllers/repairmanController')
const authController = require('../controllers/authController')
const likeRouter = require('./../routes/likeRoutes')

router.route('/')
.get(repairmanController.getAllRepairmans)
.post(
    authController.protect,
    repairmanController.createRepairman)

router.route('/:id')
    .get(repairmanController.getRepairman)
    .patch(
        authController.protect,
        repairmanController.creatorAccess,
        repairmanController.updateRepairman)
    .delete(
        authController.protect,
        repairmanController.creatorAccess,
        repairmanController.deleteRepairman)
        
router.use('/:repairmanId/likes', likeRouter)
module.exports = router