const Mongoose =require("mongoose");
const paymentSchema = new Mongoose.Schema({
    paymentID:{
        type: String,
        

    },
    userID: {
        type: String,
        // require: true,
        // unique:true
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

const paymentModel = Mongoose.model('Payment', paymentSchema)
module.exports = paymentModel