"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { resetPassword, updatePassword } from "@/utils/api";
import Image from "next/image";

const LoginPasswordPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Retrieve email from sessionStorage and send reset link on mount
  useEffect(() => {
    const storedData = sessionStorage.getItem("createUserData");
    if (storedData) {
      const { email } = JSON.parse(storedData);
      setEmail(email);

      // Send reset password link to the user's email
      resetPassword(email)
        .then(() => {
          toast.success("A reset password link has been sent to your email.");
        })
        .catch((error) => {
          toast.error(error.message || "Failed to send reset password link.");
        });
    } else {
      toast.error("No form data found. Please start over.");
      router.push("/create");
    }
  }, [router]);

  // Handle token input (extract token from the full link or allow manual entry)
  const handleTokenInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (input.includes("token=")) {
      const url = new URL(input);
      const token = url.searchParams.get("token");
      if (token) {
        setToken(token);
        return;
      }
    }
    setToken(input); // Fallback to raw token input
  };

  const handleUpdatePassword = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match. Please try again.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Update the password
      const response = await updatePassword(email, password, token);
      if (response.success) {
        toast.success("Password updated successfully!");
        router.push("/create/verify-number");
      } else {
        toast.error("Failed to update password. Please try again.");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred while updating password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseClick = () => {
    router.push("/manage-users"); // Redirect to the manage-users page
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
      <div className="flex justify-center items-center h-full">
        <div className="border p-8 rounded-lg shadow-md w-96 text-center">
          <h2 className="text-2xl font-bold mb-6">Set Password</h2>
          <div className="mb-4 text-left">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FDAC15]"
              disabled // Email is auto-filled and should not be editable
            />
          </div>
          <div className="mb-4 text-left">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Token
            </label>
            <input
              type="text"
              placeholder="Paste the full link or enter the token"
              value={token}
              onChange={handleTokenInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FDAC15]"
            />
          </div>
          <div className="mb-4 text-left">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FDAC15]"
            />
          </div>
          <div className="mb-6 text-left">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full mb-14 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FDAC15]"
            />
          </div>
          <button
            onClick={handleUpdatePassword}
            disabled={isSubmitting}
            className="w-full bg-[#FDAC15] text-white py-2 rounded-md hover:bg-[#e99b0d] disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Updating..." : "Update Password"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPasswordPage;