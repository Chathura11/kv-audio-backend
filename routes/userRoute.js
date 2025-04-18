import express from "express";
import { BlockOrUnblockUser, GetAllUsers, GetUser, loginUser, userRegister } from "../controllers/userController.js";

const userRouter  = express.Router();

userRouter.post('/',userRegister);

userRouter.post('/login',loginUser);

userRouter.get('/all',GetAllUsers);

userRouter.get('/',GetUser);

userRouter.put('/block/:email',BlockOrUnblockUser);


export default userRouter;