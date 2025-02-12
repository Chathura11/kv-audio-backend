import Product from "../models/product.js";

export function addProduct(req,res){
    if(req.user == null){
        res.status(401).json({message:"Unauthorized.Pls log in"})

        return
    }
    console.log(req.user);
    if(req.user.role !="admin"){
        res.status(403).json({message:"You are not authorized to perform this action"})

        return
    }
    const data = req.body;

    const product = new Product(data);

    product.save().then(()=>{
        res.status(200).json({message:"product added successfully!"});
    }).catch((error)=>{
        res.status(500).json({message:error});
    })
}