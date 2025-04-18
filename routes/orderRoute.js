import express from 'express';
import { ApproveOrRejectOrder, CreateOrder, GetOrders, GetQuotation } from '../controllers/orderController.js';

const orderRouter = express.Router()

orderRouter.post("/",CreateOrder);

orderRouter.post("/quote",GetQuotation);

orderRouter.get('/',GetOrders);

orderRouter.put('/status/:orderId',ApproveOrRejectOrder);

export default orderRouter;
