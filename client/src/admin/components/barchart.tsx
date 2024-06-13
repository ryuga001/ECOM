import React from 'react';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Title,
    plugins,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface PropsType {
    MonthData: Array<number>;
}

const BarChart = ({ MonthData = [] }: PropsType) => {
    const barChartData = {
        labels: [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ],
        datasets: [
            {
                label: 'Sales',
                data: MonthData,
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75, 192, 192, 0.75)',
                hoverBorderColor: 'rgba(75, 192, 192, 1)',
            },
        ],
    };

    const options = {
        responsive: true,
        // maintainAspectRatio: false,
        // // plugins: {
        // //     legend: {
        // //         position: 'top',
        // //         labels: {
        // //             font: {
        // //                 size: 14,
        // //             },
        // //             color: '#333',
        // //         },
        // //     },
        // //     title: {
        // //         display: true,
        // //         text: 'Monthly Sales Data',
        // //         font: {
        // //             size: 18,
        // //         },
        // //         color: '#333',
        // //     },
        // //     tooltip: {
        // //         enabled: true,
        // //         mode: 'index',
        // //         intersect: false,
        // //         backgroundColor: 'rgba(0, 0, 0, 0.7)',
        // //         titleFont: {
        // //             size: 16,
        // //         },
        // //         bodyFont: {
        // //             size: 14,
        // //         },
        // //         footerFont: {
        // //             size: 12,
        // //         },
        // //     },
        // // },
        // scales: {
        //     x: {
        //         title: {
        //             display: true,
        //             text: 'Month',
        //             font: {
        //                 size: 14,
        //             },
        //             color: '#333',
        //         },
        //         ticks: {
        //             color: '#333',
        //         },
        //     },
        //     y: {
        //         title: {
        //             display: true,
        //             text: 'Sales',
        //             font: {
        //                 size: 14,
        //             },
        //             color: '#333',
        //         },
        //         ticks: {
        //             color: '#333',
        //         },
        //     },
        // },
    };

    return (
        <div className="Bar-chart-container">
            <Bar options={options} data={barChartData} />
        </div>
    );
};

export default BarChart;
