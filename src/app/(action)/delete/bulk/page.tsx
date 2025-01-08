"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { User } from "@/app/(pages)/manage-users/page";
import { listAllUsers, listAllAdminUsers, deleteUserAccount, getWalletBalance } from "@/utils/api"; // Import the API function to fetch users
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

const BulkDeletePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const ids = searchParams.get("ids")?.split(",") || []; // Extract user IDs from query params
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]); // Track selected users
  const [users, setUsers] = useState<User[]>([]); // Store fetched user data
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  useEffect(() => {
    const ids = searchParams.get("ids")?.split(",") || []; // Extract ids inside useEffect
  
    const fetchUserData = async () => {
      try {
        // Fetch both regular users and admin users simultaneously
        const [regularUsersResponse, adminUsersResponse] = await Promise.all([
          listAllUsers(),
          listAllAdminUsers(),
        ]);
    
        // Combine the data from both responses
        const regularUsers = regularUsersResponse.success ? regularUsersResponse.data.data : [];
        const adminUsers = adminUsersResponse.success ? adminUsersResponse.data.data : [];
        const combinedUsers = [...regularUsers, ...adminUsers];
    
        // Filter the selected users based on the IDs from the URL parameters
        const selectedUserData = combinedUsers.filter((user: User) =>
          ids.includes(user.id.toString())
        );
    
        // Fetch wallet balances ONLY for selected users
        const usersWithBalance = await Promise.all(
          selectedUserData.map(async (user: User) => {
            try {
              const balanceResponse = await getWalletBalance(user.phone);
              return { ...user, balance: balanceResponse.balance || 0 };
            } catch (error) {
              console.error(`Error fetching balance for user ${user.id}:`, error);
              // Provide a fallback value for the balance
              return { ...user, balance: "Error fetching balance" };
            }
          })
        );
    
        // Update the users state with the combined and enriched data
        setUsers(usersWithBalance);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Only show this error if the initial fetch (listAllUsers or listAllAdminUsers) fails
        toast.error("Failed to fetch user data. Please try again.");
      }
    };
  
    if (ids.length > 0) {
      fetchUserData();
    }
  }, [searchParams]); // Now the useEffect depends on searchParams only
  
  // Handle checkbox selection
  const handleCheckboxChange = (userId: number) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  // Open confirmation modal
  const handleBulkDeleteClick = () => {
    if (selectedUsers.length > 0) {
      setIsModalOpen(true); // Open modal when users are selected
    }
  };

  // Handle confirmation of deletion
  const handleConfirmDelete = async () => {
    try {
      for (const userId of selectedUsers) {
        await deleteUserAccount(userId); // Call the delete API function
        toast.success(`User deleted successfully!`);
      }
      router.push("/manage-users"); // Redirect to the manage-users page after deletion
    } catch (error) {
      console.error("Error deleting users:", error);
      toast.error("Failed to delete users. Please try again.");
    } finally {
      setIsModalOpen(false); // Close the modal after deletion
    }
  };

  // Handle cancellation of deletion
  const handleCancelDelete = () => {
    setIsModalOpen(false); // Close the modal without making any changes
  };

  return (
    <div className="p-3">
      {/* Close Button */}
      <div className="flex justify-end pr-2 mb-6">
        <div
          className="p-2 rounded-full bg-[#FFF7E8] shadow-md cursor-pointer"
          onClick={() => router.push("/manage-users")}
          aria-label="Close"
        >
          <Image src="/closex.svg" alt="Close" width={20} height={20} />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center">
          <p className="font-ibmPlexSans font-semibold text-xl md:text-2xl md:mb-8 mb-4">
            Confirm Bulk Delete
          </p>
          <p className="font-ibmPlexSans text-gray-500 font-normal text-base md:text-lg md:mb-4 mb-2">
            Select users to activate the delete button
          </p>
        </div>

        {/* Render user details */}
        {users.map((user) => (
          <div
            key={user.id}
            className={`shadow-2xl md:justify-between md:px-36 px-7 md:w-[70%] md:items-center border border-gray-200 flex flex-col md:flex-row transition-all duration-300 mb-8 ${
              selectedUsers.includes(user.id) ? "transform scale-105" : ""
            }`}
          >
            <div className="mb-3 flex cursor-pointer items-center mt-2 justify-center">
              <Image
                src={selectedUsers.includes(user.id) ? "/tick.svg" : "/check-box.png"}
                alt="Checkbox"
                width={32}
                height={32}
                onClick={() => handleCheckboxChange(user.id)}
              />
            </div>

            {/* Personal Details */}
            <div className="flex flex-col gap-2 mb-4">
              <h3 className="mb-3 font-ibmPlexSans font-semibold text-lg">
                Personal Details
              </h3>
              <div className="flex items-center">
                <p className="font-ibmPlexSans font-medium">Name:</p>
                <span className="font-ibmPlexSans">{user.username}</span>
              </div>
              <div className="flex items-center">
                <p className="font-ibmPlexSans font-medium">Email:</p>
                <span className="font-ibmPlexSans">{user.email}</span>
              </div>
              <div className="flex items-center">
                <p className="font-ibmPlexSans font-medium">Number:</p>
                <span className="font-ibmPlexSans">{user.phone}</span>
              </div>
              <div className="flex items-center">
                <p className="font-ibmPlexSans font-medium">Location:</p>
                <span className="font-ibmPlexSans">{user.location || "N/A"}</span>
              </div>
            </div>

            {/* Account Details */}
            <div className="flex flex-col gap-2 mb-3">
              <h3 className="mb-3 font-ibmPlexSans font-semibold text-lg">
                Account Details
              </h3>
              <div className="flex items-center">
                <p className="font-ibmPlexSans font-medium">Status:</p>
                <span className="font-ibmPlexSans">
                  {user.is_active === 1 ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="flex items-center">
                <p className="font-ibmPlexSans font-medium">Balance:</p>
                <span className="font-ibmPlexSans">
                  {user.balance !== null ? user.balance : "Loading..."}
                </span>
              </div>
            </div>

            {/* Other Actions */}
            <div className="flex flex-col gap-4 mb-5">
              <h3 className="mb-3 font-ibmPlexSans font-semibold text-lg">Other Actions</h3>
              <div className="flex items-center gap-3 bg-[#FFF7E8]">
                <Image src="/edit.svg" alt="" width={23} height={23} />
                <span className="font-ibmPlexSans text-black">Edit Profile</span>
              </div>
              <div className="flex items-center gap-3 bg-[#FFF7E8]">
                <Image src="/delete.svg" alt="" width={19} height={19} />
                <span className="font-ibmPlexSans text-black">Delete</span>
              </div>
            </div>
          </div>
        ))}

        {/* Action Buttons */}
        <div className="bg-slate-100 flex mt-10 md:mt-36 gap-4">
          <button
            className="px-9 md:px-14 py-1 text-[#FDAC15] text-lg border border-[#FDAC15] rounded-sm font-ibmPlexSans font-medium"
            onClick={() => router.push("/manage-users")}
          >
            Cancel
          </button>
          <button
            onClick={handleBulkDeleteClick}
            disabled={selectedUsers.length === 0}
            className={`px-9 md:px-14 py-1 text-white text-lg border border-[#FDAC15] ${
              selectedUsers.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#FDAC15]"
            } rounded-sm font-ibmPlexSans font-medium`}
          >
            Delete ({selectedUsers.length})
          </button>
        </div>
      </div>

  {/* Confirmation Modal */}
  {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <p className="text-lg font-semibold mb-4">Are you sure you want to suspend the selected users?</p>
            <div className="flex justify-between">
              <button onClick={handleCancelDelete} className="px-4 py-2 text-gray-700 border border-[#FDAC15] hover:text-[#FDAC15] rounded-md">
                Cancel
              </button>
              <button onClick={handleConfirmDelete} className="px-4 py-2 text-white bg-red-500 border rounded-md">
                Confirm
              </button>
            </div> 
          </div>
        </div>
      )}

    </div>
  );
};

export default BulkDeletePage;
