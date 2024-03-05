const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'user',
        required: [true, 'there must be a user liking'],
    },
    repairman:{
        type:mongoose.Schema.ObjectId,
        ref:'Repairman',
        required: [true, 'like must have a repairman'],
        validate: {
            validator: async function(value) {
                const service = await mongoose.model('Repairman').findById(value);
                return !!service;
            },
            message: 'Repairman does not exist'
        }
    }
}
)

const Like = mongoose.model('Like', likeSchema)

module.exports = Like;