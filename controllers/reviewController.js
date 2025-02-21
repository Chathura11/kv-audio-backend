import Review from "../models/review.js";


export function addReview(req,res){
    if(req.user == null){
        res.status(401).json({
            message:"Unauthorized.Pls log in"
        })
        return;
    }

    const data = req.body

    data.name = req.user.firstname + " "+req.user.lastname; 
    data.profilePicture = req.user.profilePicture;
    data.email = req.user.email;

    const newReview = new Review(data);

    newReview.save().then(()=>{
        res.status(200).json({message:"Review added successfully"})
    }).catch((error)=>{
        res.status(500).json({message:error})
    })
    

}

export async function getReviews(req,res){
    const user = req.user;

    try{
        if(user.role == "admin"){
            const reviews = await Review.find();
            res.status(200).json(reviews);
        }else{
            const reviews = await Review.find({isApproved:true});
            res.status(200).json(reviews);
        }
    }catch(error){
        res.status(500).json({error:error})
    }

    //we can use above code instead below code segment

    // if(user == null || user.role != "admin"){
    //     Review.find({isApproved:true}).then((reviews)=>{
    //         res.status(200).json(reviews)
    //     })

    //     return
    // }

    // if(user.role == "admin"){
    //     Review.find().then((reviews)=>{
    //         res.status(200).json(reviews)
    //     })
    // }
}

export function deleteReview(req,res){
    const email =  req.params.email;

    if(res.user == null){
        res.status(401).json("Unauthorized.Pls log in");
        return;
    }

    //admin can delete all reviews
    if(req.user.role == "admin"){
        Review.deleteOne({email:email}).then(()=>{
            res.status(200).json({message:"Review deleted successfully"})
        }).catch((error)=>{
            res.status(500).json({message:error})
        })

        return ;
    }

    //customers can delete only own review 
    if(req.user.role == "customer"){
        if(req.user.email == email){
            Review.deleteOne({email:email}).then(()=>{
                res.status(200).json({message:"Review deleted successfully"})
            }).catch((error)=>{
                res.status(500).json({message:error})
            })
        }else{
            res.status(403).json({message:"You are not authorized to perform this action"})
        }
    }

    
}


export function approveReview(req,res){
    const email = req.params.email

    if(req.user == null){
        res.status(401).json("Unauthorized.Pls log in");
        return;
    }

    //updateOne has two parameters
    //first one is to verfy the record
    //second one is to update records
    if(req.user.role == "admin"){
        Review.updateOne(
            {email:email},
            {isApproved:true}
        ).then(()=>{
            res.status(200).json({message:"Review approved"})
        }).catch((error)=>{
            res.status(500).json({message:error})
        })
    }else{
        res.status(403).json({message:"You are not authorized to perform this action"})
    }
}