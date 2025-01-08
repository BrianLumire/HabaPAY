"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { updateLoginPin } from "@/utils/api";
import Image from "next/image";

const LoginPinPage = () => {
  const router = useRouter();
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreatePin = async () => {
    if (pin !== confirmPin) {
      toast.error("Pins do not match. Please try again.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Retrieve email from sessionStorage
      const storedData = sessionStorage.getItem("createUserData");
      if (!storedData) {
        toast.error("No form data found. Please start over.");
        router.push("/create");
        return;
      }

      const { email } = JSON.parse(storedData);

      // Update the login PIN
      const response = await updateLoginPin(email, pin);
      if (response.success) {
        toast.success("User created successfully!");
        router.push("/manage-users"); // Redirect to manage-users
      } else {
        toast.error("Failed to create login PIN. Please try again.");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred while creating login PIN.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseClick = () => {
    router.push("/manage-users"); // Redirect to the manage-users page
  };

  return (
    <div className="p-4 h-screen flex flex-col justify-center items-center">
      {/* Close Button */}
      <div className="flex justify-end pr-2 mb-6 w-full max-w-md">
        <div
          className="p-2 rounded-full bg-[#FFF7E8] shadow-md cursor-pointer"
          onClick={handleCloseClick}
          aria-label="Close"
        >
          <Image src="/closex.svg" alt="Close" width={20} height={20} />
        </div>
      </div>

      {/* Content */}
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-2 text-center">Create Login Pin</h1>
        <p className="text-gray-800 mb-6 text-center">
          Create a login pin to access the app.
        </p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Enter Pin</label>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-[#FDAC15] focus:border-[#FDAC15]"
              placeholder="Enter login PIN"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Confirm Pin</label>
            <input
              type="password"
              value={confirmPin}
              onChange={(e) => setConfirmPin(e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-[#FDAC15] focus:border-[#FDAC15]"
              placeholder="Confirm login PIN"
            />
          </div>
          <button
            onClick={handleCreatePin}
            disabled={isSubmitting}
            className="mt-6 w-full px-6 py-2 bg-[#FDAC15] text-white rounded-md hover:bg-[#e69900] disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Finishing..." : "Finish"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPinPage;