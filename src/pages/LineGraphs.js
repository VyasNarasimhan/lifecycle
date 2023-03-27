import { Line } from "react-chartjs-2";
import DATA from '../assets/devices.json';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

function LineGraphs({currentLifespan, selectedDevices}) {

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const labels = [];
    const env = [];
    const fin = [];

    let totalCost = 0;
    let GHG = 0;
    selectedDevices.forEach((device) => {
        totalCost += device.quantity * DATA[device.index].cost;
        GHG += device.quantity * DATA[device.index].footprint;
    });
    console.log(currentLifespan);

    for (let i = currentLifespan; i < currentLifespan + 8.5; i += .5) {
        console.log(i);
        labels.push(i);
        fin.push((totalCost / currentLifespan) - (totalCost / i));
        env.push((GHG / currentLifespan) - (GHG / i));
    }


    const financial = {
        labels: labels,
        datasets: [{
            data: fin,
            fill: false,
            borderColor: 'rgb(29, 78, 216, 255)',
            tension: 0.1
        }]
    };
    const environmental = {
        labels: labels,
        datasets: [{
            data: env,
            fill: false,
            borderColor: 'rgb(29, 78, 216, 255)',
            tension: 0.1
        }]
    };

    return (
        <div class="grid xl:grid-cols-2 gap-4">
            <div>
                <p className="text-lg font-semibold text-center">Financial Savings</p>
                <Line data={financial} options={
                    {
                        responsive: true,
                        plugins: {
                            legend: {
                                display: false,
                            },
                            title: {
                                display: false,
                            },
                        },
                        scales: {
                            y: {
                                title: {
                                    display: true,
                                    text: 'Money saved ($)'
                                }
                            },
                            x: {
                                title: {
                                    display: true,
                                    text: 'New Replacement Cycle (years)'
                                }
                            },
                        }
                    }
                } />
            </div>
            <div>
                <p className="text-lg font-semibold text-center">Environmental Savings</p>
                <Line data={environmental} options={
                    {
                        responsive: true,
                        plugins: {
                            legend: {
                                display: false,
                            },
                            title: {
                                display: false,
                            },
                        },
                        scales: {
                            y: {
                                title: {
                                    display: true,
                                    text: 'CO2 saved (kg)'
                                }
                            },
                            x: {
                                title: {
                                    display: true,
                                    text: 'New Replacement Cycle (years)'
                                }
                            },
                        }
                    }
                } />
            </div>
        </div>
    )

}

export default LineGraphs;