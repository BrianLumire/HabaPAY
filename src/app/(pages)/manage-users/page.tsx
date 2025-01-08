"use client";

import { useState } from "react";
import UserLists from "@/components/UserLists";
import UserActivitys from "@/components/UserActivitys";
import NewUsers from "@/components/NewUser";

type ManageAction = {
  src: string;
  alt: string;
};
export type Activity = {
  id: number;
  user_id: number;//Each activity is linked with the corresponding user using their user_id in the API response.
  message: string;  // This is the message describing the activity
  type: string;     // Type of activity (e.g., "deposit")
  timestamp: string; // The time when the activity occurred
};



export type User = {
  id: number;
  isChecked: boolean;//A boolean indicating whether the user is selected in the UI (likely used for bulk actions).
  first_name: string;//Various user details that would be displayed in the UI or used for admin actions.
  last_name: string;//same
  username: string;//same
  phone: string;//same
  email: string;//same
  balance: string;//same
  status: string;//same
  is_active: number;
  manage: ManageAction[];
  activities: Activity[];  // This refers to the Activity type
  location: string;
  created_at: string;
  secondaryNumber: string;  // Optional field, default to "n/a" if no secondary number
};



const ManageUsersPage = () => {
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]); // Use User[] type for selected users

  return (
    <div className="pb-5 mt-4">
      {/* Top section */}
      <div className="mb-4">
        <UserLists setSelectedUsers={setSelectedUsers} />
        {/*When users are selected, 
        their data gets passed to the selectedUsers state. */}
      </div>

      {/* Bottom section */}
      <div className="flex gap-3 w-full flex-col md:flex-row">
        <div className="md:w-2/3">
          <UserActivitys selectedUsers={selectedUsers} />
          {/*The selectedUsers state is passed as a prop to UserActivitys, 
          so it dynamically updates based on which users are selected. */}
        </div>
        <div className="md:w-1/3">
          <NewUsers />
        </div>
      </div>
    </div>
  );
};

export default ManageUsersPage;
//i plan to introduce bulk actions (suspend, delete, edit), the selectedUsers state will likely be used for those actions. This means the UserLists component should be designed to allow 
// multi-selection and trigger bulk actions based on the selected users.