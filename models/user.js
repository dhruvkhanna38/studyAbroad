const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String , 
        default : 0 , 
        required : true , 
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Not a valid email");
            }
        }
    },
    subject:{
        type : String,
        default:0,
        required:true
    } ,
    message :{
        type : String,
        default:0,
        required:true
    }
});

const User = mongoose.model("User" , userSchema);


module.exports = User;