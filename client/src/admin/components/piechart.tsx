

import { Chart as ChartJS, Legend, ArcElement, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2"
ChartJS.register(Tooltip, Legend, ArcElement);

interface PropsType {
    Male?: number,
    Female?: number,
}

const PieChart = ({ Male, Female }: PropsType) => {
    const options = {

    };
    const pieChartData = {
        labels: ["Male", "Female"],
        datasets: [
            {
                label: "Count",
                data: [Male, Female],
                backgroundColor: [
                    "red",
                    "blue",
                ],
                hoverOffset: 4,
            },
        ],
    };
    return (
        <div className="ChartContainer"> <Pie options={options} data={pieChartData} /></div>
    )
}

export default PieChart