


const Mongoose = require("mongoose");

const mechanicSchema = new Mongoose.Schema({
    Name: {
        type: String,
        require: true
    },
    Email: {
        type: String,
        require: true
    },
    Password: {
        type: String,
        require: true
    },
    WhatkindofMechanic: {
        type: String,
        require: true
    },
    Phonenumber: {
        type: Number,
        require: true
    },
    Address: {
        type: String,
        require: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "mechanic", "admin"],
        default: "mechanic"
    },
    accept: {
        type: String,
        enum: ['accept','pending','decline'],
        default: "pending"

    }
});

const mechanicModel = Mongoose.model('Mechanic', mechanicSchema);
module.exports = mechanicModel;






