"use client";
import React, { useState } from "react";

const DevicesTable = () => {
  // Devices data
  const devices = [
    {
      browser: "Chrome on Android",
      device: "Samsung A51",
      location: "Kangemi, Nairobi, Kenya",
      lastSeen: "Online",
    },
    {
      browser: "Firefox on iOS",
      device: "iPhone 12",
      location: "Westlands, Nairobi, Kenya",
      lastSeen: "2 hours ago",
    },
    {
      browser: "Safari on macOS",
      device: "MacBook Pro",
      location: "Kilimani, Nairobi, Kenya",
      lastSeen: "1 day ago",
    },
  ];

  // State to track selection of devices
  const [selectedDevices, setSelectedDevices] = useState<boolean[]>(new Array(devices.length).fill(false));

  // State to track the "Select All" checkbox in the header
  const [selectAll, setSelectAll] = useState<boolean>(false);

  // Handle individual checkbox change
  const handleCheckboxChange = (index: number) => {
    const updatedSelectedDevices = [...selectedDevices];
    updatedSelectedDevices[index] = !updatedSelectedDevices[index];
    setSelectedDevices(updatedSelectedDevices);

    // Check if all devices are selected, then update the selectAll state
    setSelectAll(updatedSelectedDevices.every((selected) => selected));
  };

  // Handle the "Select All" checkbox in the header
  const handleSelectAllChange = () => {
    const updatedSelectAll = !selectAll;
    setSelectAll(updatedSelectAll);
    setSelectedDevices(devices.map(() => updatedSelectAll)); // Select/Deselect all devices
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-[#FFF7E8] text-black">
          <tr>
            <th className="py-2 px-4 text-left font-semibold w-[5%]">
              {/* "Select All" checkbox */}
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAllChange}
              />
            </th>
            <th className="py-2 px-4 text-left font-semibold w-[25%]">Browser</th>
            <th className="py-2 px-4 text-left font-semibold w-[25%]">Device</th>
            <th className="py-2 px-4 text-left font-semibold w-[25%]">Location</th>
            <th className="py-2 px-4 text-left font-semibold w-[20%]">Last Seen</th>
          </tr>
        </thead>
        <tbody>
          {devices.map((device, index) => (
            <tr
              key={index}
              className={`hover:bg-gray-100 border-t border-gray-100 ${selectedDevices[index] ? "bg-[#FFF7E8]" : ""}`}
            >
              <td className="py-2 px-4">
                {/* Individual device checkbox */}
                <input
                  type="checkbox"
                  checked={selectedDevices[index]}
                  onChange={() => handleCheckboxChange(index)}
                />
              </td>
              <td className="py-2 text-sm sm:text-base px-4">{device.browser}</td>
              <td className="py-2 text-sm sm:text-base px-4">{device.device}</td>
              <td className="py-2 text-sm sm:text-base px-4">{device.location}</td>
              <td className="py-2 text-sm sm:text-base px-4">{device.lastSeen}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DevicesTable;
