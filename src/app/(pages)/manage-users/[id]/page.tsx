"use client";
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation
import Image from "next/image";
import { userData, userActivities } from "@/data"; // Make sure to import your datasets
import UsageChart from "@/components/UsageChart";

const SingleUserPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter(); // Get the router object from useRouter
  const selectedUserId = Number(params.id); // Get the user ID from the URL params
  const userId = params.id;
  // Get the selected user from the userData array
  const selectedUser = userData.find(user => user.id === selectedUserId);
  
  // Get the user activities from the userActivities array
  const userActivityData = userActivities.find(activity => activity.userId === selectedUserId);
  
  // Get the activities or set an empty array if no activities are found
  const activities = userActivityData ? userActivityData.activities : [];

  if (!selectedUser) {
    return <div>User not found</div>; // Handle case where user is not found
  }

  const { name, balance, status, email, number } = selectedUser; // Extract user details
// Mock usage data for the graph (line chart data)
const usageStats = [
  { day: "Sun", usage: 500 },
  { day: "Mon", usage: 200},
  { day: "Tue", usage: 300 },
  { day: "Wed", usage: 150 },
  { day: "Thu", usage: 400 },
  { day: "Fri", usage: 350 },
  { day: "Sat", usage: 450 },
  
];

  // Function to handle the back button click
  const handleBackClick = () => {
    router.push('/manage-users'); // Navigate to manage-users page
  };

  return (
    <div className="border border-gray-200 rounded-sm mb-5 mt-4">
      {/* Top Section */}
      <div className="flex gap-3 pl-3 pt-3 items-center cursor-pointer" onClick={handleBackClick}>
        <Image src="/blackarrow.svg" alt="Back" width={10} height={10} />
        <span className="font-ibmPlexSans font-medium">Back</span>
      </div>

      <div className="flex flex-col items-center justify-center pb-3 gap-3">
      <div className="flex items-center p-2 bg-white rounded-full shadow-xl">
  <span className="text-[#FDAC15] font-medium font-ibmPlexSans text-xl">
    {name ? `${name.split(' ')[0][0]}${name.split(' ')[1][0]}` : "NN"}  {/* Default to "NN" if no name */}
  </span>
</div>

        <div className="flex items-center gap-2">
          <p className="font-ibmPlexSans font-semibold text-base md:text-lg">
            {name}
          </p>
          <Image src="/mark.svg" alt="Verified" width={20} height={20} />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex gap-2 items-center">
            <Image src="/Union.svg" alt="Company" width={13} height={13} />
            <p className="text-xs font-ibmPlexSans">Doe Designs</p>
          </div>
          <div className="flex gap-2 items-center">
            <Image src="/location.svg" alt="Location" width={13} height={13} />
            <p className="text-xs font-ibmPlexSans">Machakos, Kenya</p>
          </div>
          <div className="flex gap-2 items-center">
            <Image src="/date.svg" alt="Date" width={13} height={13} />
            <p className="text-xs font-ibmPlexSans">23 Feb 2023</p>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row gap-3">
        {/* Left Section */}
        <div className="md:w-2/3">
        {/* Graph Box */}
        <div className="border mb-3  border-gray-200 rounded-sm p-3">
        <div className="flex flex-col md:flex-row items-center justify-between mb-5">
                              <p className="font-ibmPlexSans font-semibold text-lg">Usage Stats</p>
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
                            </div>
                           {/* Render the Line Chart (using the Chart component) */}
                           <UsageChart data={usageStats} />
          </div>
          {/* Activity Section */}
          <div className="border border-gray-200 w-full rounded-sm p-3">
             <div className="flex flex-col md:flex-row items-center justify-between mb-5">
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
                            </div>
            {/* Render activities */}
            {activities.length > 0 ? (
              <div className="flex flex-col gap-3">
                {activities.map((activity, index) => (
                  <div key={index} className="flex justify-between mb-1">
                    <div className="flex flex-col gap-1">
                      {/* Display user name and activity */}
                      <p className="text-base md:text-lg font-ibmPlexSans">
                        <span className="font-semibold">{name}</span>{" "}
                        {activity.action}
                      </p>
                      <p className="font-ibmPlexSans text-xs text-gray-500">
                        {activity.time}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-gray-400 text-sm">Review</p>
                      <Image
                        src="/rightarrow.svg"
                        alt="Review"
                        width={10}
                        height={10}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm font-ibmPlexSans text-gray-500">
                No activities found for this user.
              </p>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="md:w-1/3 border border-gray-200 flex flex-col rounded-sm p-2">
          {/* User Information */}
          <div className="p-2 flex mb-2 items-center justify-between border-b border-gray-200">
            <button className="text-[#FDAC15] text-sm border rounded-md px-3 py-[3px] border-[#FDAC15]">Profile</button>
            <button className="text-[#FDAC15] text-sm border rounded-md px-3 py-[3px] border-[#FDAC15]">Action</button>
            <button className="text-[#FDAC15] text-sm border rounded-md px-3 py-[3px] border-[#FDAC15]">Contact</button>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col pb-14 border-b">
            <div className="flex mt-3 items-center gap-3">
              <div className="">
                 <Image src="/@sign.svg" alt="Email" width={21} height={21} />
              </div>
             <div className="">
             <p className="font-ibmPlexSans text-base md:text-lg font-medium">Email:</p>
             <span className="font-ibmPlexSans font-normal text-base md:text-lg">{email}</span>
             </div>
            </div>
            <div className="flex mt-3 items-center gap-3">
              <div className="">
              <Image src="/primary.svg" alt="Phone" width={21} height={21} />
              </div>
              <div className="">
              <p className="font-ibmPlexSans text-base md:text-lg font-medium">Primary Number:</p>
              <span className="font-ibmPlexSans font-normal text-base md:text-lg">{number}</span>
              </div>
            </div>
            <div className="flex mt-3 items-center gap-3">
              <div className="">
              <Image src="/secondary.svg" alt="Secondary" width={21} height={21} />
              </div>
              <div className="">
              <p className="font-ibmPlexSans text-base md:text-lg font-medium">Secondary Number:</p>
              <span className="font-ibmPlexSans font-normal text-base md:text-lg">n/a</span>
              </div>
            </div>
            <div className="flex mt-3 items-center gap-3">
              <div className="">
              <Image src="/moneybag.svg" alt="Balance" width={21} height={21} />
              </div>
              <div className="">
              <p className="font-ibmPlexSans text-base md:text-lg font-medium">Account Balance</p>
              <span className="font-ibmPlexSans font-normal text-base md:text-lg">{balance}</span>
              </div>
            </div>
          </div>
           {/*third */}
                    <div className="flex flex-col gap-6 mt-8 mb-6">
                    <button
        onClick={() => router.push(`/manage-users/${userId}/edit`)}
        className="flex items-center gap-4"
      >
        <Image src="/editpro.svg" alt="Edit Profile" width={21} height={21} />
        <span className="font-ibmPlexSans font-medium text-base md:text-lg">
          Edit Profile
        </span>
      </button>

      <button
        onClick={() => router.push(`/manage-users/${userId}/suspend`)}
        className="flex items-center gap-4"
      >
        <Image src="/suspend.svg" alt="Suspend" width={21} height={21} />
        <span className="font-ibmPlexSans font-medium text-base md:text-lg">
          Suspend
        </span>
      </button>

      <button
        onClick={() => router.push(`/manage-users/${userId}/delete`)}
        className="flex items-center gap-4"
      >
        <Image src="/delete.svg" alt="Delete" width={21} height={21} />
        <span className="font-ibmPlexSans font-medium text-base md:text-lg">
          Delete
        </span>
      </button>
                    </div>
        </div>
      </div>
    </div>
  );
};

export default SingleUserPage;
