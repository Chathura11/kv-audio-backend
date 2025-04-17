import express from 'express';
import { CreateOrder, GetQuotation } from '../controllers/orderController.js';

const orderRouter = express.Router()

orderRouter.post("/",CreateOrder);

orderRouter.post("/quote",GetQuotation);

export default orderRouter;
