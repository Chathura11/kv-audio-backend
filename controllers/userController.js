import User from "../models/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
import e from "express"

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
            if(user.isBlocked){
                res.status(403).json({message:"Your account is blocked.Please contact the admin!"})
                return;
            }

            const isPasswordCorrect = bcrypt.compareSync(data.password,user.password);

            if(isPasswordCorrect){
                const token = jwt.sign({
                    firstname : user.firstname,
                    lastname : user.lastname,
                    email:user.email,
                    role:user.role,
                    profilePicture:user.profilePicture,
                    phone:user.phone
                },process.env.JWT_SECRET_KEY)

                res.status(200).json({message:"login successful!",token:token,user:user})
            }else{
                res.status(401).json({message:"login failed!"})
            }
        }
    })
}

export function isItAdmin(req){
    let isAdmin = false;
    
    if(req.user !=null){
        if(req.user.role == "admin"){
            isAdmin = true;
        }
    }

    return isAdmin;
}

export function isItCustomer(req){
    let isCustomer = false;

    if(req.user !=null){
        if(req.user.role == "customer"){
            isCustomer = true;
        }
    }

    return isCustomer;
}

export async function GetAllUsers(req,res){
    if(isItAdmin(req)){
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({message:"Failed to get users"})
        }

    }else{
        res.status(403).json({message:"Unauthrized!"})
    }
}

export async function BlockOrUnblockUser(req,res){
    const email = req.params.email;
    if(isItAdmin(req)){
        try {
            const user = await User.findOne({email:email});

            if(user == null){
                res.status(404).json({message:"User not found!"});
                return;
            }

            const isBlocked = !user.isBlocked;

            await User.updateOne({email:email},{isBlocked:isBlocked});

            res.status(200).json({message:"User Blocked/Unblocked successfully!"});
        } catch (error) {
            res.status(500).json({message:"Failed to get user!"});
        }
    }else{
        res.status(403).json({message:"Unauthorized!"});
    }
    
}

export function GetUser(req,res){
    if(req.user != null){
        res.status(200).json(req.user);
    }else{
        res.status(403).json({message:"Unauthorized!"});
    }
}