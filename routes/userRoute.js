import express from "express";
import { loginUser, userRegister } from "../controllers/userController.js";

const userRouter  = express.Router();

userRouter.post('/',userRegister);

userRouter.post('/login',loginUser);

export default userRouter;