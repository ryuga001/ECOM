import axios from "axios";
import { useEffect, useState } from "react";
import BarChart from "./components/barchart";
import HorizontalBarChart from "./components/horizontalbar";
import PieChart from "./components/piechart";
import SideBar from "./components/sidebar";

import { CgArrowsExpandUpRight, CgShoppingBag } from "react-icons/cg";
import { FaDollarSign, FaUsers } from "react-icons/fa";
import { HiTrendingUp } from "react-icons/hi";
import { RiRedPacketFill } from "react-icons/ri";
import { AnalyticsDataType } from "./admintypes";
import { getAdminAnalytics } from "../route";



const Dashboard = () => {
    const [analyticsData, setAnalyticsData] = useState<AnalyticsDataType>({
        totalProduct: 0,
        totalCustomer: 0,
        totalSales: 0,
        Categories: [],
        CategoriesData: [],
        Male: 0,
        Female: 0,
        EachMonthData: [],
    });

    const fetchData = async () => {
        const res = await getAdminAnalytics();
        if (res) {
            setAnalyticsData({
                totalProduct: res.data.NOP,
                totalCustomer: res.data.NOC,
                totalSales: res.data.Sales,
                Categories: res.data.Categories,
                CategoriesData: res.data.CategoriesData,
                Male: res.data.Male,
                Female: res.data.Female,
                EachMonthData: res.data.EachMonthData,
            });
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    const averageSalePerCustomer = analyticsData.totalSales / analyticsData.totalCustomer || 0;
    const productPerCategory = analyticsData.totalProduct / analyticsData.Categories.length || 0;
    const topCategories = analyticsData.Categories.map((category, index) => ({
        name: category,
        value: analyticsData.CategoriesData[index]
    })).sort((a, b) => b.value - a.value).slice(0, 5);

    return (
        <div className="flex min-h-screen w-full bg-slate-50">

            <aside className="sticky top-0 h-screen">
                <SideBar />
            </aside>


            <main className="flex-1 px-6 py-8 overflow-x-hidden">
                <div className="max-w-[2000px] mx-auto">

                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-slate-800">Dashboard Overview</h1>
                        <p className="text-slate-500 mt-1">Welcome back! Here's what's happening with your store today.</p>
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-50 rounded-full">
                                    <FaUsers className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500">Total Customers</p>
                                    <h3 className="text-2xl font-bold text-slate-800">{analyticsData.totalCustomer}</h3>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-green-50 rounded-full">
                                    <FaDollarSign className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500">Total Sales</p>
                                    <h3 className="text-2xl font-bold text-slate-800">${analyticsData.totalSales}</h3>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-purple-50 rounded-full">
                                    <RiRedPacketFill className="w-6 h-6 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500">Total Products</p>
                                    <h3 className="text-2xl font-bold text-slate-800">{analyticsData.totalProduct}</h3>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-orange-50 rounded-full">
                                    <CgShoppingBag className="w-6 h-6 text-orange-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500">Avg. Sale/Customer</p>
                                    <h3 className="text-2xl font-bold text-slate-800">${averageSalePerCustomer.toFixed(2)}</h3>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">

                        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-lg font-semibold text-slate-800">Monthly Revenue</h2>
                                    <p className="text-sm text-slate-500">Revenue trends over the past year</p>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm">
                                    <HiTrendingUp size={16} />
                                    <span>+12.5%</span>
                                </div>
                            </div>
                            <div className="h-[300px]">
                                <BarChart MonthData={analyticsData.EachMonthData || []} />
                            </div>
                        </div>


                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                            <h2 className="text-lg font-semibold text-slate-800 mb-2">Customer Demographics</h2>
                            <p className="text-sm text-slate-500 mb-6">Gender distribution of customers</p>
                            <div className="h-[300px] flex items-center justify-center">
                                <PieChart Male={analyticsData.Male} Female={analyticsData.Female} />
                            </div>
                            <div className="mt-6 grid grid-cols-2 gap-4">
                                <div className="text-center p-4 bg-blue-50 rounded-lg">
                                    <p className="text-sm text-slate-600">Male Customers</p>
                                    <p className="text-xl font-bold text-blue-600">{analyticsData.Male}</p>
                                </div>
                                <div className="text-center p-4 bg-pink-50 rounded-lg">
                                    <p className="text-sm text-slate-600">Female Customers</p>
                                    <p className="text-xl font-bold text-pink-600">{analyticsData.Female}</p>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
                        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-lg font-semibold text-slate-800">Category Performance</h2>
                                    <p className="text-sm text-slate-500">Sales distribution across product categories</p>
                                </div>
                                <button className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700">
                                    View Details
                                    <CgArrowsExpandUpRight size={16} />
                                </button>
                            </div>
                            <div className="h-[600px]">
                                <HorizontalBarChart
                                    categories={analyticsData.Categories}
                                    categoriesData={analyticsData.CategoriesData}
                                />
                            </div>
                        </div>


                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                            <h2 className="text-lg font-semibold text-slate-800 mb-2">Top Categories</h2>
                            <p className="text-sm text-slate-500 mb-6">Best performing product categories</p>
                            <div className="space-y-4">
                                {topCategories.map((category, index) => (
                                    <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                                        <div>
                                            <p className="font-medium text-slate-800">{category.name}</p>
                                            <p className="text-sm text-slate-500">{category.value} sales</p>
                                        </div>
                                        <div className="w-16 h-16 flex items-center justify-center">
                                            <div
                                                className="w-full h-full rounded-full border-4"
                                                style={{
                                                    borderColor: `hsl(${index * 60}, 70%, 60%)`,
                                                    borderRightColor: 'transparent',
                                                    transform: 'rotate(45deg)'
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                            <h2 className="text-lg font-semibold text-slate-800 mb-2">Products per Category</h2>
                            <p className="text-sm text-slate-500 mb-4">Average number of products in each category</p>
                            <div className="flex items-center gap-4">
                                <div className="flex-1 bg-slate-100 rounded-full h-4">
                                    <div
                                        className="bg-blue-500 h-full rounded-full"
                                        style={{ width: `${(productPerCategory / analyticsData.totalProduct) * 100}%` }}
                                    />
                                </div>
                                <span className="text-lg font-semibold text-slate-800">
                                    {productPerCategory.toFixed(1)}
                                </span>
                            </div>
                        </div>


                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                            <h2 className="text-lg font-semibold text-slate-800 mb-2">Customer Lifetime Value</h2>
                            <p className="text-sm text-slate-500 mb-4">Average revenue per customer</p>
                            <div className="flex items-center justify-between">
                                <div className="space-y-2">
                                    <p className="text-3xl font-bold text-slate-800">
                                        ${averageSalePerCustomer.toFixed(2)}
                                    </p>
                                    <p className="text-sm text-green-600 flex items-center gap-1">
                                        <HiTrendingUp size={16} />
                                        +5.2% from last month
                                    </p>
                                </div>
                                <div className="w-24 h-24 rounded-full border-8 border-blue-100 border-t-blue-500 animate-spin" />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;