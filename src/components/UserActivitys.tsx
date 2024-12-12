"use client";
import React, { useState } from "react";
import Image from "next/image";
import { User } from "@/app/(pages)/manage-users/page"; // Correct import path
import { userActivities } from "@/data"; // Ensure this import path is correct

// The main UserActivitys component
const UserActivitys = ({ selectedUsers }: { selectedUsers: User[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle the case where no user is selected
  if (selectedUsers.length === 0) {
    return (
      <div className="p-2">
        <p className="font-ibmPlexSans font-semibold text-lg mb-5">User Activity</p>
        <div className="flex flex-col justify-center items-center gap-4">
          <Image src="/pic.svg" alt="" width={200} height={200} />
          <h3 className="font-ibmPlexSans font-semibold text-[#898989]">You havent selected any user</h3>
          <div className="flex flex-col">
            <p className="font-ibmPlexSans text-sm text-[#898989]">
              Please select a user from the table above or using search
            </p>
            <span className="font-ibmPlexSans text-sm text-center text-[#898989]">
              to view their activity here
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Get current selected user based on the index
  const currentUser = selectedUsers[currentIndex];

  // Find the activities of the current user based on the userId
  const userActivityData = userActivities.find(
    (activity) => activity.userId === currentUser.id
  );

  // If no activities are found for the user, return a message
  if (!userActivityData) {
    return (
      <div className="p-2">
        <p className="font-ibmPlexSans font-semibold text-lg mb-5">No activity found for this user</p>
      </div>
    );
  }

  // Extract activities for the selected user
  const activities = userActivityData.activities;

  return (
    <div className="p-2 border border-gray-200 rounded-sm">
      {/* Title and Pagination */}
      <div className="flex items-center justify-between mb-5">
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
          {/* Left arrow button to move to previous user */}
          <button
            onClick={() => setCurrentIndex(currentIndex - 1)}
            disabled={currentIndex === 0}
          >
            <Image src="/leftarrrow.svg" alt="" width={12} height={12} />
          </button>
          <span className="text-[#898989] text-sm">
            {currentIndex + 1} of {selectedUsers.length}
          </span>
          {/* Right arrow button to move to next user */}
          <button
            onClick={() => setCurrentIndex(currentIndex + 1)}
            disabled={currentIndex === selectedUsers.length - 1}
          >
            <Image src="/rightarrow.svg" alt="" width={12} height={12} />
          </button>
        </div>
      </div>

      {/* Display the user's activities */}
      {activities.map((activity, index) => (
        <div key={index} className="flex justify-between items-center mb-2">
          <div className="flex flex-col gap-1">
            <div className="flex flex-col md:flex-row items-baseline md:gap-1">
              {/* Display user name (assuming `name` is available in `currentUser`) */}
              <p className="font-ibmPlexSans text-sm md:text-lg font-semibold">{currentUser.name}</p>
              {/* Display the activity description */}
              <span className="text-xs md:text-base font-ibmPlexSans">{activity.action}</span>
            </div>
            {/* Display the time of the activity */}
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
