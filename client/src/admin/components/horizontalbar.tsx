import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
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
    categories?: string[];
    categoriesData?: number[];
}

const HorizontalBarChart = ({ categories = [], categoriesData = [] }: PropsType) => {
    const options = {
        indexAxis: 'y' as const,
        responsive: true,
        maintainAspectRatio: false,
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
            title: {
                display: true,
                text: 'Inventory',
                font: {
                    size: 18,
                },
                color: '#333',
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
        scales: {
            x: {
                title: {
                    display: true,
                    // text: 'Values',
                    font: {
                        size: 14,
                    },
                    color: '#333',
                },
                ticks: {
                    color: '#333',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Categories',
                    font: {
                        size: 14,
                    },
                    color: '#333',
                },
                ticks: {
                    color: '#333',
                },
            },
        },
    };

    const data = {
        labels: categories,
        datasets: [
            {
                label: 'Quantity',
                data: categoriesData,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)',
                hoverBorderColor: 'rgba(75, 192, 192, 1)',
            },
        ],
    };

    return (

        <Bar options={options} data={data} />

    );
};

export default HorizontalBarChart;
