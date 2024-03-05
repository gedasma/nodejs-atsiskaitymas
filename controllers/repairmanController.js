const fs = require('fs')
const Repairman = require('./../models/repairmanModel')
const Service = require('./../models/serviceModel')
const APIFeatures = require('../utils/apiTools')
const User = require('./../models/userModel')
const {promisify} = require('util')

exports.checkBody = (req, res, next) =>{
    if(!req.body.name || !req.body.room_price){
        return res.status(400).json({
            status:'failed',
            message:'Missing name or price'
        })
    }

    next()
}

exports.getAllRepairmans = async (req,res)=>{
    try{
        const repairmansData = new APIFeatures(Repairman.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate()

        const repairmans = await repairmansData.query
        res
        .status(200)
        .json({
            status:'success',
            results:repairmans.length,
            data:{
              repairmans
            }
        })
    }catch(err){
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
    
};
 
exports.createRepairman = async (req, res)=>{
    try{
        const service = await Service.findById(req.body.service)
        if(!service){
            throw new Error("This service does not exist")
        }
        req.body.user = req.user.id
        const newRepairman = await Repairman.create(req.body)
        res
        .status(201)
        .json({
            status:'success',
            message: "New repairman created",
            data: newRepairman
        })
    }catch(err){
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
};
 
exports.getRepairman = async (req,res)=>{
    try{
        const repairman = await Repairman.findById(req.params.id).populate({path:'user'}).populate({path:'service'})
        res
    .status(200)
    .json({
        status:'success',
        data:{
            repairman
        }
    })
    }
    catch(err){
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
 
};
 
exports.updateRepairman = async (req,res)=>{
    try{
        const repairman = await Repairman.findByIdAndUpdate(req.params.id, req.body, {
            new:true,
            runValidators: true
        })
        res
        .status(200)
        .json({
            status:'success',
            message: "Repairman Updated",
            data: {
                repairman
            }
    })
    }
    catch(err){
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
    
};

exports.creatorAccess = async (req,res,next)=>{
    try{
        const user = await User.findById(req.user.id)
        console.log(user.role)
        const checkRepairman = await Repairman.findById(req.params.id)
        if(req.user.id != checkRepairman.user ){
            if(user.role != "admin"){
                throw new Error("You do not have access to this repairman post")
            }
        }
        next()
    }catch(err){
        res.status(400).json({
            status:'failed',
            error:err.message
        })
    }
    
}
 
exports.deleteRepairman = async (req,res)=>{
    try{
        await Repairman.findByIdAndDelete(req.params.id)
        res
        .status(200)
        .json({
            status:'success',
            message: "Repairman deleted",
            data: null
    })
    }
    catch(err){
        res.status(404).json({
            status: 'failed',
            message: err
        })
    }
    
};
