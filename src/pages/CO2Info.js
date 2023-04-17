const CO2Info = ({showModal, setShowModal}) => {
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-4 border-b border-solid border-slate-200 rounded-t">
                    <p className="text-2xl font-semibold">What is a carbon footprint?</p>
                </div>
                <div className="relative p-2 flex-auto my-2 mx-1 text-slate-500 text-md leading-relaxed">
                  <p className="mb-2">
                    The carbon footprint (also known as the product carbon footprint) is the amount of carbon emitted through the production
                    and general use of a device. This amount can be minimized if devices are purchased less frequently.
                  </p>
                  <p>
                    The carbon footprint is primarily made up of two parts: <b>embodied</b> carbon and <b>operational</b> carbon. Embodied carbon
                    is emitted during the production of a device, while operational carbon is emitted through its general use. For this website,
                    approximately <b>85%</b> of the carbon footprint of a laptop is embodied, while the remaining <b>15%</b> is operational, incurred
                    over 4 years. To view the split of embodied vs operational carbon <b>per year</b> for any laptop, you can click on each laptop's carbon
                    footprint in the <i>Selected Devices</i> section.
                  </p>
                </div>
                <div className="flex items-center justify-end p-3 border-t border-solid border-slate-200 rounded-b">
                    <button type="button" class="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={() => setShowModal(false)}>Close</button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default CO2Info;