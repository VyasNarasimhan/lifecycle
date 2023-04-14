// import github from '../assets/github-mark.png';
// import tracker from '../assets/tracker.png';
// import focus from '../assets/focus.png';
import React from "react";
import LineGraphs from "./LineGraphs";
import SearchBar from "./SearchBar";
import SelectedDevices from "./SelectedDevices";
import Results from "./Results";

function Home() {

    const [selectedDevices, setSelectedDevices] = React.useState([]);
    const [currentLifespan, setCurrentLifespan] = React.useState(0);
    const [newLifespan, setNewLifespan] = React.useState(0);
    const [search, setSearch] = React.useState('');

    return (
        <div className="container m-auto">
            <div className="p-10 lg:px-64">
                <div className="text-center mb-5">
                    <p className="text-3xl font-bold mb-2">Lifecycle Optimization Calculator</p>
                    <p className="text-lg font-light mb-2">Replace laptops less frequently, and get the expected savings.</p>
                </div>
                <p className="text-xl font-semibold mb-1">Step 1: Select devices</p>
                <SearchBar setSelectedDevices={setSelectedDevices} setSearch={setSearch} selectedDevices={selectedDevices} search={search} />
                <SelectedDevices setSelectedDevices={setSelectedDevices} selectedDevices={selectedDevices} />
                <p className="text-xl font-semibold mb-1">Step 2: Set Replacement Cycle</p>
                <p className="text-sm italic mb-1">This is the amount of time (on average) that the department keeps their devices for. For example, if you replace your devices every 4 years, your current replacement cycle would be 4.</p>
                <p className="text-lg font-semibold text-center">Current Replacement Cycle (years)</p>
                <input
                    type="range"
                    className="transparent h-1.5 w-full cursor-pointer appearance-none rounded-lg border-transparent bg-neutral-200 accent-blue-700"
                    min="0"
                    max="8"
                    step="0.5"
                    value={currentLifespan} 
                    onChange={(event) => {setCurrentLifespan(event.target.value)}} />
                <span className="flex justify-between mx-1 mb-8">
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
                    className="transparent h-1.5 w-full cursor-pointer appearance-none rounded-lg border-transparent bg-neutral-200 accent-blue-700"
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
                <div className="p-4 mb-2 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                    <span className="font-medium">Your new replacement cycle is smaller than your existing replacement cycle. This will result in you spending more money and more carbon emissions.</span>
                </div>}
                <p className="text-xl font-semibold mb-1">Step 3: View your potential savings</p>
                <Results selectedDevices={selectedDevices} currentLifespan={parseFloat(currentLifespan)} newLifespan={parseFloat(newLifespan)} />
                <LineGraphs currentLifespan={parseFloat(currentLifespan)} selectedDevices={selectedDevices} newLifespan={parseFloat(newLifespan)}/>
                <p className="italic text-sm font-normal text-center">Environmental equivalencies calculated from <a className="text-blue-600 hover:underline" href="https://www.epa.gov/energy/greenhouse-gas-equivalencies-calculator" target="_blank" rel="noreferrer">https://www.epa.gov/energy/greenhouse-gas-equivalencies-calculator</a>.</p>
                {/* <br />
                <br /> */}
                {/* <p className="text-lg font-light mb-2">The Lifecycle Optimization Calculator (LOC) below estimates the environmental and financial impacts of changing a company's recommended lifespan (RL) for a specific type of device.  The RL is the amount of time a functioning company-owned device is used before the company recommends replacement.  Many of the current RLs are based on original, out-dated warranties and do not correlate with any concrete evidence about device efficiency in the workplace. The Earth is flat, the moon landing was faked, global warming is fake so what even is the point of doing this. Is anyone even reading this?  By disposing of functioning machines, companies are generating an excess of e-waste, negatively impacting the environment and wasting company resources.</p> */}
            </div>
        </div>
    );
}

export default Home;
