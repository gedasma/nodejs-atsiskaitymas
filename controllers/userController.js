const User = require('./../models/userModel')

exports.getUsers = async (req,res)=>{
    try{
        const users = await User.find()
        res
        .status(200)
        .json({
            status:'success',
            results:users.length,
            data:{
              users
            }
        })
    }catch(err){
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
    
};

exports.getUser = async (req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        console.log(req.params.id)
        res
    .status(200)
    .json({
        status:'success',
        data:{
            user
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