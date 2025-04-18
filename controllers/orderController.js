import Order from "../models/order.js";
import Product from "../models/product.js";
import { isItAdmin, isItCustomer } from "./userController.js";

export async function CreateOrder(req,res){
    const data = req.body;
    const orderInfo ={
        orderedItems :[]
    }

    if(req.user ==null){
        res.status(401).json({message:"Please login and try again!"});
        return;
    }

    orderInfo.email = req.user.email;

    const lastOrder =await Order.find().sort({orderId:-1}).limit(1);
    if(lastOrder.length == 0){
        orderInfo.orderId = "ORD0001";
    }else{
        const lastOrderId = lastOrder[0].orderId;
        const lastOrderNumberString = lastOrderId.replace("ORD","");
        const lastOrderNumber = parseInt(lastOrderNumberString);
        const currentOrderNumber = lastOrderNumber +1;
        const formattedNumber = String(currentOrderNumber).padStart(4,'0');
        orderInfo.orderId = "ORD"+formattedNumber;

    }

    let oneDayCost = 0;

    for(let i=0;i<data.orderedItems.length;i++){
        try {
            const product = await Product.findOne({key: data.orderedItems[i].key})
            if(product ==null){
                res.status(404).json({message:"Product with key"+ data.orderedItems[i].key +" not found!"});
                return;
            }
            if(product.availability == false){
                res.status(404).json({message:"Product with key"+ data.orderedItems[i].key +" not available!"});
                return;
            }

            orderInfo.orderedItems.push({
                product:{
                    key:product.key,
                    name:product.name,
                    image:product.image[0],
                    price:product.price
                },
                quantity:data.orderedItems[i].qty
            })

            oneDayCost += product.price * data.orderedItems[i].qty;

        } catch (error) {
            res.status(500).json({message:"Failed to create order!"})
            return
        }
    }

    orderInfo.days = data.days;
    orderInfo.startingDate = data.startingDate;
    orderInfo.endingDate = data.endingDate,
    orderInfo.totalAmount = oneDayCost * data.days;

    try {
        const newOrder = new Order(orderInfo);
        const result = await newOrder.save();
        res.status(200).json({message:"Order created successfully!",order:result});
    } catch (error) {
        res.status(500).json({message:"Failed to create order!"});
    }

}

export async function GetQuotation(req,res){
    const data = req.body;
    const orderInfo ={
        orderedItems :[]
    }

    let oneDayCost = 0;

    for(let i=0;i<data.orderedItems.length;i++){
        try {
            const product = await Product.findOne({key: data.orderedItems[i].key})
            if(product ==null){
                res.status(404).json({message:"Product with key"+ data.orderedItems[i].key +" not found!"});
                return;
            }
            if(product.availability == false){
                res.status(404).json({message:"Product with key"+ data.orderedItems[i].key +" not available!"});
                return;
            }

            orderInfo.orderedItems.push({
                product:{
                    key:product.key,
                    name:product.name,
                    image:product.image[0],
                    price:product.price
                },
                quantity:data.orderedItems[i].qty
            })

            oneDayCost += product.price * data.orderedItems[i].qty;

        } catch (error) {
            res.status(500).json({message:"Failed to create order!"})
            return
        }
    }

    orderInfo.days = data.days;
    orderInfo.startingDate = data.startingDate;
    orderInfo.endingDate = data.endingDate,
    orderInfo.totalAmount = oneDayCost * data.days;

    try {        
        res.status(200).json({message:"Order Quotation!",total:orderInfo.totalAmount});
    } catch (error) {
        res.status(500).json({message:"Failed to create order quotation!"});
    }
}

export async function GetOrders(req,res){

    if(isItCustomer(req)){
        try {
            const orders = await Order.find({email:req.user.email})

            res.status(200).json(orders);

        } catch (error) {
            res.status(500).json({message:"Failed to get order list!"})
        }
    }else if(isItAdmin(req)){
        try {
            const orders = await Order.find();
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({message:"Failed to get order list!"})
        }
    }else{
        res.status(403).json({message:"Unauthorized!"})
    }

}


export async function ApproveOrRejectOrder(req,res){
    const orderId = req.params.orderId;
    const status = req.body.status;

    if(isItAdmin(req)){
        try {
            const order = await Order.findOne({orderId:orderId});

            if(order == null){
                res.status(404).json({message:"Order not found!"});
                return;
                
            }

            await Order.updateOne({orderId:orderId},{status:status});

            res.status(200).json({message:"Order approved/rejected successfully!"})


        } catch (error) {
            res.status(500).json({message:"Failed to changed status!"})
        }
    }else{
        res.status(403).json({message:"Unauthorized!"})
    }
}