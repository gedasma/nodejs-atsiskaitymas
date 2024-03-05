const mongoose = require('mongoose')

const repairmanSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required: [true, 'Repairman must have a first name'],
    },
    lastName:{
        type:String,
        required: [true, 'Repairman must have a last name'],
    },
    specialization:{
        type:String,
        required:[true, 'Repairman must have a specialization']
    },
    profileImage:{
        type:String
    },
    city:{
        type:String,
        required:[true, 'Repairman must have a city']
    },
    service:{
        type:mongoose.Schema.ObjectId,
        ref:'Service',
        required: [true, 'Repairman must belong to a service'],
        validate: {
            validator: async function(value) {
                const service = await mongoose.model('Service').findById(value);
                return !!service;
            },
            message: 'Service does not exist'
        }
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required: [true, 'Repairman must be created by a user']
    }
},
{
    toJSON: {virtuals:true},
    toObject: {virtuals: true}
}
)

// repairmanSchema.pre(/^find/, function(next){
//     this.populate({
//         path:'service',
//         select:'name'
//     })
//     .populate({
//         path:'user',
//         select:'name'
//     })

//     next()
// })


const Repairman = mongoose.model('Repairman', repairmanSchema)

module.exports = Repairman;