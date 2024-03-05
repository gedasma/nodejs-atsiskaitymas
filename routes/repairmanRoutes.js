const express = require('express')
const router = express.Router()
const repairmanController = require('../controllers/repairmanController')
const authController = require('../controllers/authController')

router
.route('/')
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
module.exports = router