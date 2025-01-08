"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { User } from "@/app/(pages)/manage-users/page"; // Correct import path
import Table from "@/components/Tables";
import { listAllUsers, listAllAdminUsers, unsuspendUserAccount } from "@/utils/api"; // Import the API functions
import { getWalletBalance } from "@/utils/api"; // Import the wallet balance API function
import { useRouter } from "next/navigation"; // Correct way to import useRouter
import { toast } from "react-toastify";
import Link from "next/link";

const UserList = ({ setSelectedUsers }: { setSelectedUsers: React.Dispatch<React.SetStateAction<User[]>> }) => {
  const [userData, setUserData] = useState<User[]>([]); // State to store fetched user data
  const [selectedRows, setSelectedRows] = useState<number[]>([]); // Store selected user IDs
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [itemsPerPage] = useState(10); // 10 items per page
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'suspended'>('all');
  const [filterOpen, setFilterOpen] = useState(false); // Track if the filter dropdown is open
  const [dropdownOpen, setDropdownOpen] = useState<{ [key: number]: boolean }>({}); // Track dropdown state for each user
  const [quickActionOpen, setQuickActionOpen] = useState(false); // State for Quick Actions dropdown

  const router = useRouter(); // Use the router from next/navigation

  // Refs for dropdown containers
  const filterDropdownRef = useRef<HTMLDivElement>(null);
  const quickActionDropdownRef = useRef<HTMLDivElement>(null);
  const threeDotDropdownRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  // Toggle dropdown for a specific user
  const toggleDropdown = (userId: number) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [userId]: !prevState[userId], // Toggle the dropdown for this user
    }));
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close filter dropdown
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target as Node)) {
        setFilterOpen(false);
      }

      // Close quick actions dropdown
      if (quickActionDropdownRef.current && !quickActionDropdownRef.current.contains(event.target as Node)) {
        setQuickActionOpen(false);
      }

      // Close 3-dot dropdowns
      Object.keys(dropdownOpen).forEach((userId) => {
        const dropdownRef = threeDotDropdownRefs.current[Number(userId)];
        if (dropdownRef && !dropdownRef.contains(event.target as Node)) {
          setDropdownOpen((prevState) => ({
            ...prevState,
            [userId]: false,
          }));
        }
      });
    };

    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  // Close dropdowns when an item is selected
  const handleFilterSelect = (status: 'all' | 'active' | 'suspended') => {
    setFilterStatus(status);
    setFilterOpen(false); // Close filter dropdown
  };

  const handleQuickActionSelect = (action: string) => {
    handleQuickAction(action);
    setQuickActionOpen(false); // Close quick actions dropdown
  };

  const handleThreeDotAction = (userId: number, action: string) => {
    if (action === "Suspend") {
      handleSuspend(userId);
    } else if (action === "Restore") {
      handleUnsuspend(userId);
    } else if (action === "Delete") {
      handleDelete(userId);
    }
    setDropdownOpen((prevState) => ({
      ...prevState,
      [userId]: false, // Close 3-dot dropdown
    }));
  };

  // Check if localStorage is available
  const isLocalStorageAvailable = () => {
    try {
      const testKey = "__test__";
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  };

  // Save selectedRows to localStorage with error handling
  const saveSelectedRowsToLocalStorage = (selectedRows: number[]) => {
    if (!isLocalStorageAvailable()) {
      console.error("localStorage is not available. Cannot save selectedRows.");
      return;
    }

    try {
      localStorage.setItem("selectedRows", JSON.stringify(selectedRows));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  };

  // Fetch all users on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch regular users and admin users simultaneously
        const [regularUsersResponse, adminUsersResponse] = await Promise.all([
          listAllUsers(currentPage, itemsPerPage),
          listAllAdminUsers(currentPage, itemsPerPage),
        ]);

        // Combine the data from both responses
        const regularUsers = regularUsersResponse.success ? regularUsersResponse.data.data : [];
        const adminUsers = adminUsersResponse.success ? adminUsersResponse.data.data : [];
        const combinedUsers = [...regularUsers, ...adminUsers];

        // Fetch wallet balances for all users
        const updatedUsers = await Promise.all(
          combinedUsers.map(async (user: User) => {
            if (!user.phone) {
              return { ...user, balance: "Balance not available" };
            }
            try {
              const balanceData = await getWalletBalance(user.phone);
              return { ...user, balance: balanceData.balance || "No balance data" };
            } catch (error: unknown) {
              if (error instanceof Error) {
                console.error("Error fetching wallet balance:", error.message);
              } else {
                console.error("Unexpected error occurred", error);
              }
              return { ...user, balance: "Error" };
            }
          })
        );

        // Update the userData state with the combined and enriched data
        setUserData(updatedUsers);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error fetching users:", error.message);
        } else {
          console.error("Unexpected error occurred", error);
        }
      }
    };

    fetchData();
  }, [currentPage]);

  // Initialize selectedRows from localStorage after component mount
  useEffect(() => {
    if (!isLocalStorageAvailable()) {
      console.error("localStorage is not available.");
      return;
    }

    try {
      const storedSelectedRows = JSON.parse(localStorage.getItem("selectedRows") || "[]");

      // Validate that storedSelectedRows is an array of numbers
      if (
        Array.isArray(storedSelectedRows) &&
        storedSelectedRows.every((id) => typeof id === "number")
      ) {
        setSelectedRows(storedSelectedRows);
      } else {
        console.error("Invalid data in localStorage. Resetting selectedRows.");
        localStorage.removeItem("selectedRows"); // Clear invalid data
        setSelectedRows([]);
      }
    } catch (error) {
      console.error("Error parsing data from localStorage:", error);
      localStorage.removeItem("selectedRows"); // Clear corrupted data
      setSelectedRows([]);
    }
  }, []);

  // Remove invalid IDs from selectedRows when userData changes
  useEffect(() => {
    const validSelectedRows = selectedRows.filter((id) =>
      userData.some((user) => user.id === id)
    );

    if (validSelectedRows.length !== selectedRows.length) {
      setSelectedRows(validSelectedRows);
      saveSelectedRowsToLocalStorage(validSelectedRows);
    }

    // Update selectedUsers
    const newSelectedUsers = userData.filter((user) =>
      selectedRows.includes(user.id)
    );
    setSelectedUsers(newSelectedUsers);
  }, [userData]);

  const handleRowSelect = (id: number) => {
    setSelectedRows((prevSelectedRows) => {
      const newSelectedRows = prevSelectedRows.includes(id)
        ? prevSelectedRows.filter((rowId) => rowId !== id) // Deselect if already selected
        : [...prevSelectedRows, id]; // Select if not already selected

      // Update localStorage immediately
      saveSelectedRowsToLocalStorage(newSelectedRows);
      console.log("Row selected/deselected, new selectedRows:", newSelectedRows);

      // Update selectedUsers based on newSelectedRows
      const newSelectedUsers = userData.filter((user) => newSelectedRows.includes(user.id));
      setSelectedUsers(newSelectedUsers);
      console.log("Selected users updated:", newSelectedUsers);

      return newSelectedRows;
    });
  };

  const handleSelectAll = (selected: boolean) => {
    const newSelectedRows = selected ? userData.map((item) => item.id) : []; // Select all or deselect all

    // Update localStorage immediately
    saveSelectedRowsToLocalStorage(newSelectedRows);
    console.log(
      selected ? "All users selected" : "All users deselected",
      newSelectedRows
    );

    // Update selectedRows state
    setSelectedRows(newSelectedRows);

    // Update selectedUsers based on newSelectedRows
    const newSelectedUsers = selected ? userData : [];
    setSelectedUsers(newSelectedUsers);
    console.log("Selected users updated:", newSelectedUsers);
  };

  const handleQuickAction = (action: string) => {
    if (action === "Delete All") {
      if (selectedRows.length > 0) {
        const ids = selectedRows.join(",");
        router.push(`/delete/bulk?ids=${ids}`);
      } else {
        toast.error("Please select users to delete.");
      }
    } else if (action === "Suspend All") {
      if (selectedRows.length > 0) {
        const ids = selectedRows.join(",");
        router.push(`/suspend/bulk?ids=${ids}`);
      } else {
        toast.error("Please select users to suspend.");
      }
    }
  };

  // Filter users based on status
  const filteredUserData = Array.isArray(userData)
    ? userData.filter((user) => {
        if (filterStatus === 'all') return true;
        return user.is_active === (filterStatus === 'active' ? 1 : 0);
      })
    : [];

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUserData.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(filteredUserData.length / itemsPerPage);

  // Handle page navigation
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Handle suspend and delete routing
  const handleSuspend = (userId: number) => {
    console.log("Suspend user with id:", userId);
    router.push(`/suspend/${userId}`); // Route to the suspend page
  };

  const handleUnsuspend = async (userId: number) => {
    try {
      const response = await unsuspendUserAccount(userId); // Call the unsuspend API function
      if (response.success) {
        toast.success("User Restored successfully!"); // Show success toast
        // Update the user data to reflect the re-activation
        setUserData((prevData) =>
          prevData.map((user) =>
            user.id === userId ? { ...user, is_active: 1 } : user
          )
        );
      } else {
        toast.error("Failed to restored user. Please try again."); // Show error toast if API fails
      }
    } catch (error) {
      toast.error("An error occurred while restoring the user."); // Handle any errors that might occur
      console.error("Error unsuspending user:", error);
    }
  };

  const handleDelete = (userId: number) => {
    console.log("Delete user with id:", userId);
    router.push(`/delete/${userId}`); // Route to the delete page
  };

  const columns = [
    { header: "Select", accessor: "isChecked" },
    { header: "Name", accessor: "username" },
    { header: "Phone", accessor: "phone" },
    { header: "Email", accessor: "email" },
    { header: "Balance (Ksh)", accessor: "balance" }, // Display balance in Ksh
    { header: "Status", accessor: "is_active" },
    { header: "Manage", accessor: "manage" },
  ];

  return (
    <div className="border border-gray-200 p-1 rounded-sm md:p-2">
      <div className="flex items-center flex-col md:flex-row gap-3 md:justify-between mb-3 md:mb-6">
        <h2 className="text-xl font-semibold font-ibmPlexSansd">Users</h2>
        <div className="flex flex-col md:flex-row items-center gap-3">
          <span className="text-base text-gray-500">{`${selectedRows.length} selected`}</span>

          {/* Quick Actions Dropdown */}
          <div className="relative" ref={quickActionDropdownRef}>
            <button
              onClick={() => setQuickActionOpen(!quickActionOpen)}
              className="px-4 py-1 flex items-center gap-2 border border-[#FDAC15] rounded-sm"
            >
              <span className="text-[#FDAC15] text-sm">Quick Actions</span>
              <Image src="/yellowdrop.svg" alt="" width={20} height={20} />
            </button>
            {quickActionOpen && (
              <div className="absolute bg-white shadow-lg rounded-md mt-2 p-2 w-32">
                <ul className="space-y-1">
                  <li>
                    <button
                      onClick={() => handleQuickActionSelect("Suspend All")}
                      className="hover:text-[#FDAC15] text-sm"
                    >
                      Suspend All
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleQuickActionSelect("Delete All")}
                      className="hover:text-[#FDAC15] text-sm"
                    >
                      Delete All
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Filter Dropdown */}
          <div className="relative" ref={filterDropdownRef}>
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="px-3 py-1 flex items-center gap-2 border border-[#FDAC15] rounded-sm"
            >
              <span className="text-[#FDAC15] text-sm">Filter</span>
              <Image src="/filter.svg" alt="" width={15} height={15} />
            </button>
            {filterOpen && (
              <div className="absolute bg-white shadow-lg rounded-md mt-2 p-2 w-32">
                <ul className="space-y-1">
                  <li>
                    <button
                      onClick={() => handleFilterSelect('active')}
                      className="hover:text-[#FDAC15] text-sm"
                    >
                      Active
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleFilterSelect('suspended')}
                      className="hover:text-[#FDAC15] text-sm"
                    >
                      Suspended
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleFilterSelect('all')}
                      className="hover:text-[#FDAC15] text-sm"
                    >
                      All
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <button
  className="px-4 py-[3px] flex items-center gap-2 border border-[#FDAC15] rounded-sm"
  onClick={() => router.push("/create")} // Redirect to the create page
>
  <Image src="/add.svg" alt="" width={19} height={19} />
  <p className="text-[#FDAC15] font-ibmPlexSans">Create User</p>
</button>
        </div>

        {/* Pagination */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <Image src="/leftarrrow.svg" alt="" width={15} height={15} />
          </button>
          <span>{`${indexOfFirstItem + 1}-${indexOfLastItem} of ${filteredUserData.length}`}</span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <Image src="/rightarrow.svg" alt="" width={15} height={15} />
          </button>
        </div>
      </div>

      <Table
        columns={columns}
        data={currentItems}
        renderRow={(item: any) => (
          <tr
            key={item.id}
            className={item.is_active === 0 ? "bg-gray-100" : ""} // Light grey for suspended users
          >
            {/* Row selection checkbox */}
            <td className="border-b border-gray-200 py-2">
              <input
                type="checkbox"
                checked={selectedRows.includes(item.id)}
                onChange={() => handleRowSelect(item.id)}
                disabled={item.is_active === 0} // Disable checkbox for suspended users
              />
            </td>
            {/* Other row data */}
            <td className="border-b border-gray-200 py-2">{item.username}</td>
            <td className="border-b border-gray-200 py-2">{item.phone}</td>
            <td className="border-b border-gray-200 py-2">{item.email}</td>
            <td className="border-b border-gray-200 py-2">{item.balance}</td>
            <td className="border-b border-gray-200 py-2">
              {item.is_active ? "Active" : "Suspended"}
            </td>
            <td className="border-b border-gray-200 py-2">
              <div className="flex items-center gap-5">
                {/* Edit Button */}
                <button onClick={() => router.push(`/edit/${item.id}`)}>
                  <Image src="/edit.svg" alt="Edit" height={20} width={20} />
                </button>

                {/* Dropdown Button */}
                <div className="relative" ref={(el) => (threeDotDropdownRefs.current[item.id] = el)}>
                  <button onClick={() => toggleDropdown(item.id)}>
                    <Image src="/dot3.svg" alt="Actions" height={20} width={20} />
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownOpen[item.id] && (
                    <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-md z-10">
                      <ul>
                        {item.is_active ? (
                          <li>
                            <button
                              className="w-full text-left px-3 py-2 hover:bg-gray-100 hover:text-[#FDAC15]"
                              onClick={() => handleThreeDotAction(item.id, "Suspend")} // Suspend logic
                            >
                              Suspend
                            </button>
                          </li>
                        ) : (
                          <li>
                            <button
                              className="w-full text-left px-3 py-2 hover:bg-gray-100 hover:text-[#FDAC15]"
                              onClick={() => handleThreeDotAction(item.id, "Restore")} // Unsuspend (Restore) logic
                            >
                              Restore
                            </button>
                          </li>
                        )}
                        <li>
                          <button
                            className="w-full text-left px-3 py-2 hover:bg-gray-100 hover:text-[#FDAC15]"
                            onClick={() => handleThreeDotAction(item.id, "Delete")} // Delete logic
                          >
                            Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </td>
          </tr>
        )}
        onSelectAll={handleSelectAll}
        selectedIds={selectedRows}
      />
    </div>
  );
};

export default UserList;