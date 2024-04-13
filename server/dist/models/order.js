import { Schema, model } from "mongoose";
const OrderSchema = new Schema({
    shippingInfo: {
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        pinCode: {
            type: Number,
            required: true,
        },
        phoneNo: {
            type: Number,
            required: true,
        },
    },
    orderItems: [
        {
            name: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            image: {
                type: String,
                required: true,
            },
            product: {
                type: Schema.ObjectId,
                ref: "product",
                required: true,
            },
        },
    ],
    user: {
        type: Schema.ObjectId,
        ref: "user",
        required: true,
    },
    paymentInfo: {
        id: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
    },
    paidAt: {
        type: Date,
        required: true,
    },
    itemsPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    orderStatus: {
        type: String,
        required: true,
        default: "Processing",
    },
    deliveredAt: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const Order = model("order", OrderSchema);
export default Order;
/*
{
    "shippingInfo": {
        "address": "Home",
        "city": "city",
        "state": "state",
        "country": "country",
        "pinCode": "2451",
        "phoneNo": 123456
    },
    "orderItems": [
        {
            "name": "order1",
            "price": 200,
            "quantity": 1,
            "image" : "imageurl",
            "product": "6618ce190425df7ad665a3e8"
        }
    ],
    "paymentInfo": {
        "id": "123455556",
        "status": "paid"
    },
    "itemsPrice": 200,
    "taxPrice": 10,
    "shippingPrice": 40,
    "totalPrice": 250
}
*/ 
