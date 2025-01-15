"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { sendPinByEmail, verifyPin } from "@/utils/api";
import Image from "next/image";

const VerifyEmailPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Retrieve email from sessionStorage
  useEffect(() => {
    const storedData = sessionStorage.getItem("createUserData");
    if (storedData) {
      const { email } = JSON.parse(storedData);
      setEmail(email);

      // Send PIN to email on page load
      sendPinByEmail(email)
        .then(() => {
          toast.success("A verification PIN has been sent to your email.");
        })
        .catch((error) => {
          toast.error(error.message || "Failed to send verification PIN.");
        });
    } else {
      toast.error("No form data found. Please start over.");
      router.push("/create");
    }
  }, [router]);

  const handleCloseClick = () => {
    router.push("/manage-users"); // Redirect to the manage-users page
  };

  const handleVerifyPin = async () => {
    if (pin.length !== 6) {
      toast.error("Please enter a valid 6-digit PIN.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await verifyPin(email, parseInt(pin, 10));
      if (response.success) {
        toast.success("Email verified successfully!");
        router.push("/create/login-password");
      } else {
        toast.error("Failed to verify PIN. Please try again.");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred while verifying PIN.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-3 h-screen">
      {/* Close Button */}
      <div className="flex justify-end pr-2 w-full">
        <div
          className="p-2 rounded-full bg-[#FFF7E8] shadow-md cursor-pointer"
          onClick={handleCloseClick}
          aria-label="Close"
        >
          <Image src="/closex.svg" alt="Close" width={20} height={20} />
        </div>
      </div>

      {/* Content */}
      <div className="h-full flex flex-col justify-center items-center">
        <div className="w-full border border-gray-200 rounded-md py-16 px-3 max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-center">Verify Email</h1>
          <p className="text-gray-800 mb-6 text-center">
            A verification PIN has been sent to your email. Please enter it below.
          </p>
          <div>
            <label className="block text-sm font-semibold mb-1">PIN</label>
            <input
              type="text"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-[#FDAC15] focus:border-[#FDAC15]"
              placeholder="Enter 6-digit PIN"
              maxLength={6}
            />
          </div>
          <button
            onClick={handleVerifyPin}
            disabled={isSubmitting}
            className="mt-36 w-full px-6 py-2 bg-[#FDAC15] text-white rounded-md hover:bg-[#e69900] disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Verifying..." : "Verify"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;