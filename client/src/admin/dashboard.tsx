import axios from "axios"
import { useEffect, useState } from "react"
import AdminCard from "./components/adminCard"
import BarChart from "./components/barchart"
import Cards from "./components/cards"
import HorizontalBarChart from "./components/horizontalbar"
import PieChart from "./components/piechart"
import SideBar from "./components/sidebar"

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
                    <div className="row">
                        <Cards NOP={analyticsData.totalProduct} NOC={analyticsData.totalCustomer} Sales={analyticsData.totalSales} Orders={2511} />
                        <AdminCard />
                    </div>
                    <div className="row">
                        <BarChart MonthData={(analyticsData.EachMonthData ? analyticsData.EachMonthData : [])} />
                        <PieChart Male={analyticsData.Male} Female={analyticsData.Female} />
                    </div>
                    <div className="row">
                        <HorizontalBarChart categories={analyticsData.Categories} categoriesData={analyticsData.CategoriesData} />
                    </div>
                </main>
            </div>
        </>

    )
}

export default Dashboard
