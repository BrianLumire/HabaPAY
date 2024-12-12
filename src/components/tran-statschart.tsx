"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Chart from '@/components/Chart';

const TranStatsChart = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  // Sample data for the transaction statistics (per day of the week)
  const data = [
    { name: 'Sun', Transactions: 100000 },
    { name: 'Mon', Transactions: 200000 },
    { name: 'Tue', Transactions: 150000 },
    { name: 'Wed', Transactions: 300000 },
    { name: 'Thu', Transactions: 250000 },
    { name: 'Fri', Transactions: 350000 },
    { name: 'Sat', Transactions: 400000 },
  ];

  // Filter the data based on the selected filter (e.g., 100k, 200k, etc.)
  const filterThreshold = selectedFilter ? parseInt(selectedFilter.replace('k', '000')) : 0;
  const filteredData = data.filter(item => item.Transactions >= filterThreshold);

  // Toggle dropdown visibility
  const toggleDropdown = () => setShowDropdown(prev => !prev);

  // Handle filter selection, explicitly type the 'filter' parameter as 'string'
  const handleSelectFilter = (filter: string) => {
    setSelectedFilter(filter);
    setShowDropdown(false);
  };

  // Remove filter (reset to no filter)
  const handleRemoveFilter = () => {
    setSelectedFilter(null);
  };

  return (
    <div className="border border-gray-200 rounded-sm p-2 relative">
      {/* Title and Filter Button */}
      <div className="flex items-center relative justify-between mb-4">
        <h2 className="font-ibmPlexSans text-base md:text-lg font-semibold">Transaction Statistics</h2>
        <button
          onClick={toggleDropdown}
          className="rounded-md border border-[#FDAC15] flex items-center gap-2 px-2 py-[2px] bg-[#FDAC15]"
        >
          <span className="font-ibmPlexSans text-white text-sm">Chart Filters</span>
          <Image src="/whitedrop.svg" alt="Filter Icon" width={10} height={10} />
        </button>
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute mt-2 right-2 bg-white border border-gray-300 rounded-md p-2 shadow-lg z-10">
          <ul className="space-y-1">
            {['100k', '200k', '300k', '400k', '500k'].map((amount) => (
              <li key={amount}>
                <button
                  onClick={() => handleSelectFilter(amount)}
                  className="w-full text-left text-sm p-2 hover:bg-[#f5e4c6] hover:text-[#FDAC15]"
                >
                  {selectedFilter === amount ? `${amount} (Applied)` : `Transactions > ${amount}`}
                  {selectedFilter === amount && (
                    <span
                      className="ml-2 cursor-pointer text-red-500"
                      onClick={handleRemoveFilter}
                    >
                      X
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Chart Component with filtered data */}
      <Chart data={filteredData} />

      {/* Legend Section - Positioned Below the Chart */}
      <div className="flex flex-col">
        <p className='flex justify-center  font-ibmPlexSans text-xs md:text-sm font-semibold'>LEGEND</p>
        <div className="flex gap-4 mt-1 justify-center">
        <div className="flex items-center gap-2">
          <Image src="/yellow.svg" alt="" width={14} height={14} />
          <span className="text-[#FDAC15] text-xs md:text-sm">Transactions</span>
        </div>
        <div className="flex items-center gap-2">
          <Image src="/black.svg" alt="" width={14} height={14} />
          <span className="text-xs md:text-sm">National Reach</span>
        </div>
        </div>
       
      </div>
    </div>
  );
};

export default TranStatsChart;
