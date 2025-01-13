"use client";

import { useEffect, useState } from "react";
import { listTransactions } from "@/utils/api"; // Use listTransactions instead of fetchTransactionById
import Link from "next/link";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";

const TransactionDetailsPage = () => {
  const { id } = useParams(); // Get transaction_id from URL
  const router = useRouter(); // Initialize router
  const [transaction, setTransaction] = useState<any>(null); // Use `any` temporarily for debugging
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Handle close button click
  const handleCloseClick = () => {
    router.push("/home");
  };

  // Helper function to format timestamp
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    // Format time (e.g., 10:54 AM)
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const time = `${formattedHours}:${formattedMinutes} ${ampm}`;

    // Format date (e.g., 19th December 2024)
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    const ordinalSuffix = getOrdinalSuffix(day); // Helper function to get ordinal suffix (e.g., 1st, 2nd, 3rd, 4th)
    const formattedDate = `${day}${ordinalSuffix} ${month} ${year}`;

    return `${time} ${formattedDate}`;
  };

  // Helper function to get ordinal suffix (e.g., 1st, 2nd, 3rd, 4th)
  const getOrdinalSuffix = (day: number) => {
    if (day > 3 && day < 21) return "th"; // Special case for 11th, 12th, 13th, etc.
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  // Fetch all transactions and find the specific transaction by ID
  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await listTransactions();
        console.log("API Response:", response); // Debugging: Log the API response

        if (response.success) {
          // Find the transaction with the matching transaction_id
          const foundTransaction = response.data.data
            .flatMap((group: any) => group.transactions)
            .find((t: any) => t.transaction_id === Number(id));

          if (foundTransaction) {
            setTransaction(foundTransaction); // Set the transaction data
          } else {
            setError("Transaction not found.");
          }
        } else {
          setError("Failed to fetch transactions.");
        }
      } catch (error) {
        console.error("Failed to fetch transaction details:", error);
        setError("An error occurred while fetching transaction details.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!transaction) {
    return <p>No transaction data found.</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-6 border border-gray-200 rounded-lg shadow-lg">
        {/* Close Button */}
        <div className="flex justify-end pr-2 mb-6">
          <div
            className="p-2 rounded-full bg-[#FFF7E8] shadow-md cursor-pointer"
            onClick={handleCloseClick}
            aria-label="Close"
          >
            <Image src="/closex.svg" alt="Close" width={20} height={20} />
          </div>
        </div>

        {/* Transaction Details */}
        <h1 className="text-2xl font-bold mb-3 text-center">Transaction Details</h1>
        <p className="font-ibmPlexSans text-2xl font-bold mb-5 text-center text-[#FDAC15]">
          {transaction.type}
        </p>
        <div className="space-y-4">
          <div>
            <label className="block text-lg font-semibold">Requested by</label>
            <p className="mt-1 rounded-md text-lg font-ibmPlexSans font-normal">
              {transaction.full_name}
            </p>
          </div>
          <div>
            <label className="block text-lg font-semibold">Amount</label>
            <p className="mt-1 rounded-md text-lg font-ibmPlexSans font-normal">
              {transaction.currency} {transaction.amount}
            </p>
          </div>
          <div>
            <label className="block text-lg font-semibold">Number</label>
            <p className="mt-1 rounded-md text-lg font-ibmPlexSans font-normal">
              {transaction.phone}
            </p>
          </div>
          <div>
            <label className="block text-lg font-semibold">Status</label>
            <p className="mt-1 rounded-md text-lg font-ibmPlexSans font-normal">
              {transaction.status}
            </p>
          </div>
          <div>
            <label className="block text-lg font-semibold">Timestamp</label>
            <p className="mt-1 rounded-md text-lg font-ibmPlexSans font-normal">
              {formatTimestamp(transaction.timestamp)}
            </p>
          </div>
        </div>

        {/* Approve Button for Pending Transactions */}
        {transaction.status === "pending" && (
          <div className="mt-12 text-center">
            <Link
              href={`/transactions/${id}/approve`}
              className="inline-block bg-[#FDAC15] text-white text-lg px-10 py-2 rounded-md hover:bg-[#e89b0f] transition-colors"
            >
              Approve
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionDetailsPage;