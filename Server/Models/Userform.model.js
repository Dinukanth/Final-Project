// models/UserForm.model.js
const mongoose = require("mongoose");

const UserFormSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    YourVehicle: {
        type: String,
        required: true
    },
    VehicleIssue: {
        type: String,
        required: true
    },
    Livelocation: {
        type: {
            latitude: Number,
            longitude: Number
        },
        required: true
    }
});

const UserForm = mongoose.model('UserForm', UserFormSchema);
module.exports = UserForm;













