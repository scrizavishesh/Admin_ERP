import React from 'react';
import {
    Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title, LineElement, ArcElement, PointElement, Filler
} from 'chart.js';

import { Bar } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title, LineElement, ArcElement, PointElement, Filler);

const BarChart = () => {
    const data = {
        labels: ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven'],
        datasets: [
            {
                label: 'Go Attendance',
                data: [20, 50, 35, 75, 65, 120, 200, 100, 60, 180, 85],
                backgroundColor: '#A7C883',
                borderRadius: 5,
            }
        ]
    };

    const options = {
        responsive: true,
        layout: {
            padding: {
                top: 10,
                bottom: 10,
                left: 10,
                right: 10,
            },
        },
        plugins: {
            legend: {
                display: false,
            }
        },
        scales: {
            
            x: {
                grid: {
                    display: true,
                    color: '#F3F9F8',
                },
                ticks: {
                    color: '#000',
                },
                border: {
                    color: '#008479',
                },
            },
            y: {
                grid: {
                    display: true,
                    color: '#F3F9F8',
                    
                },
                ticks: {
                    color: '#000',
                },
                beginAtZero: true,
                max: 200,
                border: {
                    color: '#008479',
                },
            },
        }
    };

    return (
        <>
            <div className="chart-container" style={{ height: '18em' }}>
                <Bar data={data} options={options}></Bar>
            </div>
        </>
    );
}

export default BarChart;
