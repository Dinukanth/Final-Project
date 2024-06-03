const Mongoose =require("mongoose");
const reviewSchema = new Mongoose.Schema({
    userID: {
        type: String,
        require: true,
        unique:true
    },
    mechanicID:{
        type: String,
        require:true
    },
   
})

const reviewModel = Mongoose.model('Review', reviewSchema)
module.exports = reviewModel