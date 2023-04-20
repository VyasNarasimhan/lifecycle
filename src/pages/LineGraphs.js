import { Line } from "react-chartjs-2";
import DATA from '../assets/devices.json';
import annotationPlugin from "chartjs-plugin-annotation";

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

function LineGraphs({currentLifespan, selectedDevices, newLifespan}) {

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend,
        annotationPlugin
    );

    const labels = [];
    const env = [];
    const fin = [];
    const backgroundColor = []
    let finHeight = 0;
    let envHeight = 0;

    let totalCost = 0;
    // let GHG = 0;
    let GHG1 = 0;
    selectedDevices.forEach((device) => {
        totalCost += device.quantity * DATA[device.index].cost;
        // GHG += device.quantity * DATA[device.index].footprint;
        GHG1 += device.quantity * (.85 * DATA[device.index].footprint + (currentLifespan * .15 * DATA[device.index].footprint) / 4);
    });

    for (let i = currentLifespan; i < currentLifespan + 8.5; i += .5) {
        let GHG2 = 0;
        selectedDevices.forEach((device) => {
            GHG2 += device.quantity * (.85 * DATA[device.index].footprint + (i * .15 * DATA[device.index].footprint) / 4);
        });
        labels.push(i);
        fin.push((totalCost / currentLifespan) - (totalCost / i));
        env.push((GHG1 / currentLifespan) - (GHG2 / i));
        backgroundColor.push((i === newLifespan ? 'rgb(223, 9, 9)' : 'rgb(29, 78, 216, 255)'));
        if (i === newLifespan) {
            finHeight = (totalCost / currentLifespan) - (totalCost / i);
            envHeight = (GHG1 / currentLifespan) - (GHG2 / i);
        }
    }

    if (currentLifespan === 0) {
        envHeight = 0;
        finHeight = 0;
    }

    const financial = {
        labels: labels,
        datasets: [{
            data: fin,
            fill: false,
            pointBackgroundColor: backgroundColor,
            pointBorderColor: backgroundColor,
            borderColor: 'rgb(29, 78, 216, 255)',
            tension: 0.1
        }]
    };
    const environmental = {
        labels: labels,
        datasets: [{
            data: env,
            fill: false,
            pointBackgroundColor: backgroundColor,
            pointBorderColor: backgroundColor,
            borderColor: 'rgb(29, 78, 216, 255)',
            tension: 0.1
        }]
    };

    return (
        <div className="grid xl:grid-cols-2 gap-4">
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
                            annotation: {
                                annotations: {
                                    line1: {
                                        type: 'line',
                                        xMin: (newLifespan - currentLifespan) * 2,
                                        xMax: (newLifespan - currentLifespan) * 2,
                                        yMin: 0,
                                        yMax: finHeight,
                                        borderColor: 'rgb(223, 9, 9)',
                                        borderWidth: 2,
                                    }
                                }
                            }
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
                            annotation: {
                                annotations: {
                                    line1: {
                                        type: 'line',
                                        xMin: (newLifespan - currentLifespan) * 2,
                                        xMax: (newLifespan - currentLifespan) * 2,
                                        yMin: 0,
                                        yMax: envHeight,
                                        borderColor: 'rgb(223, 9, 9)',
                                        borderWidth: 2,
                                    }
                                }
                            }
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