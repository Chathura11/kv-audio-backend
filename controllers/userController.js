import User from "../models/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'

export function userRegister(req,res){
    const newUser = req.body

    const user = new User(newUser);

    user.password = bcrypt.hashSync(user.password,10);

    user.save().then(()=>{
        res.status(200).json({message:"user successfully saved!"})
    }).catch((error)=>{
        res.status(500).json({message:error})
    })
}

export function loginUser(req,res){
    const data = req.body;

    User.findOne({
        email:data.email
    }).then((user)=>{
        if(user == null){
            res.status(404).json({message:"user not found"})
        }else{

            const isPasswordCorrect = bcrypt.compareSync(data.password,user.password);

            if(isPasswordCorrect){
                const token = jwt.sign({
                    firstname : user.firstname,
                    lastname : user.lastname,
                    email:user.email,
                    role:user.role,
                    profilePicture:user.profilePicture
                },process.env.JWT_SECRET_KEY)

                res.status(200).json({message:"login successful!",token:token})
            }else{
                res.status(401).json({message:"login failed!"})
            }
        }
    })
}