// const mongoose = require("mongoose");

// const mechanicSchema = new mongoose.Schema({
//     Name: {
//         type: String,
//         required: true
//     },
//     Email: {
//         type: String,
//         required: true
//     },
//     Password: {
//         type: String,
//         required: true
//     },
//     WhatkindofMechanic: {
//         type: String,
//         required: true
//     },
//     Phonenumber: {
//         type: Number,
//         required: true
//     },
//     Address: {
//         type: String,
//         required: true
//     },
//     role: {
//         type: String,
//         enum: ["user", "mechanic", "admin"],
//         default: "mechanic"
//     },
//     latitude: {
//         type: Number,
//         required: true
//     },
//     longitude: {
//         type: Number,
//         required: true
//     }
// });

// const mechanicModel = mongoose.model('Mechanic', mechanicSchema);
// module.exports = mechanicModel;

















const Mongoose =require("mongoose");
const mechanicSchema = new Mongoose.Schema({

    // MechanicID: {
    //     type: String,
        // require: true,
    //     unique:true
    // },
    Name:{
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
    },
    WhatkindofMechanic:{
        type: String,
        require: true
    },
    Phonenumber:{
        type:Number,
        require: true
    },
    Address:{
        type: String,
        require: true

    },
    role: {
        type: String,
        enum: ["user", "mechanic", "admin"], // Possible roles
        default: "mechanic" // Default role is "mechanic"
    }

})

const mechanicModel = Mongoose.model('Mechanic', mechanicSchema);
module.exports = mechanicModel;