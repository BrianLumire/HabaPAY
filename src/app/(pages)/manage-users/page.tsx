"use client";

import { useState } from "react";
import UserLists from "@/components/UserLists";
import UserActivitys from "@/components/UserActivitys";
import NewUsers from "@/components/NewUser";

// Define the User type (structure of each user)
type ManageAction = {
  src: string;
  alt: string;
};

export type User = {
  id: number;
  isChecked: boolean;
  name: string;
  number: string;
  email: string;
  balance: string;
  status: string;
  manage: ManageAction[];
  activities: string[]; // Example for activities, adjust as needed
};

const ManageUsersPage = () => {
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]); // Use User[] type for selected users

  return (
    <div className="pb-5">
      {/* Top section */}
      <div className="mb-4">
        <UserLists setSelectedUsers={setSelectedUsers} />
      </div>

      {/* Bottom section */}
      <div className="flex gap-3 flex-col md:flex-row">
        <div className="md:w-2/3">
          <UserActivitys selectedUsers={selectedUsers} />
        </div>
        <div className="md:w-1/3">
          <NewUsers />
        </div>
      </div>
    </div>
  );
};

export default ManageUsersPage;
