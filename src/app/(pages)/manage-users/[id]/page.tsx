"use client";
import { useRouter } from 'next/navigation'; 
import Image from "next/image";
import { useEffect, useState } from 'react';
import { User, Activity } from "@/app/(pages)/manage-users/page"; 
import { getUserActivity } from "@/utils/api"; 
import { listAllUsers } from "@/utils/api"; 
import UsageChart from "@/components/UsageChart";

const SingleUserPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const selectedUserId = Number(params.id);
  const userId = params.id;

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userActivityData, setUserActivityData] = useState<any[]>([]); // Update to an array for activities
  const [loading, setLoading] = useState(true);
  const [activitiesLoading, setActivitiesLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await listAllUsers();
        if (response.success && response.data && Array.isArray(response.data.data)) {
          const users = response.data.data;
          const user = users.find((user: User) => user.id === selectedUserId);
          
          if (user) {
            setSelectedUser(user);
  
            const activityData = await getUserActivity(user.id);
            console.log("Full Activity Data:", activityData);  // Log the activity data response
  
            // Ensure that data is populated correctly
            if (activityData.success && activityData.data && Array.isArray(activityData.data.data)) {
              console.log("User Activities:", activityData.data.data);  // Log user activities
              setUserActivityData(activityData.data.data);  // Update the state with the correct array of activities
            } else {
              console.log("No activity data found or invalid response");
              setUserActivityData([]);  // Set as empty if no valid activities
            }
          } else {
            setSelectedUser(null);
          }
        } else {
          console.error("Invalid users data:", response);
          setSelectedUser(null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setSelectedUser(null);
      } finally {
        setLoading(false);
        setActivitiesLoading(false);
      }
    };
  
    fetchData();
  }, [selectedUserId]);

  if (loading) {
    return <div>Loading user data...</div>;
  }

  if (!selectedUser) {
    return <div>User not found</div>;
  }

  const { first_name, last_name, balance, email, phone, secondaryNumber, created_at, location } = selectedUser;

  // Format the createdAt date
  const formattedDate = new Date(created_at).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' });

  // Prepare user activities (ensure this is an array)
  const activities = userActivityData;  // Now directly using the state

  const usageStats = [
    { day: "Sun", usage: 500 },
    { day: "Mon", usage: 200 },
    { day: "Tue", usage: 300 },
    { day: "Wed", usage: 150 },
    { day: "Thu", usage: 400 },
    { day: "Fri", usage: 350 },
    { day: "Sat", usage: 450 },
  ];

  const handleBackClick = () => {
    router.push('/manage-users');
  };

  return (
    <div className="border border-gray-200 rounded-sm mb-8 mt-4">
      {/* Top Section */}
      <div className="flex gap-3 pl-3 pt-3 items-center cursor-pointer" onClick={handleBackClick}>
        <Image src="/blackarrow.svg" alt="Back" width={10} height={10} />
        <span className="font-ibmPlexSans font-medium">Back</span>
      </div>

      <div className="flex flex-col items-center justify-center pb-3 gap-3">
        <div className="flex items-center p-2 bg-white rounded-full shadow-xl">
          <span className="text-[#FDAC15] font-medium font-ibmPlexSans text-xl">
            {first_name && last_name ? `${first_name[0].toUpperCase()}${last_name[0].toUpperCase()}` : "NN"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <p className="font-ibmPlexSans font-semibold text-base md:text-lg">
            {first_name} {last_name}
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
            <p className="text-xs font-ibmPlexSans">{location}</p>
          </div>
          <div className="flex gap-2 items-center">
            <Image src="/date.svg" alt="Date" width={13} height={13} />
            <p className="text-xs font-ibmPlexSans">{formattedDate}</p>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="md:w-2/3">
          {/* Graph Box */}
          <div className="border mb-3 border-gray-200 rounded-sm p-3">
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
            <UsageChart data={usageStats} />
          </div>

          {/* Activity Section */}
          <div className="border border-gray-200 w-full rounded-sm p-3">
            <div className="flex flex-col md:flex-row items-center justify-between mb-5">
              <p className="font-ibmPlexSans font-semibold text-lg">User Activity</p>
            </div>
            {activitiesLoading ? (
              <div>Loading activities...</div>
            ) : activities.length > 0 ? (
              <div className="flex flex-col gap-3">
                 {activities.map((activity: Activity, index: number) => (
    <div key={index} className="flex justify-between mb-1">
      <div className="flex flex-col gap-1">
        {/* Only show the activity message, not the name again */}
        <div className="text-base md:text-lg font-ibmPlexSans">
          <span className="text-base md:text-lg font-ibmPlexSans" dangerouslySetInnerHTML={{ __html: activity.message }} />
        </div>
        <p className="font-ibmPlexSans text-sm text-gray-500">
          {activity.timestamp}
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
                        <span className="font-ibmPlexSans font-normal text-base md:text-lg">{phone}</span>
                      </div>
                    </div>
                    <div className="flex mt-3 items-center gap-3">
                      <div className="">
                        <Image src="/secondary.svg" alt="Secondary" width={21} height={21} />
                      </div>
                      <div className="">
                        <p className="font-ibmPlexSans text-base md:text-lg font-medium">Secondary Number:</p>
                        <span className="font-ibmPlexSans font-normal text-base md:text-lg">{secondaryNumber || "n/a"}</span>
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
        
                  {/* Third Section */}
                  <div className="flex flex-col gap-6 mt-8 mb-6">
                    <button
                      onClick={() => router.push(`/edit/${userId}`)} // Route to /edit
                      className="flex items-center gap-4"
                    >
                      <Image src="/editpro.svg" alt="Edit Profile" width={21} height={21} />
                      <span className="font-ibmPlexSans font-medium text-base md:text-lg">
                        Edit Profile
                      </span>
                    </button>
        
                    <button
                      onClick={() => router.push(`/suspend/${userId}`)}// Route to /suspend
                      className="flex items-center gap-4"
                    >
                      <Image src="/suspend.svg" alt="Suspend" width={21} height={21} />
                      <span className="font-ibmPlexSans font-medium text-base md:text-lg">
                        Suspend
                      </span>
                    </button>
                    <button
                      onClick={() => router.push(`/delete/${userId}`)}// Route to /suspend
                      className="flex items-center gap-4"
                    >
                      <Image src="/delete.svg" alt="delete" width={21} height={21} />
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
        