"use client";
import React, { useState } from "react";
import Table from "@/components/Table";
import Image from "next/image";
import { userData as rawData } from "@/data"; // Import the raw user data

type ManageAction = {
  src: string;
  alt: string;
};

type User = {
  id: number;
  isChecked: boolean;
  name: string;
  number: string;
  email: string;
  balance: string;
  status: string;
  manage: ManageAction[];
};

const userData: User[] = rawData as User[]; // Typecast rawData to User[]


const userList = () => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const handleRowSelect = (id: number) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(id)
        ? prevSelectedRows.filter((rowId) => rowId !== id)
        : [...prevSelectedRows, id]
    );
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedRows(userData.map((user) => user.id));
    } else {
      setSelectedRows([]);
    }
  };

  const columns = [
    { header: "Select", accessor: "isChecked" },
    { header: "Name", accessor: "name" },
    { header: "Number", accessor: "number" },
    { header: "Email", accessor: "email" },
    { header: "Balance (Ksh)", accessor: "balance" },
    { header: "Status", accessor: "status" },
    { header: "Manage", accessor: "manage" },
  ];
  return (
    <div className="border border-gray-200 p-1 rounded-sm md:p-2">
       {/* Title section */}
       <div className="flex items-center flex-col md:flex-row gap-3 md:justify-between mb-3 md:mb-6">
        <h2 className="text-xl font-semibold font-ibmPlexSansd">Users</h2>
        <div className="flex items-center gap-3">
          <button className="px-4 py-1 flex items-center gap-2 border border-[#FDAC15] rounded-sm">
            <span className="text-[#FDAC15] text-sm">Quick Actions</span>
            <Image src="/yellowdrop.svg" alt="" width={20} height={20} />
          </button>
          <button className="px-3 py-1 flex items-center gap-2 border border-[#FDAC15] rounded-sm">
            <span className="text-[#FDAC15] text-sm">Filter</span>
            <Image src="/filter.svg" alt="" width={15} height={15} />
          </button>
        </div>
        {/* Pagination */}
        <div className="flex gap-3">
          <Image src="/leftarrrow.svg" alt="" width={12} height={12} />
          <span className="text-[#898989] text-base">20-30 of 100</span>
          <Image src="/rightarrow.svg" alt="" width={12} height={12} />
        </div>
      </div>

      <Table
        columns={columns}
        data={userData}
        renderRow={(item: User) => (
          <tr key={item.id} className="border-b  border-gray-200 hover:bg-slate-100">
            <td className="py-2  ">
              <label className="custom-checkbox">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(item.id)}
                  onChange={() => handleRowSelect(item.id)}
                />
                <span className="checkbox"></span>
              </label>
            </td>
            <td className="font-ibmPlexSans whitespace-nowrap sm:whitespace-normal ">{item.name}</td>
            <td className="font-ibmPlexSans whitespace-nowrap sm:whitespace-normal ">{item.number}</td>
            <td className="font-ibmPlexSans whitespace-nowrap sm:whitespace-normal ">{item.email}</td>
            <td className="font-ibmPlexSans whitespace-nowrap sm:whitespace-normal ">{item.balance}</td>
            <td className="font-ibmPlexSans whitespace-nowrap sm:whitespace-normal ">{item.status}</td>
            <td className="font-ibmPlexSans whitespace-nowrap sm:whitespace-normal  flex gap-3 py-2">
              {item.manage.map((action, index) => (
                <button key={index}>
                  <Image src={action.src} alt={action.alt} width={20} height={20} />
                </button>
              ))}
            </td>
          </tr>
        )}
        selectedIds={selectedRows}
        onRowSelect={handleRowSelect}
        onSelectAll={handleSelectAll}
      />
      
    </div>
  )
}

export default userList
