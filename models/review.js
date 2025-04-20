import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    rating:{
        type:String,
        required:true
    },
    comment:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true,
        default:Date.now()
    },
    isApproved:{
        type:Boolean,
        required:true,
        default:false
    },
    profilePicture:{
        type:String,
        required:true,
        default:"https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png"
    },
    product:{
        type:String,
        required:true
    },
    productName:{
        type:String,
        required:true
    }
})

const Review = mongoose.model("review",reviewSchema);

export default Review;