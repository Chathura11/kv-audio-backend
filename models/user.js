import mongoose from "mongoose";


const UserSchema =new mongoose.Schema({

    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        default:"customer"
    },
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    profilePicture:{
        type:String,
        required:true,
        default:"https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png"
    }

});


const User = mongoose.model("user",UserSchema);

export default User;