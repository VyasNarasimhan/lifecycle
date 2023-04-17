import React, { useState } from "react";
import CO2Info from './CO2Info';

import DATA from '../assets/devices.json';

function SelectedDevices({setSelectedDevices, selectedDevices}) {

    const [showModal, setShowModal] = useState(false);

    const deleteRow = (device) => {
        setSelectedDevices(
            selectedDevices.filter(selected =>
                selected.index !== device.index
            )
        );
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

    const updateSplit = (device) => {
        setSelectedDevices(selectedDevices.map(selected => {
            if (selected.index === device.index) {
                return {'index': device.index, 'quantity': device.quantity, 'split': !device.split};
            } else {
                return selected;
            }
        }));
    }

    if (selectedDevices.length === 0) {
        return (
            <div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 mb-3 mt-1" role="alert">
                <span className="font-medium">Devices you add will be displayed here</span>
            </div>
        );
    } else {
        return (
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
                                    <span className="inline-flex items-center">
                                        Carbon Footprint
                                        <button type="button" class="text-gray-900 focus:outline-none font-medium rounded-lg text-sm px-1 py-1 text-center ml-1" onClick={() => {setShowModal(!showModal)}}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                                            </svg>
                                        </button>
                                    </span>
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
                                            <p onClick={() => {updateSplit(device)}}>{device.split ? Math.round(.85 * DATA[device.index].footprint).toString() + ' + ' + Math.round(.15 * DATA[device.index].footprint / 4).toString() : DATA[device.index].footprint} kg</p>
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
                    <CO2Info showModal={showModal} setShowModal={setShowModal}/>
                </div>
            </div>
        );
    }
}

export default SelectedDevices;