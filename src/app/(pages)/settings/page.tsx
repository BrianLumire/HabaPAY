"use client";
import DevicesTables from "@/components/DevicesTables";
import NotificationTables from "@/components/NotificationTables";
import Image from "next/image";
import { useState } from "react";

const SettingsPage = () => {
  // Notification state
  const [notifications, setNotifications] = useState([
    { type: "When user makes a withdrawal request", browser: false, email: false, text: false },
    { type: "When user makes a deposit into the account", browser: false, email: false, text: false },
    { type: "When user makes a transfer", browser: false, email: false, text: false },
    { type: "When a new user creates an account", browser: false, email: false, text: false },
    { type: "When a user updates profile", browser: false, email: false, text: false },
  ]);

  // Track if all checkboxes are selected
  const [allSelected, setAllSelected] = useState(false);

  // Handle select/deselect all notifications
  const handleSelectAll = () => {
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      browser: !allSelected,
      email: !allSelected,
      text: !allSelected,
    }));
    setNotifications(updatedNotifications);
    setAllSelected(!allSelected);
  };

  // Calculate the number of selected checkboxes
  const selectedCount = notifications.reduce((count, notification) => {
    return count + (notification.browser ? 1 : 0) + (notification.email ? 1 : 0) + (notification.text ? 1 : 0);
  }, 0);

  return (
    <div className="border mb-6 border-black mt-4  rounded-sm p-2 pb-5">
      {/*top */}
      <div className="flex flex-col mb-3">
        <div className="flex gap-3 items-center">
          <Image src="/blackarrow.svg" alt="" width={10} height={10} />
          <span className="font-ibmPlexSans font-medium">Back</span>
        </div>
        {/*CONTAINER */}
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="flex items-center p-2 bg-white rounded-full shadow-xl">
            <span className="text-[#FDAC15] font-medium font-ibmPlexSans text-xl">JD</span>
          </div>
          <div className="flex items-center gap-2">
            <p className="font-ibmPlexSans font-medium">James Nakamoto</p>
            <Image src="/shield.svg" alt="" width={15} height={15} />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-2 items-center">
              <Image src="/Union.svg" alt="" width={13} height={13} />
              <p className="text-xs font-ibmPlexSans">HabaPay</p>
            </div>
            <div className="flex gap-2 items-center">
              <Image src="/location.svg" alt="" width={13} height={13} />
              <p className="text-xs font-ibmPlexSans">Nairobi, Kenya</p>
            </div>
            <div className="flex gap-2 items-center">
              <Image src="/date.svg" alt="" width={13} height={13} />
              <p className="text-xs font-ibmPlexSans">12 Jan 2023</p>
            </div>
          </div>
          <div className="flex gap-9">
            <button className="text-[#FDAC15] text-sm border rounded-md px-2 py-[1px] border-[#FDAC15]">Profile</button>
            <button className="text-[#FDAC15] text-sm border rounded-md px-2 py-[1px] border-[#FDAC15]">Notifications</button>
            <button className="text-[#FDAC15] text-sm border rounded-md px-2 py-[1px] border-[#FDAC15]">General</button>
          </div>
        </div>
      </div>
{/*middle table */}
<div className="mb-3 border border-gray-300 rounded-sm">
        <div className="flex items-center justify-between mb-3 p-1">
          <p className="font-ibmPlexSans font-medium md:text-lg text-base">Notification</p>
          <div className="flex gap-2 items-center">
            {selectedCount > 0 && (
              <p className="font-ibmPlexSans font-medium text-sm">
                Notifications selected: {selectedCount} of 15
              </p>
            )}
            <button
              className="md:text-sm text-xs font-ibmPlexSans border border-black py-[2px] px-[4px] rounded-sm"
              onClick={handleSelectAll}
            >
              {allSelected ? "Deselect All" : "Allow browser notifications"}
            </button>
          </div>
        </div>
        <NotificationTables notifications={notifications} setNotifications={setNotifications} />
      </div>

      {/*bottom table*/}
      <div className="border border-gray-300 rounded-sm">
        <div className="flex items-center justify-between mb-3 p-1">
          <p className="font-ibmPlexSans font-medium md:text-lg text-base">Manage Devices</p>
          <button className="md:text-sm text-xs font-ibmPlexSans border border-black py-[2px] px-[4px] rounded-sm">Logout of selected devices</button>
        </div>
        <DevicesTables />
      </div>
    </div>
  );
};

export default SettingsPage;
