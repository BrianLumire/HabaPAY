"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { ModeToggle } from "@/components/mode-toggle";
import { useTheme } from "next-themes"; // Import useTheme

interface NavbarProps {
  toggleMobileSidebar: () => void;
  toggleCollapse: () => void;
  isCollapsed: boolean;
}

export default function Navbars({
  toggleMobileSidebar,
  toggleCollapse,
  isCollapsed,
}: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { theme } = useTheme(); // Access the current theme

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const pages = [
    { name: "Home", path: "/home" },
    { name: "Analytics", path: "/analytics" },
    { name: "Manage Users", path: "/manage-users" },
    { name: "Settings", path: "/settings" },
  ];

  // Map pathname to page name
  const currentPage = pages.find((page) => page.path === pathname)?.name || "";

  const filteredPages = pages.filter((page) =>
    page.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchClick = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSearchQuery(""); // Reset search query
  };

  const handlePageSelect = (path: string) => {
    router.push(path); // Navigate to the selected page
    handleCloseDialog();
  };

  return (
    <div
      className={`md:pt-7 pt-3 md:mb-3 flex items-center sticky top-0 z-20 pb-3 shadow-md ${
        theme === "dark" ? "bg-gray-800" : "bg-white" // Dynamically set the background color based on the theme
      }`}
    >
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileSidebar}
        className="text-white md:hidden focus:outline-none"
      >
        <Image src="/hammenu.png" alt="User Image" width={28} height={28} />
      </button>

      {/* Collapse/Expand Button for large screens */}
      <button
        onClick={toggleCollapse}
        className="hidden md:block text-white focus:outline-none"
      >
        <Image
          src={isCollapsed ? "/show.png" : "/hide.png"}
          alt={isCollapsed ? "Collapse Sidebar" : "Expand Sidebar"}
          width={20} height={20}
        />
      </button>

      <div className="w-full flex items-center justify-between">
        {/* Dynamic Page Title */}
        <h1 className="ml-3 font-ibmPlexSans font-semibold text-xl md:text-2xl">
          {currentPage}
        </h1>

        {/* Search and Icon */}
        <div className="flex gap-2 items-center">
          {/* Search Bar */}
          <div
            className="hidden md:flex items-center gap-2 text-sm rounded-full ring-[1px] ring-[#FDAC15] px-2"
            onClick={handleSearchClick}
          >
            <Image src="/magnifying-glass.png" alt="search" width={17} height={17} />
            <input
              type="text"
              placeholder="Search..."
              className="w-[200px] bg-transparent p-2 outline-none cursor-pointer"
              readOnly
            />
          </div>

          {/* Icon */}
          <div className="flex items-center border border-[#FDAC15] rounded-lg p-2">
            <Image src="/3line.svg" alt="search" width={20} height={20} />
          </div>
        </div>

        <div className="flex items-center gap-3 md:pr-5">
          <div className="">
            <ModeToggle />
          </div>
          <div className="w-[30px] h-[30px] md:w-[37px] md:h-[37px]">
            <Image
              src="/noti.svg"
              alt="notification"
              width={37}
              height={37}
              className="w-full h-full"
            />
          </div>
          <div className="w-[25px] h-[25px] md:w-[33px] md:h-[33px]">
            <Image
              src="/User DP.svg"
              alt="user"
              width={33}
              height={33}
              className="w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Overlay and Dialog */}
      {isDialogOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={handleCloseDialog}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-5 w-[300px]"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search pages..."
              className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-[#FDAC15]"
            />
            <ul className="mt-3">
              {filteredPages.length > 0 ? (
                filteredPages.map((page) => (
                  <li
                    key={page.path}
                    onClick={() => handlePageSelect(page.path)}
                    className="cursor-pointer py-2 px-3 text-black hover:bg-[#f5efe5] hover:text-[#FDAC15] rounded"
                  >
                    {page.name}
                  </li>
                ))
              ) : (
                <li className="text-red-500 py-2 px-3">No results found</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
