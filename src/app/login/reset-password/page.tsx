"use client"; // Mark this as a Client Component
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/utils/api"; // Import the resetPassword function
import Image from "next/image";
import { toast } from "react-toastify"; // Import toast for notifications

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleResetPassword = async () => {
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    try {
      const response = await resetPassword(email);
      setSuccessMessage(response.message);
      setErrorMessage("");

      // Store email in sessionStorage
      sessionStorage.setItem("resetPasswordEmail", email);

      // Show success toast notification
      toast.success("Password reset link sent successfully. Please check your email.");

      // Redirect to Update Password Page
      router.push("/login/update-password");
    } catch (error: any) {
      setErrorMessage(error.message);
      setSuccessMessage("");

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
          role="button"
          tabIndex={0}
          className="p-2 rounded-full bg-[#FFF7E8] shadow-md cursor-pointer"
          onClick={handleCloseClick}
          onKeyDown={(e) => e.key === "Enter" && handleCloseClick()}
          aria-label="Close reset password page"
        >
          <Image src="/closex.svg" alt="Close" width={20} height={20} />
        </div>
      </div>

      <div className="flex justify-center items-center h-full">
        <div className="border p-8 rounded-lg shadow-md w-96 text-center">
          <h2 className="text-2xl font-bold mb-6">Reset Password</h2>
          <div className="mb-6 text-left">
            <label htmlFor="email" className="block text-sm font-medium  mb-5">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-32 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FDAC15]"
            />
          </div>
          <button
            onClick={handleResetPassword}
            disabled={!email}
            className="w-full bg-[#FDAC15] text-white py-2 rounded-md hover:bg-[#e99b0d] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send Link
          </button>
          {successMessage && <p className="mt-4 text-green-600 text-sm">{successMessage}</p>}
          {errorMessage && <p className="mt-4 text-red-600 text-sm">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;