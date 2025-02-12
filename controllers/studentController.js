import Student from "../models/student.js"



export function getStudents(req,res){
    Student.find().then((result)=>{
        res.status(200).json(result);
    }).catch((error)=>{
        res.status(500).json({message:error})
    })
}


export function postStudents(req,res){
    let newStudent = req.body;

    let student = new Student(newStudent);

    student.save().then(()=>{
        res.status(200).json({message:"student saved successfully!"})
    }).catch(()=>{
        res.status(500).json({message:"studnet saving failed!"})
    })
}