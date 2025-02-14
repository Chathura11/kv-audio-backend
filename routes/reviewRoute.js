import express from 'express';
import { addReview, approveReview, deleteReview, getReviews } from '../controllers/reviewController.js';

const reviewRouter  = express.Router();

reviewRouter.post("/",addReview)

reviewRouter.get("/",getReviews);

reviewRouter.delete("/:email",deleteReview);

reviewRouter.put("/approve/:email",approveReview);

//route which use params should be called below from all routes
reviewRouter.get("/:name",(req,res)=>{
    console.log(req.params.name)
})


export default reviewRouter;