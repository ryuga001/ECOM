

import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";


ChartJS.register({
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
})

interface PropsType {
    Categories?: Array<string>,
    CategoriesData?: Array<number>
}

const BarChart = ({ Categories, CategoriesData }: PropsType) => {
    const options = {}
    const barChartData = {
        labels: Categories,
        datasets: [
            {
                label: "Quantity",
                data: CategoriesData,
                backgroundColor: ["lightblue"],
                borderColor: ["gray"],
                borderWidth: 1,
            },
        ],
    };
    return (

        <div>
            <Bar options={options} data={barChartData} />
        </div>
    )
}



export default BarChart