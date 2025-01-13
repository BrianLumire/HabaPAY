"use client"; // Mark this as a Client Component
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/utils/api"; // Import the resetPassword function
import Image from "next/image";
import { toast } from "react-toastify"; // Import toast for notifications

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleResetPassword = async () => {
    try {
      const response = await resetPassword(email);
      setMessage(response.message);

      // Store email in sessionStorage
      sessionStorage.setItem("resetPasswordEmail", email);

      // Show success toast notification
      toast.success("Password reset link sent successfully. Please check your email.");

      // Redirect to Update Password Page
      router.push("/login/update-password");
    } catch (error: any) {
      setMessage(error.message);

      // Show error toast notification
      toast.error(error.message || "Failed to send reset password link.");
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
          className="p-2 rounded-full bg-[#FFF7E8] shadow-md cursor-pointer"
          onClick={handleCloseClick}
          aria-label="Close"
        >
          <Image src="/closex.svg" alt="Close" width={20} height={20} />
        </div>
      </div>

      <div className="flex justify-center items-center h-screen">
        <div className="border p-8 rounded-lg shadow-md w-96 text-center">
          <h2 className="text-2xl font-bold mb-6">Reset Password</h2>
          <div className="mb-4 text-left">
            <label className="block text-sm font-medium text-gray-700 mb-5">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 mb-32 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FDAC15]"
            />
          </div>
          <button
            onClick={handleResetPassword}
            className="w-full bg-[#FDAC15] text-white py-2 rounded-md hover:bg-[#e99b0d] transition-all"
          >
            Send Link
          </button>
          {message && <p className="mt-4 text-green-600 text-sm">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;