import DATA from '../assets/devices.json';

function Results({selectedDevices, currentLifespan, newLifespan}) {

    const calculate = () => {
        let totalCost = 0;
        let GHG1 = 0;
        let GHG2 = 0;
        selectedDevices.forEach((device) => {
            totalCost += device.quantity * DATA[device.index].cost;
            GHG1 += device.quantity * (.85 * DATA[device.index].footprint + (currentLifespan * .15 * DATA[device.index].footprint) / 4);
            GHG2 += device.quantity * (.85 * DATA[device.index].footprint + (newLifespan * .15 * DATA[device.index].footprint) / 4);
        });
        const prevCost = totalCost / currentLifespan;
        const newCost = totalCost / newLifespan;
        const totalSaved = prevCost - newCost;
        const GHG = GHG1 / currentLifespan - GHG2 / newLifespan;

        const co2Equivalencies = [
            {
                'value': Math.round(GHG * 2445/ 1000),
                'ending': 'fewer miles driven'
            },
            {
                'value': Math.round(GHG * 43.6 / 1000),
                'ending': 'bags of trash recycled instead of throwing them in the landfill'
            },
            {
                'value': Math.round(GHG * 16.5/1000),
                'ending': 'seedlings planted and letting them grow for 10 years'
            }
        ];

        const costEquivalencies = [
            {
                'value': totalSaved < 20000 ? Math.round(totalSaved / 10) : Math.round(totalSaved / 20000),
                'ending': totalSaved < 20000 ? 'bowls of Chipotle' : 'First Class flight tickets'
            },
            {
                'value': totalSaved < 50000 ? Math.round(totalSaved / 500) : Math.round(totalSaved / 50000),
                'ending': totalSaved < 50000 ? 'smart TVs' : 'down payments on a house'
            },
            {
                'value': totalSaved < 40000 ? Math.round(totalSaved / 800) : Math.round(totalSaved / 40000),
                'ending': totalSaved < 40000 ? 'smartphones' : 'years of tuition paid by an Engineering student at UVA'
            }
        ];

        return (
            <div>
                <div className="xl:grid grid-cols-2 gap-2 mb-2">
                    <div className="p-2 bg-white border shadow-md rounded-lg shadow mx-3 mb-2 xl:mb-0">
                        <p className="text-3xl font-bold text-center">${totalSaved.toLocaleString('en-US', {maximumFractionDigits:2})}</p>
                    </div>
                    <div className="p-2 bg-white border shadow-md rounded-lg shadow mx-3 mb-2 xl:mb-0">
                        <p className="text-3xl font-bold text-center">{parseInt(GHG).toLocaleString('en-US')} kg CO2e</p>
                    </div>
                </div>
                <div className="xl:grid grid-cols-2 sm:hidden gap-2 mb-2">
                    <div>
                        {costEquivalencies.map((eq) => {
                            return(
                                <div className="p-2 bg-white border shadow-md rounded-lg shadow flex items-center mx-3 mb-2">
                                    <p className="text-2xl font-bold">{eq.value.toLocaleString('en-US')}</p>
                                    <p className="ml-3 flex justify-end">
                                        {eq.ending}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                    <div>
                        {co2Equivalencies.map((eq) => {
                            return(
                                <div className="p-2 bg-white border shadow-md rounded-lg shadow flex items-center mx-3 mb-2">
                                    <p className="text-2xl font-bold">{eq.value.toLocaleString('en-US')}</p>
                                    <p className="ml-3 flex justify-end">
                                        {eq.ending}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        );
    }

    if (selectedDevices.length === 0 || currentLifespan === 0 || newLifespan === 0) {
        return (
            <div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 mb-3" role="alert">
                <span className="font-medium">Once you've entered all of the above information, your results will be displayed here</span>
            </div>
        );
    } else {
        return (
            calculate()
        );
    }
}

export default Results;