import express from "express";
import {placeOrder , placeOrderStripe , placeOrderRazorpay , allOrders , userOrders , updateStatus, verifyStripe, verifyRazorpay} from "../controllers/orderController.js";
import adminAuth from "../middlewares/adminAuth.js";
import authUser from "../middlewares/auth.js";
const orderRouter = express.Router();

// Admin features
orderRouter.post('/list',adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateStatus);


//Payment Features
orderRouter.post('/place-order',authUser, placeOrder);
orderRouter.post('/place-order-stripe', authUser, placeOrderStripe);
orderRouter.post('/place-order-razorpay', authUser, placeOrderRazorpay);


//User features
orderRouter.post('/user-orders', authUser, userOrders);


//verify payment
orderRouter.post('/verifyStripe',authUser,verifyStripe)
orderRouter.post('/verifyRazorpay',authUser,verifyRazorpay)


export default orderRouter;