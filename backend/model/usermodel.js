import mongoose from "mongoose";
const userSchema = new mongoose.Schema({

    firstName:{
        type:String,
        
    },
      lastName:{
        type:String,
        
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
    },
     comfirmPassword:{
        type:String,
    }
  
},{timestamps:true})

const User = mongoose.model("User",userSchema)
export default User;