const Mongoose =require("mongoose");
const UserSchema = new Mongoose.Schema({
   
    Name:{
        type: String,
        require:true
    },
    Email:{
        type: String,
        require:true,
        unique:true

    },
    Password:{
        type: String,
        require:true
    },
    role: {
        type: String,
        enum: ["user", "mechanic", "admin"],
        default: "user" 
    }

})

const User = Mongoose.model('User', UserSchema)
module.exports = User