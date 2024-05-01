import { TryCatch } from "../middleware/error.js";
import Product from "../models/product.js";
import User from "../models/user.js";
import Order from "../models/order.js";
import ErrorHandler from "../utils/utility-class.js";
export const getAnalyticsData = TryCatch(async (req, res, next) => {
    // NO of products , customers
    // total sales
    // male , female no. 
    // array of categories with array of corresponding number of products 
    // line graph data ? each month 
    const products = await Product.find();
    const users = await User.find();
    const orders = await Order.find();
    if (!products || !users || !orders) {
        return next(new ErrorHandler("DATA NOT FOUND", 404));
    }
    let sales = 0;
    orders.forEach((elem) => {
        sales += elem.totalPrice;
    });
    // const categoriesSet = new Set<string>();
    const MapCategory = new Map();
    products.forEach((item) => {
        // categoriesSet.add(item.category)
        if (MapCategory.get(item.category)) {
            MapCategory.set(item.category, MapCategory.get(item.category) + 1);
        }
        else
            MapCategory.set(item.category, 1);
    });
    let NoMale = 0;
    users.forEach((item) => {
        if (item.gender === "male")
            NoMale++;
    });
    const categories = [];
    const categoriesData = [];
    MapCategory.forEach((value, key) => {
        categories.push(key);
        categoriesData.push(value);
    });
    const EachMonthData = new Map();
    orders.forEach((item) => {
        const month = item.createdAt.getMonth();
        if (!EachMonthData.get(month)) {
            EachMonthData.set(month, item.totalPrice);
        }
        else {
            EachMonthData.set(month, EachMonthData.get(month) + item.totalPrice);
        }
    });
    const MonthData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    EachMonthData.forEach((value, key) => {
        MonthData[key] += value;
    });
    return res.status(200).json({
        NOP: products.length,
        NOC: users.length,
        Sales: sales,
        // Categories: Array.from(categoriesSet),
        Categories: categories,
        CategoriesData: categoriesData,
        Male: NoMale,
        Female: users.length - NoMale,
        EachMonthData: MonthData,
    });
});
