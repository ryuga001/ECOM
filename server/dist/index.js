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
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// api routes 
app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/product", ProductRoutes);
app.use("/api/v1/order", OrderRoutes);
// connection to database 
connectDB(mongoURI);
// error middleware 
app.use(errorMiddleware);
// server 
app.listen(PORT, () => {
    console.log("Server is running at " + `${PORT}`);
});
