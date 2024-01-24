const mongoose = require("mongoose")

// const randomUUID = require("crypto") ;

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        Required:true
    },
    email:{
        type:String,
        Unique:true
    },
    password:{
        type:String,
        required:true
    },
    

})

const UserModel = mongoose.model("User",userSchema)
module.exports = UserModel