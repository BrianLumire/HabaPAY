"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { updatePassword } from "@/utils/api"; // Import the updatePassword function
import Image from "next/image";
import { toast } from "react-toastify"; // Import toast for notifications

const UpdatePasswordPage = () => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  // Auto-fill email from sessionStorage
  useEffect(() => {
    const storedEmail = sessionStorage.getItem("resetPasswordEmail");
    if (storedEmail) {
      setEmail(storedEmail);
      sessionStorage.removeItem("resetPasswordEmail"); // Clear the stored email
    }
  }, []);

  const handleUpdatePassword = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const response = await updatePassword(email, password, token);
      setMessage(response.message);
      toast.success("Password updated successfully!");
      router.push("/login"); // Redirect to Login Page after successful update
    } catch (error: any) {
      setMessage(error.message);
      toast.error(error.message || "Failed to update password.");
    }
  };

  const handleCloseClick = () => {
    router.push("/login"); // Redirect to the login page
  };

  // Extract token from the full link
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

      <div className="flex justify-center items-center h-screen">
        <div className="border p-8 rounded-lg shadow-md w-96 text-center">
          <h2 className="text-2xl font-bold mb-6">Update Password</h2>
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
            className="w-full bg-[#FDAC15] text-white py-2 rounded-md hover:bg-[#e99b0d] transition-all"
          >
            Finish
          </button>
          {message && <p className="mt-4 text-sm text-green-600">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default UpdatePasswordPage;