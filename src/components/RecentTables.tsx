"use client";

import { recent } from "@/data";
import Image from "next/image";
import { useState } from "react";

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
    key: keyof Recent; // Ensures key is a valid property of Recent
    direction: "asc" | "desc"; // Direction can only be "asc" or "desc"
  }>({
    key: "balance",  // Default sort by 'balance'
    direction: "asc",
  });

  const requestSort = (key: keyof Recent) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...recent].sort((a, b) => {
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
        <td scope="row" className="font-ibmPlexSans py-[2px] pl-2  text-sm sm:text-base whitespace-nowrap sm:whitespace-normal">
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
        <td className="flex items-center whitespace-nowrap sm:whitespace-normal gap-5">
          <Image
            src={item.manage1 || "/default-icon.svg"}
            alt={`${item.name}'s action 1`}
            height={17}
            width={17}
          />
          <Image
            src={item.manage2 || "/default-icon.svg"}
            alt={`${item.name}'s action 2`}
            height={17}
            width={17}
          />
        </td>
      </tr>
    );
  };

  return (
    <>
    <div className="overflow-x-auto ">
    <table className=" w-full  min-w-[800px] md:table mb-4">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.accessor}
                className="py-4 text-sm sm:text-base cursor-pointer"
                onClick={() => requestSort(col.accessor as keyof Recent)} // Cast the accessor to keyof Recent
              >
                <div className="flex  items-center ">
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
   
    </>
  );
};

export default RecentTables;
