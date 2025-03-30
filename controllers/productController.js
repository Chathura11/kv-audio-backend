import Product from "../models/product.js";
import { isItAdmin } from "./userController.js";

export function addProduct(req,res){
    if(req.user == null){
        res.status(401).json({message:"Unauthorized.Pls log in"})

        return
    }
    
    if(req.user.role !="admin"){
        res.status(403).json({message:"You are not authorized to perform this action"})

        return
    }
    const data = req.body;

    const product = new Product(data);

    product.save().then(()=>{
        res.status(200).json({message:"product added successfully!"});
    }).catch((error)=>{
        res.status(500).json({message:error.message});
    })
}

export async function getProducts(req,res){
    
    try {
        if(isItAdmin(req)){
            const products = await Product.find();
            res.status(200).json(products);
        }else{
            const products = await Product.find({availability:true});
            res.status(200).json(products);
        }
        
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

export async function updateProduct(req,res){
    try {
        if(isItAdmin(req)){
           const key = req.params.key;
           
           const data = req.body;

           await Product.updateOne({key:key},data)

           res.status(200).json({message:"Product updated successfully!"});
        }else{
            res.status(403).json({message:"You are not authorized to perform this action"})
        }
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}


export async function deleteProduct(req,res){
    try {
        if(isItAdmin(req)){
            const key = req.params.key;

            await Product.deleteOne({key:key});

            res.status(200).json({message:"Product deleted successfully!"});
        }else{
            res.status(403).json({message:"You are not authorized to perform this action"})
        }
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export async function getProduct(req,res){
    try {
        const key = req.params.key;
        const product = await Product.findOne({key:key})

        if(product == null){
            res.status(404).json("Product not found!");
        }else{
            res.status(200).json(product)
        }
    } catch (error) {
        res.status(500).json({message:"Faild to get product"})
    }
}

