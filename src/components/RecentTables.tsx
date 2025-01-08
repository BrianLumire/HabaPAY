"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getAnalyticsActivity } from "@/utils/api"; // Import the API function

type Recent = {
  id: number;
  name: string;
  balance: string;
  transactions: number;
  applaunches: number;
  status: string;
  manage1: string;
  manage2: string;
};

const columns = [
  { header: "Name", accessor: "name" },
  { header: "Balance", accessor: "balance", icon: "/triangle-button.png" },
  { header: "Transactions", accessor: "transactions", icon: "/triangle-button.png" },
  { header: "App Launches", accessor: "applaunches", icon: "/triangle-button.png" },
  { header: "Status", accessor: "status", icon: "/triangle-button.png" },
  { header: "Manage", accessor: "manage1" },
];

const RecentTables = () => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Recent;
    direction: "asc" | "desc";
  }>({
    key: "balance",
    direction: "asc",
  });

  const [data, setData] = useState<Recent[]>([]); // State to store fetched data
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAnalyticsActivity(1, 10); // Fetch the first page with 10 records
        const apiData = response.data.data; // Access the nested `data` array

        // Map the API response to match the `Recent` type
        const mappedData = apiData.map((item: any) => ({
          id: item.user_id,
          name: item.username,
          balance: `Ksh${item.balance}`,
          transactions: item.total_transactions,
          applaunches: item.app_launches,
          status: item.status,
          manage1: "/edit.svg", // Use /edit.svg
          manage2: "/dot3.svg", // Use /dot3.svg
        }));

        setData(mappedData); // Update the state with the mapped data
      } catch (error: any) {
        setError(error.message || "Failed to fetch data."); // Handle errors
      } finally {
        setIsLoading(false); // Set loading to false
      }
    };

    fetchData();
  }, []);

  const requestSort = (key: keyof Recent) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortConfig.direction === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
    }

    return 0; // If values are neither string nor number, don't change order
  });

  const renderRow = (item: Recent) => {
    return (
      <tr key={item.id} className="border-b border-gray-300 py-4 hover:bg-slate-100">
        <td scope="row" className="font-ibmPlexSans py-[2px] pl-2 text-sm sm:text-base whitespace-nowrap sm:whitespace-normal">
          {item.name}
        </td>
        <td className="font-ibmPlexSans text-sm sm:text-base whitespace-nowrap sm:whitespace-normal">
          {item.balance}
        </td>
        <td className="font-ibmPlexSans text-sm sm:text-base whitespace-nowrap sm:whitespace-normal">
          {item.transactions}
        </td>
        <td className="font-ibmPlexSans text-sm sm:text-base whitespace-nowrap sm:whitespace-normal">
          {item.applaunches}
        </td>
        <td className="font-ibmPlexSans text-sm sm:text-base whitespace-nowrap sm:whitespace-normal">
          {item.status}
        </td>
        <td className="flex  whitespace-nowrap sm:whitespace-normal gap-5">
          <Image
            src="/edit.svg" // Use /edit.svg
            alt={`Edit ${item.name}`}
            height={21}
            width={21}
          />
          <Image
            src="/dot3.svg" // Use /dot3.svg
            alt={`More options for ${item.name}`}
            height={21}
            width={21}
          />
        </td>
      </tr>
    );
  };

  // Handle loading state
  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div className="flex justify-center items-center h-64 text-red-500">{error}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[800px] md:table mb-4">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.accessor}
                className="py-4 text-sm sm:text-base cursor-pointer"
                onClick={() => requestSort(col.accessor as keyof Recent)}
              >
                <div className="flex items-center">
                  <span>{col.header}</span>
                  {col.icon && <img src={col.icon} alt={`${col.header} icon`} className="w-4 h-4" />}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map(renderRow)}
        </tbody>
      </table>
    </div>
  );
};

export default RecentTables;