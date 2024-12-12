// components/Layout.tsx
"use client";
import { useState } from "react";

import AppSidebar from "@/components/app-sidebar"
import Navbar from "@/components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Toggle functions
  const toggleMobileSidebar = () => setIsMobileSidebarOpen(!isMobileSidebarOpen);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <div className="flex h-screen  ">
      {/* Sidebar */}
      <AppSidebar
        isMobileSidebarOpen={isMobileSidebarOpen}
        toggleMobileSidebar={toggleMobileSidebar}
        isCollapsed={isCollapsed}
      />

      {/* Main Content */}
      <div className="flex-1 mx-3">
        {/* Navbar */}
        <Navbar
          toggleMobileSidebar={toggleMobileSidebar}
          toggleCollapse={toggleCollapse}
          isCollapsed={isCollapsed}
        />

        {/* Page Content */}
        <div className="md:mx-6 md:mt-5 m-3">{children}</div>
      </div>
    </div>
  );
}
