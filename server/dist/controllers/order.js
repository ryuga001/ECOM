import { TryCatch } from "../middleware/error.js";
import Order from "../models/order.js";
import Product from "../models/product.js";
import ErrorHandler from "../utils/utility-class.js";
export const newOrder = TryCatch(async (req, res, next) => {
    const { shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice, } = req.body;
    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.userId,
    });
    // image has to set here ...
    await order.populate("orderItems.product", "images.url");
    return res.status(200).json({
        success: true,
        data: order
    });
});
export const getSingleOrder = TryCatch(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");
    if (!order) {
        return next(new ErrorHandler("Order not found", 404));
    }
    return res.status(200).json({
        success: true,
        data: order,
    });
});
export const myOrders = TryCatch(async (req, res, next) => {
    const orders = await Order.find({ user: req.userId });
    return res.status(200).json({
        success: true,
        data: orders,
    });
});
export const getAllOrders = TryCatch(async (req, res, next) => {
    const orders = await Order.find();
    let totalAmount = 0;
    orders.forEach((item) => {
        totalAmount += item.totalPrice;
    });
    return res.status(200).json({
        success: true,
        totalAmount,
        orders,
    });
});
export const updateOrder = TryCatch(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
    }
    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("You have already delivered this order", 400));
    }
    if (req.body.status === "Shipped") {
        order.orderItems.forEach(async (o) => {
            await updateStock(o.product.toString(), o.quantity);
        });
    }
    order.orderStatus = req.body.status;
    // if (req.body.status === "Delivered") {
    //     order.deliveredAt = Date.now();
    // }
    await order.save({ validateBeforeSave: false });
    return res.status(200).json({
        success: true,
    });
});
async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    if (!product) {
        console.log("product not found");
        return;
    }
    product.stock -= quantity;
    await product.save({ validateBeforeSave: false });
}
export const deleteOrder = TryCatch(async (req, res, next) => {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
    }
    res.status(200).json({
        success: true,
    });
});
