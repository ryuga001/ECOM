import { useEffect, useState } from "react"
import BarChart from "./components/barchart"
import Cards from "./components/cards"
import LineChart from "./components/linechart"
import PieChart from "./components/piechart"
import SideBar from "./components/sidebar"
import axios from "axios"

interface analyticsDataType {
    totalProduct?: number,
    totalCustomer?: number,
    totalSales?: number,
    Categories?: Array<string>,
    CategoriesData?: Array<number>,
    Male?: number,
    Female?: number,
    EachMonthData?: Array<number>,
}

const Dashboard = () => {
    const [analyticsData, setAnalyticsData] = useState<analyticsDataType>(
        {
            totalProduct: 0,
            totalCustomer: 0,
            totalSales: 0,
            Categories: [],
            CategoriesData: [],
            Male: 0,
            Female: 0,
            EachMonthData: [],
        }
    );
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get("http://localhost:5000/api/v1/admin/analytics");
            // console.log(res.data);
            setAnalyticsData({
                totalProduct: res.data.NOP,
                totalCustomer: res.data.NOC,
                totalSales: res.data.Sales,
                Categories: res.data.Categories,
                CategoriesData: res.data.CategoriesData,
                Male: res.data.Male,
                Female: res.data.Female,
                EachMonthData: res.data.EachMonthData,
            })
        }
        fetchData();
    }, [])

    return (
        <>

            <div className="AdminContainer">
                <aside>
                    <SideBar />
                </aside>
                <main>

                    <Cards NOP={analyticsData.totalProduct} NOC={analyticsData.totalCustomer} Sales={analyticsData.totalSales} />
                    {/* pie chart for male female */}
                    <PieChart Male={analyticsData.Male} Female={analyticsData.Female} />
                    {/* bar chart for product categories  */}
                    <BarChart Categories={analyticsData.Categories} CategoriesData={analyticsData.CategoriesData} />
                    {/* line chart for order , sales per month */}
                    <LineChart MonthData={analyticsData.EachMonthData} />
                </main>
            </div>
        </>

    )
}

export default Dashboard