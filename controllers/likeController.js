const Like = require('../models/likeModel')
 
exports.likeRepairman = async (req, res)=>{
    try{
        const newLike = {
            user: req.user.id,
            repairman: req.params.repairmanId
        }

        const existingLike = await Like.findOne(newLike);
        if(existingLike){
            throw new Error("Already liked this post")
        }

        await Like.create(newLike)

        res
        .status(201)
        .json({
            status:'success',
            message: "repairman liked",
            data: newLike
        })
    }catch(err){
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
};

exports.unlikeRepairman = async (req,res)=>{
    try{
        const likeToCheck = {
            user: req.user.id,
            repairman: req.params.repairmanId
        }

        const existingLike = await Like.findOne(likeToCheck);
        
        if(!existingLike){
            throw new Error("Repairman is not liked")
        }
        await Like.findByIdAndDelete(existingLike._id)

        res
        .status(200)
        .json({
            status:'success',
            message: "Repairman unliked",
            data: null
    })
    }
    catch(err){
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
    
};

exports.isPostLiked = async (req,res)=>{
    try{
        let result = "repairman is not liked"
        let resultdata = false

        const newLike = {
            user: req.user.id,
            repairman: req.params.repairmanId
        }

        const existingLike = await Like.findOne(newLike);
        if(existingLike){
            result = "repairman is liked"
            resultdata = true
        }
        res
    .status(200)
    .json({
        status:'success',
        results:result,
        data:resultdata
    })
    }
    catch(err){
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
 
};
 
exports.getLikeCount = async (req,res)=>{
    try{
        const allLikes = await Like.find({repairman: req.params.repairmanId})
        res
    .status(200)
    .json({
        status:'success',
        results:"repairman profile like count:" + allLikes.length,
        data: allLikes.length
    })
    }
    catch(err){
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
 
};