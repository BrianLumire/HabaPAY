"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { listNewUsers } from "@/utils/api";

const NewUser = () => {
  const [usersData, setUsersData] = useState<any>(null); // State to store fetched data
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Modal visibility state

  useEffect(() => {
    // Fetch the new users on component mount
    const fetchNewUsers = async () => {
      setLoading(true);
      try {
        const data = await listNewUsers(1, 5); // Fetch first 5 users on page 1
        setUsersData(data); // Store the fetched data
      } catch (err: any) {
        setError(err.message); // Handle errors
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };

    fetchNewUsers();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return <div>Loading new users...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="border border-gray-200 rounded-sm p-1">
      {/* Title */}
      <div className="flex items-center justify-between px-2">
        <p className="font-ibmPlexSans text-lg font-semibold">New Users</p>
        <div className="flex items-center gap-2">
          {/* Trigger modal to view all users */}
          <span
            onClick={openModal}
            className="font-ibmPlexSans text-base text-[#898989] cursor-pointer"
          >
            View All
          </span>
          <Image src="/rightarrow.svg" alt="View All" width={8} height={8} />
        </div>
      </div>

      {/* Map through grouped users */}
      {usersData?.data?.data?.map((entry: any, index: number) => (
        <div key={index}>
          {/* Date Section */}
          <div className="flex mt-3">
            <p className="font-ibmPlexSans mb-2 font-semibold text-sm pl-4">{entry.date}</p>
          </div>

          {/* List Section */}
          {entry.users.map((user: any) => (
            <div key={user.id} className="mx-6 flex items-center justify-between mb-2">
              <div className="flex flex-col">
                <p className="text-base font-ibmPlexSans font-semibold">{user.username}</p>
                <span className="text-xs font-ibmPlexSans text-[#656565]">{user.email}</span>
              </div>
              <div>
                <Image src="/edit.svg" alt="Edit User" width={23} height={23} />
              </div>
            </div>
          ))}
        </div>
      ))}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-gray-500 bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded-lg  md:w-1/4">
            <h2 className="font-ibmPlexSans text-xl font-semibold mb-4">All Users</h2>
            {/* List all users in modal */}
            {usersData?.data?.data?.map((entry: any, index: number) => (
              <div key={index}>
                <div className="flex mt-3">
                  <p className="font-ibmPlexSans mb-4 text-black font-semibold text-sm pl-4">{entry.date}</p>
                </div>
                {entry.users.map((user: any) => (
                  <div key={user.id} className="mx-6 flex items-center justify-between mb-3">
                    <div className="flex flex-col">
                      <p className="text-base font-ibmPlexSans text-black font-semibold">{user.username}</p>
                      <span className="text-xs font-ibmPlexSans text-[#656565]">{user.email}</span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
            <button onClick={closeModal} className="mt-4 text-white bg-[#FDAC15] p-2 rounded-lg">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewUser;
