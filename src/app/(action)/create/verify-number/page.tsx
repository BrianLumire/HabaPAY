"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { sendOtp, verifyOtp } from "@/utils/api";
import Image from "next/image";

const VerifyNumberPage = () => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const otpSent = useRef(false); // Flag to track if OTP has been sent

  // Retrieve the phone number from session storage
  useEffect(() => {
    const storedData = sessionStorage.getItem("createUserData");
    if (storedData) {
      const { primaryNumber, email } = JSON.parse(storedData);
      setPhoneNumber(primaryNumber);

      // Automatically send OTP when the page loads (only once)
      if (!otpSent.current) {
        otpSent.current = true; // Mark OTP as sent
        sendOtp(primaryNumber, email)
          .then(() => {
            toast.success("OTP sent successfully!");
          })
          .catch((error) => {
            toast.error(error.message || "Failed to send OTP.");
          });
      }
    } else {
      toast.error("No form data found. Please start over.");
      router.push("/create");
    }
  }, [router]);

  const handleCloseClick = () => {
    router.push("/manage-users"); // Redirect to the manage-users page
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await verifyOtp(phoneNumber, parseInt(otp, 10));
      if (response.success) {
        toast.success("Phone number verified successfully!");
        router.push("/create/login-pin"); // Redirect to Login PIN Page
      } else {
        toast.error("Failed to verify OTP. Please try again.");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred while verifying OTP.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-3 h-screen ">
        
      {/* Close Button */}
      <div className="flex justify-end  pr-2  w-full">
        <div
          className="p-2 rounded-full bg-[#FFF7E8] shadow-md cursor-pointer"
          onClick={handleCloseClick}
          aria-label="Close"
        >
          <Image src="/closex.svg" alt="Close" width={20} height={20} />
        </div>
      </div>
      <div className="  h-full flex flex-col justify-center items-center">
    

      {/* Content */}
      <div className="w-full  border border-gray-200 rounded-md py-16 px-3  max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Verify Number</h1>
        <p className="text-gray-800 mb-6 text-center">
          An OTP was sent to the primary number you entered.
        </p>
        <div>
          <label className="block text-sm font-semibold mb-1">OTP</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-[#FDAC15] focus:border-[#FDAC15]"
            placeholder="Enter 6-digit OTP"
            maxLength={6}
          />
        </div>
        <button
          onClick={handleVerifyOtp}
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

export default VerifyNumberPage;