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

        const gallonsOfGas = Math.round(GHG * 2445/ 1000);
        const trashRecycled = Math.round(GHG * 43.6 / 1000);
        const seedlings = Math.round(GHG * 16.5/1000);
        const macs = Math.round(totalSaved / 1500);
        const tuition = Math.round(totalSaved / 40000);
        const tesla = Math.round(totalSaved / 42990);
        const values = [gallonsOfGas, trashRecycled, seedlings];
        const values1 = [macs, tuition, tesla];
        const endings = ['fewer miles driven', 'bags of trash recycled instead of throwing them in the landfill', 'seedlings planted and letting them grow for 10 years'];
        const endings1 = ['new MacBook Pros', 'years of tuition paid by an Engineering student at UVA', 'Tesla Model 3s'];
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
                <p className='text-xl mb-1 font-semibold text-center'>CO2 Equivalencies</p>
                <div className='xl:grid grid-cols-3 gap-2 mb-2'>
                    {values.map((value, index) => {
                        return(
                            <div className="p-2 bg-white border shadow-md rounded-lg shadow flex items-center mx-3 mb-2 xl:mb-0">
                                <p className="text-2xl font-bold">{value.toLocaleString('en-US')}</p>
                                <p className="ml-3 flex justify-end">
                                    {endings[index]}
                                </p>
                            </div>
                        )
                    })}
                </div>
                <p className='text-xl mb-1 font-semibold text-center'>Cost Equivalencies</p>
                <div className='xl:grid grid-cols-3 gap-2 mb-2'>
                    {values1.map((value, index) => {
                        return(
                            <div className="p-2 bg-white border shadow-md rounded-lg shadow flex items-center mx-3 mb-2 xl:mb-0">
                                <p className="text-2xl font-bold">{value.toLocaleString('en-US')}</p>
                                <p className="ml-3 flex justify-end">
                                    {endings1[index]}
                                </p>
                            </div>
                        )
                    })}
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