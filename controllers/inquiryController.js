import Inquiry from "../models/inquiry.js";
import { isItAdmin, isItCustomer } from "./userController.js";

export async function addInquiry(req,res){
    try {
        if(isItCustomer(req)){
            const data = req.body;

            data.email = req.user.email;
            data.phone = req.user.phone;

            let id = 0;

            const inquiries = await Inquiry.find().sort({id:-1}).limit(1);

            if(inquiries.length == 0){
                id = 1;
            }else{
                id = inquiries[0].id +1;
            }
            data.id = id;

            const newInquiry = new Inquiry(data);
            const response = await newInquiry.save();

            res.status(200).json({message:"Inquiry added successfully!",id:response.id})

        }else{
            res.status(403).json({message:"You are not authorized to perform this action"})
        }
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}


export async function getInquiries(req,res){
    try {
        if(isItCustomer(req)){
            const inquiries = await Inquiry.find({email:req.user.email})
            return res.status(200).json(inquiries);
        }else if(isItAdmin(req)){
            const inquiries = await Inquiry.find();
            return res.status(200).json(inquiries);
        }else{
            res.status(403).json({message:"You are not authorized to perform this action"});
        }
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export async function deleteInquiry(req,res){

    try {
        const id = req.params.id;
        if(isItAdmin(req)){
            await Inquiry.deleteOne({id:id});
            return res.status(200).json({message:"Inquiry deleted successfully"});
        }else if(isItCustomer(req)){
            const inquiry = await Inquiry.findOne({id:id});
            if(inquiry == null){
                return res.status(404).json({message:"Inquiry not found"})
            }else{
                if(inquiry.email == req.user.email){
                    await Inquiry.deleteOne({id:id})
                    return res.status(200).json({message:"Inquiry deleted successfully"})
                }else{
                    return res.status(403).json({message:"You are not authorized to perform this action"})
                }
            }
        }else{
            res.status(403).json({message:"You are not authorized to perform this action"})
        }
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}


export async function updateInquiry(req,res){
    try {
        const id = req.params.id;
        const data = req.body
        if(isItAdmin(req)){
            
            await Inquiry.updateOne({id:id},data);

            return res.status(200).json({message:"Inquiry updated successfully"});
        }else if(isItCustomer(req)){
            const inquiry = await Inquiry.findOne({id:id});

            if(inquiry == null){
                return res.status(404).json({message:"Inquiry not found"})
            }else{
                if(inquiry.email == req.user.email){
                    await Inquiry.updateOne({id:id},{message:data.message});
                    return res.status(200).json({message:"Inquiry updated successfully!"});
                }else{
                    res.status(403).json({message:"You are not authorized to perform this action"})
                }
            }
        }else{
            res.status(403).json({message:"You are not authorized to perform this action"})
        }
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}