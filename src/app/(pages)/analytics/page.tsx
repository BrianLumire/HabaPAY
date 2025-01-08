"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import AppChart from "@/components/AppChart"; // Assuming AppChart is imported here
import RecentTable from "@/components/RecentTables";
import Map from "@/components/Map";
import { getAnalyticsOverview } from "@/utils/api"; // Import the API function

// Sample Data for AppChart as fallback
const defaultData = [
  { name: "Sun", NewUsers: 10, NationalReach: 11 },
  { name: "Mon", NewUsers: 80, NationalReach: 13 },
  { name: "Tue", NewUsers: 200, NationalReach: 28 },
  { name: "Wed", NewUsers: 278, NationalReach: 39 },
  { name: "Thu", NewUsers: 189, NationalReach: 31 },
  { name: "Fri", NewUsers: 239, NationalReach: 38 },
  { name: "Sat", NewUsers: 300, NationalReach: 43 },
];

const Analyticspage = () => {
  // State to store analytics data fetched from API
  const [analyticsData, setAnalyticsData] = useState({
    weekly_transactions: { total: 0, percentage: 0 },
    weekly_signups: { total: 0, percentage: 0 },
    weekly_exchanges: { total: 0, percentage: 0 },
    national_reach: { total_users: 0, total_counties: 0 },
  });

  // State for AppChart data
  const [chartData, setChartData] = useState(defaultData);

  // State for managing the selected metric (All, NewUsers, NationalReach)
  const [selectedMetric, setSelectedMetric] = useState<"All" | "NewUsers" | "NationalReach">("All");
  // State to manage visibility of the filter dropdown
  const [showDropdown, setShowDropdown] = useState(false);

  // Fetch data from API
  const fetchAnalyticsData = async () => {
    try {
      const response = await getAnalyticsOverview(); // Call the API function
      if (response.success) {
        setAnalyticsData(response.data);

        // Update chart data based on API response (use a transformation if needed)
        const newChartData = defaultData.map((item, index) => ({
          ...item,
          NewUsers: Math.floor(Math.random() * 300), // Replace with actual logic
          NationalReach: Math.floor(Math.random() * 50), // Replace with actual logic
        }));
        setChartData(newChartData);
      } else {
        console.error("Error fetching analytics data:", response.message);
      }
    } catch (err) {
      console.error("API request failed:", err);
    }
  };

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  // Toggle dropdown visibility
  const handleFilterClick = () => {
    setShowDropdown((prev) => !prev);
  };

  // Handle metric selection
  const handleMetricSelect = (metric: "All" | "NewUsers" | "NationalReach") => {
    setSelectedMetric(metric);
    setShowDropdown(false); // Close dropdown
  };

  const { weekly_transactions, weekly_signups, weekly_exchanges, national_reach } = analyticsData;

  return (
    <div className="pb-8 mt-4">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row gap-3 mb-3">
        <div className="w-full md:w-2/3 border border-gray-200 rounded-sm">
          {/* Card Section */}
          <div className="flex flex-col md:flex-row gap-3 md:justify-between">
            {/* Weekly Usage */}
            <div className="bg-[#FFF7E8] md:w-1/3 border border-[#faecd0] p-2 flex flex-col gap-4">
              <p className="font-ibmPlexSans text-base text-black">Weekly Usage</p>
              <span className="font-ibmPlexSans text-sm text-black">
                {weekly_transactions.total.toLocaleString()} Transactions
              </span>
              <div className="bg-white px-[3px] py-[2px] flex items-center gap-2 w-20">
                <Image src="/downward.svg" alt="" width={12} height={12} />
                <span className="text-xs font-ibmPlexSans text-[#FDAC15]">
                  {weekly_transactions.percentage} %
                </span>
              </div>
            </div>
            {/* Weekly Sign-Ups */}
            <div className="bg-[#FFF7E8] md:w-1/3 border border-[#faecd0] p-2 flex flex-col gap-4">
              <p className="font-ibmPlexSans text-base text-black">Weekly Sign-Ups</p>
              <span className="font-ibmPlexSans text-sm text-black">
                {weekly_signups.total} Users
              </span>
              <div className="bg-white px-[3px] py-[2px] flex items-center gap-2 w-20">
                <Image src="/downward.svg" alt="" width={12} height={12} />
                <span className="text-xs font-ibmPlexSans text-[#FDAC15]">
                  {weekly_signups.percentage} %
                </span>
              </div>
            </div>
            {/* Weekly Exchange */}
            <div className="bg-[#FFF7E8] w-full md:w-1/3 border border-[#faecd0] p-2 flex flex-col gap-4">
              <p className="font-ibmPlexSans text-base text-black">Weekly Exchange</p>
              <span className="font-ibmPlexSans text-sm text-black">
                Ksh {weekly_exchanges.total.toLocaleString()}
              </span>
              <div className="bg-white px-[3px] py-[2px] flex items-center gap-2 w-20">
                <Image src="/trend.png" alt="" width={12} height={12} />
                <span className="text-xs font-ibmPlexSans text-black">
                  {weekly_exchanges.percentage} %
                </span>
              </div>
            </div>
          </div>

          {/* App Adoption Chart Section */}
          <div className="mt-4 relative">
            <div className="flex items-center justify-between pr-6 pl-2">
              <p className="text-lg font-semibold font-ibmPlexSans">App Adoption</p>
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
              <div className="absolute mt-2 right-2 bg-white border border-gray-300 rounded-md p-2 shadow-lg z-10 w-[150px]">
                <ul className="space-y-1">
                  <li>
                    <button
                      onClick={() => handleMetricSelect("All")}
                      className="w-full text-black text-left text-sm p-2 hover:bg-[#f5e4c6] hover:text-[#FDAC15]"
                    >
                      All
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleMetricSelect("NewUsers")}
                      className="w-full text-black text-left text-sm p-2 hover:bg-[#f5e4c6] hover:text-[#FDAC15]"
                    >
                      New Users
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleMetricSelect("NationalReach")}
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
              <AppChart selectedMetric={selectedMetric} data={chartData} />
            </div>
          </div>
        </div>

        {/* Customers by Region Map Section */}
        <div className="w-full p-2 md:w-1/3 border border-gray-200 rounded-sm">
          <h2 className="font-ibmPlexSans text-lg font-semibold">Customers by Region</h2>
          <Map />
          {/* Subtext Section */}
          <div className="flex mt-3 justify-between items-center px-4">
            {/* Left */}
            <div className="flex flex-col">
              <p className="font-ibmPlexSans text-lg font-medium">National Reach</p>
              <span className="font-ibmPlexSans text-sm font-medium">
                {national_reach.total_counties} counties
              </span>
            </div>
            {/* Right */}
            <div className="flex flex-col">
              <p className="font-ibmPlexSans text-lg font-medium">Total Users</p>
              <span className="font-ibmPlexSans text-sm font-medium">
                {national_reach.total_users.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border border-gray-200 rounded-sm">
        <div className="flex items-center justify-between p-2">
          <p className="text-lg font-semibold font-ibmPlexSans">Recent Activity</p>
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
