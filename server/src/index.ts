import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from 'dotenv'
import express from "express";
import { errorMiddleware } from "./middleware/error.js";
import AnalyticsRoute from "./routes/analytics.js";
import OrderRoutes from "./routes/order.js";
import ProductRoutes from "./routes/products.js";
import UserRoutes from "./routes/user.js";
import { connectDB } from "./utils/feature.js";

dotenv.config()


const PORT = process.env.PORT || 8000;
const mongoURI = process.env.MONGO_URI || "";

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use(cookieParser())
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// api routes 
app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/product", ProductRoutes);
app.use("/api/v1/order", OrderRoutes);
app.use("/api/v1", AnalyticsRoute)
// connection to database 
connectDB(mongoURI);

// error middleware 
app.use(errorMiddleware);

// server 
app.listen(PORT, () => {
    console.log("Server is running at " + `${PORT}`);
});

























// // Import necessary modules
// import { faker } from "@faker-js/faker";
// import Product from "./models/product.js";
// import mongoose from "mongoose";
// import Order from "./models/order.js";

// // Function to generate dummy data
// const generateDummyData = async () => {

//     const numProducts = 15; // Number of dummy products to generate

//     for (let i = 0; i < numProducts; i++) {
//         const order = new Order({
//             shippingInfo: {
//                 address: faker.location.streetAddress(),
//                 city: faker.location.city(),
//                 state: faker.location.state(),
//                 country: faker.location.country(),
//                 pinCode: faker.number.int({ min: 1000, max: 9999 }),
//                 phoneNo: faker.number.int({ min: 10, max: 490323453 }),
//             },
//             orderItems: [
//                 {
//                     name: faker.commerce.productName(),
//                     price: faker.number.int({ min: 1, max: 1000 }),
//                     quantity: faker.number.int({ min: 1, max: 10 }),
//                     image: faker.image.url(),
//                     product: new mongoose.Types.ObjectId() // Generate a new ObjectId for the product
//                 }
//             ],
//             user: new mongoose.Types.ObjectId(), // Generate a new ObjectId for the user
//             paymentInfo: {
//                 id: faker.string.alphanumeric(10),
//                 status: "paid"
//             },
//             paidAt: faker.date.recent(),
//             itemsPrice: faker.number.int({ min: 1, max: 1000 }),
//             taxPrice: faker.number.int({ min: 0, max: 100 }),
//             shippingPrice: faker.number.int({ min: 0, max: 100 }),
//             totalPrice: faker.number.int({ min: 1, max: 1000 }),
//             orderStatus: 'Shipped',
//             deliveredAt: faker.date.recent(),
//             createdAt: faker.date.recent()
//         });

//         await Order.create(
//             order
//         )
//         console.log(order);

//     }


// };

// generateDummyData();

