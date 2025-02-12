import mongoose from "mongoose";
 
const studentSchema = mongoose.Schema({
    name:String,
    age:Number,
    height:Number
});

const Student = mongoose.model("student",studentSchema);

export default Student