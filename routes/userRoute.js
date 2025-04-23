import express from "express";
import { BlockOrUnblockUser, ChangeUserPassword, ForgotPassword, GetAllUsers, GetUser, LoginWithGoogle, SendOTP, UpdateUser, VerifyOTP, loginUser, userRegister } from "../controllers/userController.js";

const userRouter  = express.Router();

userRouter.post('/',userRegister);

userRouter.post('/login',loginUser);

userRouter.get('/all',GetAllUsers);

userRouter.get('/',GetUser);

userRouter.put('/block/:email',BlockOrUnblockUser);

userRouter.put('/edit/:email',UpdateUser);

userRouter.post('/google',LoginWithGoogle);

userRouter.get('/sendOTP',SendOTP);

userRouter.post('/verifyEmail',VerifyOTP);

userRouter.get('/forgotPassword/:email',ForgotPassword);

userRouter.put('/changePassword/:email',ChangeUserPassword);


export default userRouter;