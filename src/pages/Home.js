// import github from '../assets/github-mark.png';
// import tracker from '../assets/tracker.png';
// import focus from '../assets/focus.png';
import React from "react";
import DATA from '../assets/devices.json';

function Home() {

    const [selectedDevices, setSelectedDevices] = React.useState([]);
    const [currentLifespan, setCurrentLifespan] = React.useState(0);
    const [newLifespan, setNewLifespan] = React.useState(0);
    const [search, setSearch] = React.useState('');

    const addDevice = (device) => {
        const index = DATA.indexOf(device);
        for (let i = 0; i < selectedDevices.length; i++) {
            if (selectedDevices[i].index === index) {
                return;
            }
        }
        setSelectedDevices([
            ...selectedDevices,
            {'index': index, 'quantity': 1}
        ]);
        setSearch('');
    }

    const updateQuantity = (event, device) => {
        setSelectedDevices(selectedDevices.map(selected => {
            if (selected.index === device.index) {
                return {'index': device.index, 'quantity': event.target.value};
            } else {
                return selected;
            }
        }));
    }

    const deleteRow = (device) => {
        setSelectedDevices(
            selectedDevices.filter(selected =>
                selected.index !== device.index
            )
        );
    }

    const calculate = () => {
        let totalCost = 0;
        let GHG = 0;
        selectedDevices.forEach((device) => {
            totalCost += device.quantity * DATA[device.index].cost;
            GHG += device.quantity * DATA[device.index].footprint;
        });
        const prevCost = totalCost / currentLifespan;
        const newCost = totalCost / newLifespan;
        const totalSaved = prevCost - newCost;
        const prevGHG = GHG / currentLifespan;
        const newGHG = GHG / newLifespan
        GHG = prevGHG - newGHG;
        const gallonsOfGas = (GHG * 2445/ 1000);
        const trashRecycled = (GHG * 43.6 / 1000);
        const seedlings = (GHG * 16.5/1000);
        return (
            <p className="text-lg font-light mb-2">If you update your RL to {parseFloat(newLifespan)} {parseFloat(newLifespan) === 1 ? 'year' : 'years'}, your estimated annual savings are <b>${totalSaved.toLocaleString('en-US', {maximumFractionDigits:2})}</b> and <b>{parseInt(GHG)}</b> kg of CO2 equivalent. That is equivalent to driving {parseInt(gallonsOfGas)} fewer {parseInt(gallonsOfGas) === 1 ? 'mile' : 'miles'}, planting {parseInt(seedlings)} new {parseInt(seedlings) === 1 ? 'seedling' : 'seedlings'} and letting them grow for ten years, or recycling {parseInt(trashRecycled)} {parseInt(trashRecycled) === 1 ? 'bag' : 'bags'} of trash instead of throwing them in the landfill!</p>
        );
    }

    let deviceDisplay = (
        <div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 mb-3 mt-1" role="alert">
            <span className="font-medium">Devices you add will be displayed here</span>
        </div>
    );

    let results = (
        <div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 mb-3" role="alert">
            <span className="font-medium">Once you've entered all of the above information, your results will be displayed here</span>
        </div>
    );

    let searchResults = (
        <div className="relative overflow-x-auto mb-3">
            <table className="w-full text-sm text-left text-gray-500 border">
                <thead className="border text-xs text-gray-700 uppercase">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Manufacturer
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Cost
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Carbon Footprint
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {DATA.filter(device => (device.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 || device.manufacturer.toLowerCase().indexOf(search.toLowerCase()) !== -1) && search.length > 0).map((device) => {
                        return (
                            <tr className="bg-white border-b">
                                <th scope="row" className="px-6 py-4 font-medium">
                                    {device.name}
                                </th>
                                <td className="px-6 py-4">
                                    {device.manufacturer}
                                </td>
                                <td className="px-6 py-4">
                                    ${device.cost}
                                </td>
                                <td className="px-6 py-4">
                                    {device.footprint} kg
                                </td>
                                <td className="px-6 py-4">
                                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none" onClick={() => {addDevice(device)}}>Add</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );

    if (selectedDevices.length > 0) {
        if (currentLifespan > 0 && newLifespan > 0) {
            results = (
                calculate()
            );
        }
        deviceDisplay = (
            <div>
                <p className="text-lg font-semibold text-center my-1">Selected Devices</p>
                <div className="relative overflow-x-auto mb-3">
                    <table className="w-full text-sm text-left text-gray-500 border">
                        <thead className="border text-xs text-gray-700 uppercase">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Manufacturer
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Quantity
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Cost
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Carbon Footprint
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedDevices.map((device) => {
                                return (
                                    <tr className="bg-white border-b">
                                        <th scope="row" className="px-6 py-4 font-medium">
                                            {DATA[device.index].name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {DATA[device.index].manufacturer}
                                        </td>
                                        <td className="px-6 py-4">
                                            <input type="number" min="0" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" value={device.quantity} onChange={(event) => {updateQuantity(event, device)}} required />
                                        </td>
                                        <td className="px-6 py-4">
                                            ${DATA[device.index].cost}
                                        </td>
                                        <td className="px-6 py-4">
                                            {DATA[device.index].footprint} kg
                                        </td>
                                        <td className="px-6 py-4">
                                            <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg px-2.5 py-2.5">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4" onClick={() => {deleteRow(device)}}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    return (
        <div className="container m-auto">
            <div className="p-10 lg:px-64">
                <div className="text-center mb-5">
                    <p className="text-3xl font-bold mb-2">Lifecycle Optimization Calculator</p>
                    <p className="text-lg font-light mb-2">The Lifecycle Optimization Calculator (LOC) below estimates the environmental and financial impacts of changing a company's recommended lifespan (RL) for a specific type of device.  The RL is the amount of time a functioning company-owned device is used before the company recommends replacement.  Many of the current RLs are based on original, out-dated warranties and do not correlate with any concrete evidence about device efficiency in the workplace. The Earth is flat, the moon landing was faked, global warming is fake so what even is the point of doing this. Is anyone even reading this?  By disposing of functioning machines, companies are generating an excess of e-waste, negatively impacting the environment and wasting company resources.</p>
                </div>
                <p className="text-xl font-semibold mb-1">Step 1: Select devices</p>
                {/* <div className="flex mb-3">
                    <select data-te-select-filter="true" className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mr-2" onChange={(event) => {setNewDevice(event.target.value)}}>
                        <option selected>Choose a device</option>
                        {DATA.map((device, index) => {
                            return <option value={index}>{device.name}</option>
                        })}
                    </select>
                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none" onClick={addDeviceToSelected}>Add</button>
                </div> */}
                <form>   
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                        <input 
                            type="search" 
                            className={DATA.filter(device => ((device.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 || device.manufacturer.toLowerCase().indexOf(search.toLowerCase()) !== -1) && search.length > 0)).length > 0 ? 
                                "block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-t-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" :
                                "block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"} 
                            placeholder="MacBook M2 Pro" 
                            onChange={(event) => setSearch(event.target.value)} 
                            required />
                    </div>
                </form>
                {DATA.filter(device => ((device.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 || device.manufacturer.toLowerCase().indexOf(search.toLowerCase()) !== -1) && search.length > 0)).length > 0 && searchResults}
                {deviceDisplay}
                <p className="text-xl font-semibold mb-1">Step 2: Set Replacement Cycle</p>
                <p className="text-lg font-semibold text-center">Current Replacement Cycle (years)</p>
                <input
                    type="range"
                    className="transparent h-1.5 w-full cursor-pointer appearance-none rounded-lg border-transparent bg-neutral-200"
                    min="0"
                    max="4"
                    step="0.5"
                    value={currentLifespan} 
                    onChange={(event) => {setCurrentLifespan(event.target.value)}} />
                <span className="flex justify-between mx-1 mb-1">
                    <p className="font-normal text-sm">0</p>
                    <p className="font-normal text-sm">0.5</p>
                    <p className="font-normal text-sm">1</p>
                    <p className="font-normal text-sm">1.5</p>
                    <p className="font-normal text-sm">2</p>
                    <p className="font-normal text-sm">2.5</p>
                    <p className="font-normal text-sm">3</p>
                    <p className="font-normal text-sm">3.5</p>
                    <p className="font-normal text-sm">4</p>
                    <p className="font-normal text-sm">4.5</p>
                    <p className="font-normal text-sm">5</p>
                    <p className="font-normal text-sm">5.5</p>
                    <p className="font-normal text-sm">6</p>
                    <p className="font-normal text-sm">6.5</p>
                    <p className="font-normal text-sm">7</p>
                    <p className="font-normal text-sm">7.5</p>
                    <p className="font-normal text-sm">8</p>
                </span>
                <p className="text-lg font-semibold text-center">New Replacement Cycle (years)</p>
                <input
                    type="range"
                    className="transparent h-1.5 w-full cursor-pointer appearance-none rounded-lg border-transparent bg-neutral-200"
                    min="0"
                    max="8"
                    step="0.5"
                    value={newLifespan}
                    onChange={(event) => {setNewLifespan(event.target.value)}} />
                <span className="flex justify-between mx-1 mb-3">
                    <p className="font-normal text-sm">0</p>
                    <p className="font-normal text-sm">0.5</p>
                    <p className="font-normal text-sm">1</p>
                    <p className="font-normal text-sm">1.5</p>
                    <p className="font-normal text-sm">2</p>
                    <p className="font-normal text-sm">2.5</p>
                    <p className="font-normal text-sm">3</p>
                    <p className="font-normal text-sm">3.5</p>
                    <p className="font-normal text-sm">4</p>
                    <p className="font-normal text-sm">4.5</p>
                    <p className="font-normal text-sm">5</p>
                    <p className="font-normal text-sm">5.5</p>
                    <p className="font-normal text-sm">6</p>
                    <p className="font-normal text-sm">6.5</p>
                    <p className="font-normal text-sm">7</p>
                    <p className="font-normal text-sm">7.5</p>
                    <p className="font-normal text-sm">8</p>
                </span>
                {newLifespan < currentLifespan && 
                <div class="p-4 mb-2 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                    <span class="font-medium">Your new replacement cycle is smaller than your existing replacement cycle. This will result in you spending more money and more carbon emissions.</span>
                </div>}
                <p className="text-xl font-semibold mb-1">Step 3: View your potential savings</p>
                {results}
                <p className="italic text-sm font-normal text-center">Environmental equivalencies calculated from <a className="text-blue-600 hover:underline" href="https://www.epa.gov/energy/greenhouse-gas-equivalencies-calculator" target="_blank">https://www.epa.gov/energy/greenhouse-gas-equivalencies-calculator</a>.</p>
            </div>
        </div>
    );
}

export default Home;
