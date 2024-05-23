const Mongoose =require("mongoose");
const UserSchema = new Mongoose.Schema({
    // userID: {
    //     type: String,
    //     // require: true,
    //     // unique:true
    // },
    Name:{
        type: String,
        // require:true
    },
    Email:{
        type: String,
        require:true,
        unique:true

    },
    Password:{
        type: String,
        // require:true
    },
    role: {
        type: String,
        enum: ["user", "mechanic", "admin"], // Possible roles
        default: "user" // Default role is "user"
    }

})

const User = Mongoose.model('User', UserSchema)
module.exports = User