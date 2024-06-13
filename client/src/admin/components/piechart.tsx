

import { Chart as ChartJS, Legend, ArcElement, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2"
ChartJS.register(Tooltip, Legend, ArcElement);

interface PropsType {
    Male?: number,
    Female?: number,
}

const PieChart = ({ Male = 0, Female = 0 }: PropsType) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    font: {
                        size: 14,
                    },
                    color: '#333',
                },
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                titleFont: {
                    size: 16,
                },
                bodyFont: {
                    size: 14,
                },
                footerFont: {
                    size: 12,
                },
            },
        },
    };

    const pieChartData = {
        labels: ['Male', 'Female'],
        datasets: [
            {
                label: 'Count',
                data: [Male, Female],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.6)', // Male: Blue
                    'rgba(255, 99, 132, 0.6)', // Female: Red
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)', // Male: Blue
                    'rgba(255, 99, 132, 1)', // Female: Red
                ],
                borderWidth: 1,
                hoverBackgroundColor: [
                    'rgba(54, 162, 235, 0.8)', // Male: Darker Blue
                    'rgba(255, 99, 132, 0.8)', // Female: Darker Red
                ],
            },
        ],
    };
    return (
        <div className="Pie-chart-container"> <Pie options={options} data={pieChartData} /></div>
    )
}

export default PieChart