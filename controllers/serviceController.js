const fs = require('fs')
const Service = require('./../models/serviceModel')
const APIFeatures = require('../utils/apiTools')

exports.getAllServices = async (req,res)=>{
    try{
        const servicesData = new APIFeatures(Service.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate()

        const services = await servicesData.query
        res
        .status(200)
        .json({
            status:'success',
            results:services.length,
            data:{
              services
            }
        })
    }catch(err){
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
    
};
 
exports.createService = async (req, res)=>{
    try{
        const newService = await Service.create(req.body)
        res
        .status(201)
        .json({
            status:'success',
            message: "New service created",
            data: newService
        })
    }catch(err){
        res.status(404).json({
            status: 'failed',
            message: err
        })
    }
};
 
exports.getService = async (req,res)=>{
    try{
        const service = await Service.findById(req.params.id)
        res
    .status(200)
    .json({
        status:'success',
        data:{
            service
        }
    })
    }
    catch(err){
        res.status(404).json({
            status: 'failed',
            message: err
        })
    }
 
};
 
exports.updateService = async (req,res)=>{
    try{
        const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
            new:true,
            runValidators: true
        })
        res
        .status(200)
        .json({
            status:'success',
            message: "Service Updated",
            data: {
                service
            }
    })
    }
    catch(err){
        res.status(404).json({
            status: 'failed',
            message: err
        })
    }
    
};
 
exports.deleteService = async (req,res)=>{
    try{
        await Service.findByIdAndDelete(req.params.id)
        res
        .status(200)
        .json({
            status:'success',
            message: "Service deleted",
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

// exports.checkID = (req, res, next) => {
//     const service = services.find((service) => service.id == req.params.id);
//     if (req.params.id > services.length)
//     {
//         res.status(404).json({
//             status: 'failure',
//             message: 'invalid ID',
//         })
 
//         return
//     }
 
//     req.service = service
//     next()
// }