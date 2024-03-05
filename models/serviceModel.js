const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, 'Car service must have a name'],
        unique:true
    },
    address:{
        type:String,
        required:[true, 'Car service must have an address']
    },
    owner:{
        type:String,
        required:[true, 'Car service must have a owner']
    }
}
)

const Service = mongoose.model('Service', serviceSchema)

module.exports = Service;