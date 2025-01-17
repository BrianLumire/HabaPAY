"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes"; // Import the useTheme hook
import Image from "next/image";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isMobileSidebarOpen: boolean;
  toggleMobileSidebar: () => void;
  isCollapsed: boolean;
}

export default function Sidebar({
  isMobileSidebarOpen,
  toggleMobileSidebar,
  isCollapsed,
}: SidebarProps) {
  const [showBalance, setShowBalance] = useState(false); // Initially set to false to hide balance
  const [showLogoutModal, setShowLogoutModal] = useState(false); // State to toggle logout modal
  const pathname = usePathname(); // Get current path using usePathname
  const { theme } = useTheme(); // Get the current theme (light or dark)

  // Function to toggle balance visibility
  const toggleBalanceVisibility = () => {
    setShowBalance(!showBalance);
  };

  // Close sidebar on mobile when a link is clicked
  const handleLinkClick = () => {
    if (isMobileSidebarOpen) {
      toggleMobileSidebar();
    }
  };

  const getIconForPage = (page: string) => {
    // If the page is the active one, return the active icon
    if (pathname === page) {
      switch (page) {
        case "/home":
          return "/home.svg"; // Active icon for Home
        case "/analytics":
          return "/analytics.svg"; // Active icon for Analytics
        case "/manage-users":
          return "/manage1.svg"; // Active icon for Manage Users
        case "/settings":
          return "/settings.svg"; // Active icon for Settings
        case "/":
          return "/logout.svg"; // Active icon for logout
        default:
          return "/default-active.svg"; // Fallback active icon
      }
    }

    // If the page is not active, return the default icon
    switch (page) {
      case "/home":
        return "/home1.svg"; // Default icon for Home
      case "/analytics":
        return "/analytics.svg"; // Default icon for Analytics
      case "/manage-users":
        return "/manage.svg"; // Default icon for Manage Users
      case "/settings":
        return "/settings.svg"; // Default icon for Settings
      case "/":
        return "/logout.svg"; // Default icon for logout
      default:
        return "/default.svg"; // Fallback default icon
    }
  };

  // Handle Log out click, open modal
  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  // Handle Confirm Log out
  const handleConfirmLogout = () => {
    // Clear tokens from localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  
    // Clear the accessToken cookie
    document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
  
    // Redirect to the login page
    window.location.href = "/login"; // Use window.location.href to force a full page reload
  };

  // Handle Cancel Log out
  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  // Close modal on `Esc` key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showLogoutModal) {
        setShowLogoutModal(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showLogoutModal]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`transition-all duration-300 ${
          isCollapsed ? "w-16" : "w-64"
        } fixed md:relative h-full md:block z-40 border border-gray-200 pb-6 ${
          isMobileSidebarOpen ? "block" : "hidden"
        } ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
        }`} // Apply dark or light background based on theme
      >
        {/* Sidebar Header */}
        <div className="flex justify-end p-2">
          <button
            onClick={toggleMobileSidebar}
            className="text-black md:hidden focus:outline-none"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex items-center justify-center py-3 md:py-4">
          <span
            className={`${isCollapsed ? "hidden" : "block"} font-bold text-2xl text-[#FDAC15]`}
          >
            HabaPay
          </span>
        </div>

        {/* User Info */}
        {!isCollapsed && (
          <div className="mb-7 flex flex-col gap-2 items-center justify-center">
            <Image src="/User DP.svg" alt="User Image" width={90} height={90} />
            <p className="font-ibmPlexSans text-sm text-gray-600">Welcome back,</p>
            <span className="font-ibmPlexSans font-medium text-base">James Nakamoto</span>
          </div>
        )}

        {/* Current Balance */}
        {!isCollapsed && (
          <div className="shadow-xl border border-gray-100 mx-4 p-2 mb-6 md:mb-9">
            <div className="flex mb-3 justify-between items-center">
              <p className="font-ibmPlexSans text-base">Current Balance</p>
              <button onClick={toggleBalanceVisibility} className="focus:outline-none">
                {showBalance ? (
                  <Image src="/see.png" alt="Show Balance" width={20} height={20} />
                ) : (
                  <Image src="/invisible.png" alt="Hide Balance" width={20} height={20} />
                )}
              </button>
            </div>
            <div className="flex items-center justify-center">
              <span className="font-ibmPlexSans font-medium text-2xl">
                {showBalance ? "Ksh 346,723" : "************"}
              </span>
            </div>
          </div>
        )}

        {/* Sidebar Content */}
        <nav className="flex flex-col gap-16 md:gap-24">
          <div className="flex flex-col space-y-2 p-4">
            <Link href="/home" onClick={handleLinkClick}>
              <div
                className={`flex items-center space-x-2 p-2 rounded hover:bg-[#FFFBF4] hover:text-[#FDAC15] ${
                  pathname === "/home" ? "text-[#FDAC15] bg-[#FFFBF4]" : ""
                }`}
              >
                <Image src={getIconForPage("/home")} alt="Home" width={25} height={25} />
                {!isCollapsed && <span className="text-base font-ibmPlexSans font-medium">Home</span>}
              </div>
            </Link>
            <Link href="/analytics" onClick={handleLinkClick}>
              <div
                className={`flex items-center space-x-2 p-2 rounded hover:bg-[#FFFBF4] hover:text-[#FDAC15] ${
                  pathname === "/analytics" ? "text-[#FDAC15] bg-[#FFFBF4]" : ""
                }`}
              >
                <Image src={getIconForPage("/analytics")} alt="Analytics" width={25} height={25} />
                {!isCollapsed && <span className="text-base font-ibmPlexSans font-medium">Analytics</span>}
              </div>
            </Link>
            <Link href="/manage-users" onClick={handleLinkClick}>
              <div
                className={`flex items-center space-x-2 p-2 rounded hover:bg-[#FFFBF4] hover:text-[#FDAC15] ${
                  pathname === "/manage-users" ? "text-[#FDAC15] bg-[#FFFBF4]" : ""
                }`}
              >
                <Image src={getIconForPage("/manage-users")} alt="Manage Users" width={25} height={25} />
                {!isCollapsed && (
                  <span className="text-base font-ibmPlexSans font-medium">Manage Users</span>
                )}
              </div>
            </Link>
          </div>

          <div className="flex flex-col space-y-2 p-4">
            <Link href="/settings" onClick={handleLinkClick}>
              <div
                className={`flex items-center space-x-2 p-2 rounded hover:bg-[#FFFBF4] hover:text-[#FDAC15] ${
                  pathname === "/settings" ? "text-[#FDAC15] bg-[#FFFBF4]" : ""
                }`}
              >
                <Image src={getIconForPage("/settings")} alt="Settings" width={25} height={25} />
                {!isCollapsed && <span className="text-base font-ibmPlexSans font-medium">Settings</span>}
              </div>
            </Link>
            <button onClick={handleLogoutClick}>
              <div
                className={`flex items-center space-x-2 p-2 rounded hover:bg-[#FFFBF4] hover:text-[#FDAC15] ${
                  pathname === "/" ? "text-[#FDAC15] bg-[#FFFBF4]" : ""
                }`}
              >
                <Image src={getIconForPage("/")} alt="Logout" width={25} height={25} />
                {!isCollapsed && <span className="text-base font-ibmPlexSans font-medium">Log out</span>}
              </div>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleMobileSidebar}
        />
      )}

      {/* Logout Modal */}
      {showLogoutModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
          onClick={handleCancelLogout}
        >
          <div
            className="bg-white p-5 rounded-md shadow-lg w-[80%] md:w-1/4 lg:1/5"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg text-center font-ibmPlexSans font-semibold text-black">
              Are you sure you want to log out?
            </h2>
            <div className="mt-9 flex gap-5 items-center justify-center">
              <button
                onClick={handleCancelLogout}
                className="px-4 py-2 font-ibmPlexSans text-base bg-blue-950 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLogout}
                className="px-4 font-ibmPlexSans text-base py-2 bg-[#FDAC15] text-white rounded"
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
