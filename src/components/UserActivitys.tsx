"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { User } from "@/app/(pages)/manage-users/page"; // Correct import path
import { userActivities } from "@/data"; // Ensure this import path is correct
import Link from "next/link";

const UserActivitys = ({ selectedUsers }: { selectedUsers: User[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Load from localStorage if no users are selected
  useEffect(() => {
    const storedSelectedUsers = localStorage.getItem("selectedUsers");
    if (storedSelectedUsers) {
      const parsedUsers = JSON.parse(storedSelectedUsers);
      if (parsedUsers.length > 0) {
        setCurrentIndex(0); // Set to first user if there are any
      }
    }
  }, []);

  useEffect(() => {
    // Persist the selected users to localStorage whenever the selected users change
    if (selectedUsers.length > 0) {
      localStorage.setItem("selectedUsers", JSON.stringify(selectedUsers));
    }
  }, [selectedUsers]);

  if (selectedUsers.length === 0) {
    return (
      <div className="p-2">
        <p className="font-ibmPlexSans font-semibold text-lg mb-5">User Activity</p>
        <div className="flex flex-col justify-center items-center gap-4">
          <Image src="/pic.svg" alt="" width={200} height={200} />
          <h3 className="font-ibmPlexSans font-semibold text-[#898989]">You havent selected any user</h3>
          <div className="flex flex-col">
            <p className="font-ibmPlexSans text-sm text-[#898989]">
              Please select a user from the table above or using search.
            </p>
            <span className="font-ibmPlexSans text-sm md:text-center text-[#898989]">
              to view their activity here.
            </span>
          </div>
        </div>
      </div>
    );
  }

  const currentUser = selectedUsers[currentIndex];
  const userActivityData = userActivities.find(
    (activity) => activity.userId === currentUser.id
  );

  if (!userActivityData) {
    return (
      <div className="p-2">
        <p className="font-ibmPlexSans font-semibold text-lg mb-5">No activity found for this user</p>
      </div>
    );
  }

  const activities = userActivityData.activities;

  return (
    <div className="p-2 border border-gray-200 rounded-sm">
      <div className="flex flex-col md:flex-row items-center gap-2 justify-between mb-5">
        <p className="font-ibmPlexSans font-semibold text-lg">User Activity</p>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 flex items-center gap-2 border border-[#FDAC15] rounded-sm">
            <span className="text-[#FDAC15] text-sm">Duration</span>
            <Image src="/yellowdrop.svg" alt="" width={20} height={20} />
          </button>
          <button className="px-4 py-1 flex items-center gap-2 border border-[#FDAC15] rounded-sm">
            <span className="text-[#FDAC15] text-sm">Transactions</span>
            <Image src="/yellowdrop.svg" alt="" width={20} height={20} />
          </button>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setCurrentIndex(currentIndex - 1)}
            disabled={currentIndex === 0}
          >
            <Image src="/leftarrrow.svg" alt="" width={12} height={12} />
          </button>
          <span className="text-[#898989] text-sm">
            {currentIndex + 1} of {selectedUsers.length}
          </span>
          <button
            onClick={() => setCurrentIndex(currentIndex + 1)}
            disabled={currentIndex === selectedUsers.length - 1}
          >
            <Image src="/rightarrow.svg" alt="" width={12} height={12} />
          </button>
        </div>
      </div>

      {activities.map((activity, index) => (
        <div key={index} className="flex justify-between items-center mb-2">
          <div className="flex flex-col gap-1">
            <div className="flex flex-col md:flex-row items-baseline md:gap-1">
              <Link href={`/manage-users/${currentUser.id}`}>
                <p className="font-ibmPlexSans text-sm md:text-lg font-semibold">{currentUser.name}</p>
              </Link>
              <span className="text-xs md:text-base font-ibmPlexSans">{activity.action}</span>
            </div>
            <p className="font-ibmPlexSans text-sm">{activity.time}</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-gray-400 text-base">Review</p>
            <Image src="/rightarrow.svg" alt="Review" width={10} height={10} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserActivitys;
