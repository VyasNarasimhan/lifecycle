import { useEffect } from "react";

import DATA from '../assets/devices.json';

function SearchBar({setSelectedDevices, setSearch, selectedDevices, search}) {

    useEffect(() => {
        localStorage.setItem('selectedDevices', JSON.stringify(selectedDevices));
    });

    const addDevice = (device) => {
        const index = DATA.indexOf(device);
        for (let i = 0; i < selectedDevices.length; i++) {
            if (selectedDevices[i].index === index) {
                return;
            }
        }
        setSelectedDevices([
            ...selectedDevices,
            {'index': index, 'quantity': 1, 'split': false}
        ]);
        setSearch('');
        localStorage.setItem('selectedDevices', JSON.stringify(selectedDevices));
    }

    const getHighlightedText = (text, highlight) => {
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return (
            <div className="font-normal">
                {parts.map(part => part.toLowerCase() === highlight.toLowerCase() ? <span className="font-bold">{part}</span> : part)}
            </div>
        );
    }

    const searched = (device) => {
        return (device.manufacturer + " " + device.name).toLowerCase().indexOf(search.toLowerCase()) !== -1;
    }

    return (
        <div>
            <div className="relative flex justify-center">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input 
                    type="search" 
                    className={DATA.filter(device => searched(device) && search.length > 0).length > 0 ? 
                        "block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-t-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" :
                        "block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"} 
                    placeholder="MacBook M2 Pro" 
                    onChange={(event) => setSearch(event.target.value)} 
                    value={search}
                    required />
            </div>
            {DATA.filter(device => searched(device) && search.length > 0).length > 0 &&
                <div className="relative overflow-x-auto mb-3">
                    <table className="w-full text-sm text-left text-gray-500 border">
                        <thead className="border text-xs text-gray-700 uppercase">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Device
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Cost
                                </th>
                                <th scope="col" className="px-6 py-3 flex justify-center">
                                    Carbon Footprint
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {DATA.filter(device => searched(device) && search.length > 0).map((device) => {
                                return (
                                    <tr className="bg-white border-b">
                                        <th scope="row" className="px-6 py-2">
                                            {getHighlightedText(device.manufacturer + " " + device.name, search)}
                                        </th>
                                        <td className="px-6 py-2">
                                            ${device.cost}
                                        </td>
                                        <td className="px-6 py-2">
                                            <div className="flex justify-center">{device.footprint} kg</div>
                                        </td>
                                        <td className="px-6 py-2 flex justify-end">
                                            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none" onClick={() => {addDevice(device)}}>Add</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>}
        </div>
    );
}

export default SearchBar;