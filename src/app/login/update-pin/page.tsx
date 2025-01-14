"use client"; 

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { updateLoginPin } from "@/utils/api"; 
import Image from "next/image";
import { toast } from "react-toastify"; 

const UpdatePinPage = () => {
  const [email, setEmail] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handleUpdatePin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setMessage("");

    // Validate PINs
    if (newPin !== confirmPin) {
      toast.error("PINs do not match. Please try again.");
      setIsProcessing(false);
      return;
    }

    try {
      const response = await updateLoginPin(email, newPin);
      setMessage(response.message);

      // Show success toast notification
      toast.success("PIN updated successfully.");

      // Redirect to the login page
      router.push("/login");
    } catch (error: any) {
      setMessage(error.message);

      // Show error toast notification
      toast.error(error.message || "Failed to update PIN.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCloseClick = () => {
    router.push("/login"); // Redirect to the login page
  };

  return (
    <div className="h-screen p-3">
      {/* Close Button */}
      <div className="flex justify-end pr-2 w-full">
        <div
          role="button"
          tabIndex={0}
          className="p-2 rounded-full bg-[#FFF7E8] shadow-md cursor-pointer"
          onClick={handleCloseClick}
          onKeyDown={(e) => e.key === "Enter" && handleCloseClick()}
          aria-label="Close update PIN page"
        >
          <Image src="/closex.svg" alt="Close" width={20} height={20} />
        </div>
      </div>

      <div className="flex justify-center items-center h-screen">
        <div className="border p-8 rounded-lg shadow-md w-96 text-center">
          <h2 className="text-2xl font-bold mb-6">Update Login PIN</h2>
          <form onSubmit={handleUpdatePin}>
            {/* Email Input */}
            <div className="mb-4 text-left">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FDAC15]"
                required
              />
            </div>

            {/* New PIN Input */}
            <div className="mb-4 text-left">
              <label htmlFor="newPin" className="block text-sm font-medium text-gray-700 mb-2">
                New PIN
              </label>
              <input
                type="password"
                id="newPin"
                placeholder="Enter your new PIN"
                value={newPin}
                onChange={(e) => setNewPin(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FDAC15]"
                required
              />
            </div>

            {/* Confirm PIN Input */}
            <div className="mb-6 text-left">
              <label htmlFor="confirmPin" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm PIN
              </label>
              <input
                type="password"
                id="confirmPin"
                placeholder="Confirm your new PIN"
                value={confirmPin}
                onChange={(e) => setConfirmPin(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FDAC15]"
                required
              />
            </div>

            {/* Change PIN Button */}
            <button
              type="submit"
              className="w-full bg-[#FDAC15] text-white py-2 rounded-md hover:bg-[#e99b0d] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Change PIN"}
            </button>
          </form>

          {/* Message Display */}
          {message && <p className="mt-4 text-green-600 text-sm">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default UpdatePinPage;