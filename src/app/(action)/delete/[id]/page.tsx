"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { User } from "@/app/(pages)/manage-users/page";
import { listAllUsers,listAllAdminUsers, getWalletBalance, deleteUserAccount } from "@/utils/api"; // Import the deleteUserAccount function
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeletePage = () => {
  const router = useRouter();
  const { id } = useParams();
  const userId = Array.isArray(id) ? id[0] : id;

  const [isChecked, setIsChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [balance, setBalance] = useState<number | null>(null);

  // Fetch user data and balance
  useEffect(() => {
    if (userId) {
      const fetchUserData = async () => {
        try {
          console.log('Fetching user data for ID:', userId);
  
          // Fetch both regular users and admin users simultaneously
          const [regularUsersResponse, adminUsersResponse] = await Promise.all([
            listAllUsers(),
            listAllAdminUsers(),
          ]);
  
          // Combine the data from both responses
          const regularUsers = regularUsersResponse.success ? regularUsersResponse.data.data : [];
          const adminUsers = adminUsersResponse.success ? adminUsersResponse.data.data : [];
          const combinedUsers = [...regularUsers, ...adminUsers];
  
          // Find the user in the combined dataset
          const userData = combinedUsers.find((user: User) => user.id === Number(userId));
  
          if (userData) {
            setUser({
              ...userData,
              location: userData.location || "Nairobi, Kenya",
            });
  
            // Fetch wallet balance for the user
            const balanceResponse = await getWalletBalance(userData.phone);
            if (balanceResponse.balance !== undefined) {
              setBalance(balanceResponse.balance);
            } else {
              console.error("Failed to fetch balance, balance data is missing.");
            }
          } else {
            console.error("User Not Found:", userId);
            router.push("/manage-users");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          router.push("/manage-users");
        }
      };
  
      fetchUserData();
    }
  }, [userId, router]);
  // Handle close button click
  const handleCloseClick = () => {
    if (document.referrer.includes("/manage-users")) {
      router.push("/manage-users");
    } else {
      router.push(`/manage-users`);
    }
  };

  // Handle checkbox click
  const handleCheckboxClick = () => {
    setIsChecked(!isChecked);
  };

  // Handle delete button click
  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  // Handle confirm delete
  const handleConfirmDelete = async () => {
    try {
      if (userId) {
        await deleteUserAccount(Number(userId)); // Call the deleteUserAccount API
        toast.success("User account deleted successfully!");
        router.push("/manage-users");
      }
    } catch (error: any) {
      console.error("Error deleting user account:", error);
      toast.error(error.message || "Failed to delete user account.");
    } finally {
      setIsModalOpen(false);
    }
  };

  // Handle cancel delete
  const handleCancelDelete = () => {
    setIsModalOpen(false);
    router.push(`/manage-users/${userId}`);
  };

  // If user data is not found, display an error message
  if (!user) return <p>User not found</p>;

  return (
    <div className="p-3">
      {/* Close Button */}
      <div className="flex justify-end pr-2 mb-6">
        <div
          className="p-2 rounded-full bg-[#FFF7E8] shadow-md cursor-pointer"
          onClick={handleCloseClick}
          aria-label="Close"
        >
          <Image src="/closex.svg" alt="Close" width={20} height={20} />
        </div>
      </div>

      {/* User Info and Checkbox */}
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center flex-col">
          <p className="font-ibmPlexSans font-semibold text-xl md:text-2xl md:mb-8 mb-4">Confirm Delete</p>
          <p className="font-ibmPlexSans text-gray-500 font-normal text-base md:text-lg md:mb-4 mb-2">
            Select user to activate the delete button
          </p>
        </div>
        <div
          className={`shadow-2xl md:justify-between md:px-36 px-7 md:w-[70%] md:items-center border border-gray-200 flex flex-col md:flex-row transition-all duration-300 ${isChecked ? "transform scale-105" : ""}`}
        >
          <div className="mb-3 flex cursor-pointer items-center mt-2 justify-center">
            <Image
              src={isChecked ? "/tick.svg" : "/check-box.png"}
              alt="Checkbox"
              width={32}
              height={32}
              onClick={handleCheckboxClick}
            />
          </div>

          {/* Personal Details */}
          <div className="flex flex-col gap-2 mb-4">
            <h3 className="mb-3 font-ibmPlexSans font-semibold text-lg">Personal Details</h3>
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
            <h3 className="mb-3 font-ibmPlexSans font-semibold text-lg">Account Details</h3>
            <div className="flex items-center">
              <p className="font-ibmPlexSans font-medium">Status:</p>
              <span className="font-ibmPlexSans">
                {user.is_active === 1 ? "Active" : "Inactive"}
              </span>
            </div>
            <div className="flex items-center">
              <p className="font-ibmPlexSans font-medium">Balance:</p>
              <span className="font-ibmPlexSans">{balance !== null ? balance : "Loading..."}</span>
            </div>
            <div className="flex items-center">
              <p className="font-ibmPlexSans font-medium">Business:</p>
              <span className="font-ibmPlexSans">n/a</span>
            </div>
            <div className="flex items-center">
              <p className="font-ibmPlexSans font-medium">Created:</p>
              <span className="font-ibmPlexSans">
                {user.created_at
                  ? new Date(user.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "Loading..."}
              </span>
            </div>
          </div>

          {/* Other Actions */}
          <div className="flex flex-col gap-4 mb-5">
            <h3 className="mb-3 font-ibmPlexSans font-semibold text-lg">Other Actions</h3>
            <div className="flex items-center gap-3 p-1 bg-[#FFF7E8]">
              <Image src="/edit.svg" alt="" width={23} height={23} />
              <span className="font-ibmPlexSans text-black">Edit Profile</span>
            </div>
            <div className="flex items-center gap-3 p-1 bg-[#FFF7E8]" onClick={handleDeleteClick}>
              <Image src="/suspend.svg" alt="" width={19} height={19} />
              <span className="font-ibmPlexSans text-black">Suspend</span>
            </div>
            <div className="flex items-center gap-3 p-1 bg-[#FFF7E8]">
              <Image src="/primary.svg" alt="" width={19} height={19} />
              <span className="font-ibmPlexSans text-black">Contact</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className=" flex mt-10 md:mt-36 gap-4">
          <button
            className="px-9 md:px-14 py-1 text-[#FDAC15] text-lg border border-[#FDAC15] rounded-sm font-ibmPlexSans font-medium"
            onClick={handleCancelDelete}
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteClick}
            disabled={!isChecked}
            className={`px-9 md:px-14 py-1 text-white text-lg border border-[#FDAC15] ${
              !isChecked ? "bg-gray-400 cursor-not-allowed" : "bg-[#FDAC15]"
            } rounded-sm font-ibmPlexSans font-medium`}
          >
            Delete
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-1/3">
            <p className="text-lg text-black font-semibold mb-4">Are you sure you want to delete this user?</p>
            <div className="flex justify-between">
              <button onClick={handleCancelDelete} className="px-4 py-2 text-gray-700 border rounded-md">
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

export default DeletePage;