"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import AppChart from "@/components/AppChart"; // Assuming AppChart is imported here
import RecentTable from "@/components/RecentTables";
import Map from '@/components/Map';

// Sample Data for the AppChart
const data = [
  {
    name: 'Sun',
    NewUsers: 10,
    NationalReach: 11,
  },
  {
    name: 'Mon',
    NewUsers: 80,
    NationalReach: 13,
  },
  {
    name: 'Tue',
    NewUsers: 200,
    NationalReach: 28,
  },
  {
    name: 'Wed',
    NewUsers: 278,
    NationalReach: 39,
  },
  {
    name: 'Thu',
    NewUsers: 189,
    NationalReach: 31,
  },
  {
    name: 'Fri',
    NewUsers: 239,
    NationalReach: 38,
  },
  {
    name: 'Sat',
    NewUsers: 300,
    NationalReach: 43,
  },
];

const Analyticspage = () => {
  // State for managing the selected metric (All, NewUsers, NationalReach)
  const [selectedMetric, setSelectedMetric] = useState<'All' | 'NewUsers' | 'NationalReach'>('All');
  // State to manage visibility of the filter dropdown
  const [showDropdown, setShowDropdown] = useState(false);

  // Toggle the dropdown visibility when the button is clicked
  const handleFilterClick = () => {
    setShowDropdown((prev) => !prev);
  };

  // Handle selection of metric and close dropdown
  const handleMetricSelect = (metric: 'All' | 'NewUsers' | 'NationalReach') => {
    setSelectedMetric(metric);
    setShowDropdown(false); // Close dropdown after selection
  };

  return (
    <div className="pb-8 mt-4">

      {/* Top Section */}
      <div className="flex  flex-col  md:flex-row gap-3 mb-3">
        <div className=" w-full  md:w-2/3 border border-gray-200 rounded-sm">
          {/* Card Section */}
          <div className="flex flex-col md:flex-row gap-3 md:justify-between">
            <div className="bg-[#FFF7E8] md:w-1/3 border border-[#faecd0] p-2 flex flex-col gap-4">
              <p className='font-ibmPlexSans text-base text-black'>Weekly Usage</p>
              <span className='font-ibmPlexSans text-sm text-black'>16,742 Transactions</span>
              <div className=" bg-white px-[3px] py-[2px] flex items-center gap-2 w-20">
                <Image src="/downward.svg" alt="" width={12} height={12} />
                <span className='text-xs font-ibmPlexSans text-[#FDAC15]'>3 %</span>
              </div>
            </div>
            <div className="bg-[#FFF7E8] md:w-1/3 border border-[#faecd0] p-2 flex flex-col gap-4">
              <p className='font-ibmPlexSans text-base text-black'>Weekly Sign-Ups</p>
              <span className='font-ibmPlexSans text-sm text-black'>225 Users</span>
              <div className=" bg-white px-[3px] py-[2px] flex items-center gap-2 w-20">
                <Image src="/downward.svg" alt="" width={12} height={12} />
                <span className='text-xs font-ibmPlexSans text-[#FDAC15]'>5 %</span>
              </div>
            </div>
            <div className="bg-[#FFF7E8] w-full  md:w-1/3 border border-[#faecd0] p-2 flex flex-col gap-4">
              <p className='font-ibmPlexSans text-base text-black'>Weekly Exchange</p>
              <span className='font-ibmPlexSans text-sm text-black'>Ksh 204,558</span>
              <div className=" bg-white px-[3px] py-[2px] flex items-center gap-2 w-20">
                <Image src="/trend.png" alt="" width={12} height={12} />
                <span className='text-xs font-ibmPlexSans text-black'>5 %</span>
              </div>
            </div>
          </div>

          {/* App Adoption Chart Section */}
          <div className="mt-4 relative"> {/* Set relative position on parent */}
            <div className="flex items-center justify-between pr-6 pl-2">
              <p className='text-lg font-semibold font-ibmPlexSans'>App Adoption</p>
              <button
                onClick={handleFilterClick}
                className="px-3 py-[2px] flex items-center gap-2 border border-[#FDAC15] rounded-sm"
              >
                <span className="text-[#FDAC15] text-sm">Filter</span>
                <Image src="/filter.svg" alt="" width={15} height={15} />
              </button>
            </div>

            {/* Filter Dropdown */}
            {showDropdown && (
              <div className="absolute mt-2 right-2 bg-white border border-gray-300  rounded-md p-2 shadow-lg z-10 w-[150px]">
                <ul className="space-y-1">
                  <li>
                    <button
                      onClick={() => handleMetricSelect('All')}
                      className="w-full text-black text-left text-sm p-2 hover:bg-[#f5e4c6] hover:text-[#FDAC15]"
                    >
                      All
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleMetricSelect('NewUsers')}
                      className="w-full text-black text-left text-sm p-2 hover:bg-[#f5e4c6] hover:text-[#FDAC15]"
                    >
                      New Users
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleMetricSelect('NationalReach')}
                      className="w-full text-black text-left text-sm p-2 hover:bg-[#f5e4c6] hover:text-[#FDAC15]"
                    >
                      National Reach
                    </button>
                  </li>
                </ul>
              </div>
            )}

            {/* Chart Display */}
            <div className="w-full text-black mt-3 h-[450px]">
              <AppChart selectedMetric={selectedMetric} data={data} />
            </div>
          </div>
        </div>

        {/* Customers by Region Map Section */}
        <div className="w-full p-2 md:w-1/3 border border-gray-200 rounded-sm">
          <h2 className='font-ibmPlexSans text-lg font-semibold '>Customers by Region</h2>
          
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border border-gray-200 rounded-sm">
        <div className="flex items-center justify-between p-2">
          <p className='text-lg font-semibold font-ibmPlexSans'>Recent Activity</p>
          <button className="px-3 py-[2px] flex items-center gap-2 border border-[#FDAC15] rounded-sm">
            <span className="text-[#FDAC15] text-sm">Filter</span>
            <Image src="/filter.svg" alt="" width={15} height={15} />
          </button>
        </div>
       
        <RecentTable />
      </div>
    </div>
  );
};

export default Analyticspage;
