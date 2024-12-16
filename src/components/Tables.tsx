"use client";
import React, { useState, useRef, useEffect } from "react";

type TableProps = {
  columns: { header: string; accessor: string }[];
  data: any[];
  renderRow: (item: any) => React.ReactNode;
  onRowSelect?: (id: any) => void; // Optional handler for row selection
  onSelectAll?: (selected: boolean) => void; // Optional handler for "select all"
  selectedIds?: any[]; // Selected row ids, if applicable
};

const Tables = ({
  columns,
  data,
  renderRow,
  onRowSelect,
  onSelectAll,
  selectedIds = [],
}: TableProps) => {
  const selectAllRef = useRef<HTMLInputElement>(null);

  const isAllSelected = selectedIds.length === data.length;
  const isIndeterminate = selectedIds.length > 0 && selectedIds.length < data.length;

  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = isIndeterminate;
    }
  }, [isIndeterminate]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSelectAll) {
      onSelectAll(e.target.checked);
    }
  };

  return (
    <div className="overflow-x-auto ">
      <table className=" w-full  min-w-[800px] md:table mb-4">
        <thead className="font-ibmPlexSans text-left">
          <tr>
            {columns.map((col) => (
              <th key={col.accessor} className=" border-b pb-2 border-gray-200">
                {col.accessor === "isChecked" ? (
                  <input
                    ref={selectAllRef}
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={isAllSelected}
                  />
                ) : (
                  col.header
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => renderRow(item))}
        </tbody>
      </table>
    </div>
  );
};

export default Tables;
