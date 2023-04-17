import DATA from '../assets/devices.json';

function Results({selectedDevices, currentLifespan, newLifespan}) {

    const calculate = () => {
        let totalCost = 0;
        // let GHG = 0;
        let GHG1 = 0;
        let GHG2 = 0;
        selectedDevices.forEach((device) => {
            totalCost += device.quantity * DATA[device.index].cost;
            // GHG += device.quantity * DATA[device.index].footprint;
            GHG1 += device.quantity * (.85 * DATA[device.index].footprint + (currentLifespan * .15 * DATA[device.index].footprint) / 4);
            GHG2 += device.quantity * (.85 * DATA[device.index].footprint + (newLifespan * .15 * DATA[device.index].footprint) / 4);
        });
        const prevCost = totalCost / currentLifespan;
        const newCost = totalCost / newLifespan;
        const totalSaved = prevCost - newCost;
        // const prevGHG = GHG / currentLifespan;
        // const newGHG = GHG / newLifespan;
        // GHG = prevGHG - newGHG;
        const GHG = GHG1 / currentLifespan - GHG2 / newLifespan;
        const gallonsOfGas = (GHG * 2445/ 1000);
        const trashRecycled = (GHG * 43.6 / 1000);
        const seedlings = (GHG * 16.5/1000);
        return (
            <p className="text-lg font-light mb-2">If you update your RL to {parseFloat(newLifespan)} {parseFloat(newLifespan) === 1 ? 'year' : 'years'}, your estimated annual savings are <b>${totalSaved.toLocaleString('en-US', {maximumFractionDigits:2})}</b> and <b>{parseInt(GHG)}</b> kg of CO2 equivalent. That is equivalent to driving {parseInt(gallonsOfGas)} fewer {parseInt(gallonsOfGas) === 1 ? 'mile' : 'miles'}, planting {parseInt(seedlings)} new {parseInt(seedlings) === 1 ? 'seedling' : 'seedlings'} and letting them grow for ten years, or recycling {parseInt(trashRecycled)} {parseInt(trashRecycled) === 1 ? 'bag' : 'bags'} of trash instead of throwing them in the landfill!</p>
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