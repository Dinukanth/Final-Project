const Mongoose =require("mongoose");
const orderSchema = new Mongoose.Schema({
    orderID: {
        type: String,
        require: true,

    },
    userID: {
        type: String,
        require: true,
    },
    mechanicID:{
        type: String,
        require:true
    },
    Email:{
        type: String,
        require:true
    },
    Password:{
        type: String,
        require:true
    }
})

const Ordermodel = Mongoose.model('Order', orderSchema)
module.exports = Ordermodel