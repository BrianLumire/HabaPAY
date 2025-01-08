"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { listTransactions } from "@/utils/api";
import { TransactionData, TransactionsResponse, TransactionGroup } from "@/types/types";
import Link from "next/link";

const Transaction = () => {
  const [transactions, setTransactions] = useState<TransactionGroup[]>([]); // All transactions
  const [filteredTransactions, setFilteredTransactions] = useState<TransactionData[]>([]); // Filtered transactions based on status
  const [activeFilter, setActiveFilter] = useState<"pending" | "approved" | "declined">("pending"); // Active filter status

  // Fetch transactions from the API
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response: TransactionsResponse = await listTransactions();
        setTransactions(response.data.data); // Set all transactions
        filterTransactions(response.data.data, activeFilter); // Apply initial filter
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  // Filter transactions by status
  const filterTransactions = (transactions: TransactionGroup[], status: "pending" | "approved" | "declined") => {
    const filtered = transactions.flatMap((group: TransactionGroup) =>
      group.transactions.filter((transaction: TransactionData) => transaction.status === status)
    );
    setFilteredTransactions(filtered);
  };

  // Handle filter button clicks
  const handleFilterClick = (status: "pending" | "approved" | "declined") => {
    setActiveFilter(status);
    filterTransactions(transactions, status);
  };

  // Format timestamp to a readable time (e.g., "18.43 PM")
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
  };

  return (
    <div className="border border-gray-200 rounded-sm">
      {/* Header */}
      <div className="flex flex-col pb-2 border-b border-gray-200 mb-2 p-1">
        <h2 className="font-ibmPlexSans text-lg font-semibold mb-1">
          Transactions
        </h2>
        <div className="flex justify-center items-center gap-3">
          <button
            className={`${
              activeFilter === "pending"
                ? "text-white bg-[#FDAC15] border-[#FDAC15]"
                : "text-[#FDAC15] bg-white border-[#FDAC15]"
            } rounded-md font-ibmPlexSans px-2 py-[1px] border`}
            onClick={() => handleFilterClick("pending")}
          >
            Pending
          </button>
          <button
            className={`${
              activeFilter === "approved"
                ? "text-white bg-[#FDAC15] border-[#FDAC15]"
                : "text-[#FDAC15] bg-white border-[#FDAC15]"
            } rounded-md font-ibmPlexSans px-2 py-[1px] border`}
            onClick={() => handleFilterClick("approved")}
          >
            Approved
          </button>
          <button
            className={`${
              activeFilter === "declined"
                ? "text-white bg-[#FDAC15] border-[#FDAC15]"
                : "text-[#FDAC15] bg-white border-[#FDAC15]"
            } rounded-md font-ibmPlexSans px-2 py-[1px] border`}
            onClick={() => handleFilterClick("declined")}
          >
            Declined
          </button>
        </div>
      </div>

      {/* Transactions List */}
      <div className="p-1">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction: TransactionData, index: number) => (
            <Link
              key={index}
              href={`/transactions/${transaction.transaction_id}`} // Redirect to the details page
              className="flex items-center justify-between p-1 md:pr-4 mb-3"
            >
              <div className="flex items-center gap-3">
                <div className="p-1 border border-[#fff1d7] rounded-full bg-[#FFF7E8]">
                  <Image
                    src={transaction.type === "sent" ? "/send.svg" : "/hand.svg"}
                    alt={transaction.full_name}
                    width={22}
                    height={22}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-ibmPlexSans text-base font-semibold">
                    {transaction.full_name}
                  </p>
                  <span className="text-sm font-ibmPlexSans">
                    {transaction.phone}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <p className="font-ibmPlexSans text-base font-semibold">
                  {transaction.currency} {transaction.amount}
                </p>
                <span className="text-[13px] font-ibmPlexSans text-right">
                  {formatTime(transaction.timestamp)}
                </span>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500 font-ibmPlexSans">
            No {activeFilter} transactions found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Transaction;