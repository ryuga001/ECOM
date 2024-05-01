
import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    CategoryScale,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register({
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
});


interface PropsType {
    MonthData?: Array<number>
}

const LineChart = ({ MonthData }: PropsType) => {
    const LineChartData = {
        labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        datasets: [
            {
                label: "Sales",
                data: MonthData,
                borderColor: "lightgreen",
            },
        ],
    };
    const options = {};
    return (
        <div>
            <Line options={options} data={LineChartData} />
        </div>
    )
}

export default LineChart