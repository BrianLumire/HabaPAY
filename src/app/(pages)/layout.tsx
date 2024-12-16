// components/Layout.tsx
"use client";
import { useState } from "react";

import AppSidebar from "@/components/app-sidebar"
import Navbars from "@/components/Navbars";

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
      <div className="w-full mx-3">
        {/* Navbar */}
        <Navbars
          toggleMobileSidebar={toggleMobileSidebar}
          toggleCollapse={toggleCollapse}
          isCollapsed={isCollapsed}
        />{/* Page Content */}{children}
      </div>

    </div>
  );
}
