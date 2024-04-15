import express from "express";
import { config } from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./utils/feature.js";
import UserRoutes from "./routes/user.js";
import ProductRoutes from "./routes/products.js";
import OrderRoutes from "./routes/order.js";
import { errorMiddleware } from "./middleware/error.js";
import cookieParser from "cookie-parser";
config({
    path: "./.env",
});
// env constants 
const PORT = process.env.PORT || 8000;
const mongoURI = process.env.MONGO_URI || "";
const app = express();
// app use 
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:5173");
//     res.header("Access-Control-Allow-Credentials", true);
//     next();
// });
// api routes 
app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/product", ProductRoutes);
app.use("/api/v1/order", OrderRoutes);
// connection to database 
connectDB(mongoURI);
// error middleware s
app.use(errorMiddleware);
// server 
app.listen(PORT, () => {
    console.log("Server is running at " + `${PORT}`);
});
