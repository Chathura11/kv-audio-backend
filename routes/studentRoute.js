import express from "express";
import { getStudents,postStudents } from "../controllers/studentController.js";

const studentRouter = express.Router();

studentRouter.get('/',getStudents)

studentRouter.post('/',postStudents)

export default studentRouter;