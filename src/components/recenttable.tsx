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
  { header: "Balance", accessor: "balance", icon: "/sort.svg" },
  { header: "Transactions", accessor: "transactions", icon: "/sort.svg" },
  { header: "App Launches", accessor: "applaunches", icon: "/sort.svg" },
  { header: "Status", accessor: "status", icon: "/sort.svg" },
  { header: "Manage", accessor: "manage1" },
];

const Recenttable = () => {
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
      <tr key={item.id} className="border-b ml-3 border-gray-300 py-4 hover:bg-slate-100">
        <td scope="row" className="font-ibmPlexSans py-[2px]  text-sm sm:text-base">
          {item.name}
        </td>
        <td className="font-ibmPlexSans text-sm sm:text-base">
          {item.balance}
        </td>
        <td className="font-ibmPlexSans text-sm sm:text-base">
          {item.transactions}
        </td>
        <td className="font-ibmPlexSans text-sm sm:text-base">
          {item.applaunches}
        </td>
        <td className="font-ibmPlexSans text-sm sm:text-base">
          {item.status}
        </td>
        <td className="flex items-center gap-5">
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
      <table className="w-full">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.accessor}
                className="py-4 text-sm sm:text-base cursor-pointer"
                onClick={() => requestSort(col.accessor as keyof Recent)} // Cast the accessor to keyof Recent
              >
                <div className="flex items-center space-x-2">
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
    </>
  );
};

export default Recenttable;
