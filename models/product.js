import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    key:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true,
        default:"uncategorized"
    },
    dimensions:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    availability:{
        type:Boolean,
        required:true,
        default:true
    },
    image:{
        type:[String],
        required:true,
        default:["https://apollobattery.com.au/wp-content/uploads/2022/08/default-product-image.png"]
    }
})


const Product = mongoose.model("product",productSchema);

export default Product;