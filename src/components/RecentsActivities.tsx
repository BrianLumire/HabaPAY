"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getUserActivity } from "@/utils/api"; // Adjust the import path

const RecentsActivities = () => {
  const [activities, setActivities] = useState<any[]>([]); // Replace 'any' with a proper type if available
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        // Fetch user activity data (replace `userId` with the actual user ID)
        const response = await getUserActivity(1); // Example: Fetch activity for user ID 1
        if (response.success && response.data?.data) {
          setActivities(response.data.data); // Set the activity data
        } else {
          setError("No activity data found.");
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch activity data.");
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="border md:mr-4 border-gray-200 rounded-sm px-4 py-1">
      {/* Title */}
      <div className="flex mb-3">
        <h2 className="font-ibmPlexSans font-semibold text-lg">Recent Activity</h2>
      </div>

      {/* Activities List */}
      {activities.map((activity, index) => (
        <div key={index} className="flex justify-between items-center mb-2">
          <div className="flex flex-col gap-1">
            <div className="flex flex-col md:flex-row items-baseline md:gap-1">
              <p
                className="font-ibmPlexSans text-sm md:text-base font-semibold"
                dangerouslySetInnerHTML={{ __html: activity.message }}
              />
            </div>
            <p className="font-ibmPlexSans text-xs">{activity.timestamp}</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-gray-400 text-sm">Review</p>
            <Image src="/rightarrow.svg" alt="Review" width={8} height={8} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentsActivities;