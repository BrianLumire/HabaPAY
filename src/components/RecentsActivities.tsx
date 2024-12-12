import Image from "next/image";

const RecentsActivities = () => {
  // Data for recent activities
  const activities = [
    {
      user: "Grace Mwai",
      action: "created a HabaPay account",
      time: "Today.01:07PM",
    },
    {
      user: "Jane Mukenya M.",
      action: "widthdrew Ksh 240",
      time: "Yesterday.11:30AM",
    },
    {
      user: "Peter Parker",
      action: "made a payment",
      time: "2 days ago.03:45PM",
    },
    {
      user: "Obi Peter",
      action: "made a payment",
      time: "2 days ago.03:45PM",
    },
    {
      user: "Bola Tinubu",
      action: "made a payment",
      time: "2 days ago.03:45PM",
    },
    {
      user: "Jane Smith",
      action: "linked a new bank account",
      time: "Yesterday.10:15AM",
    },
    {
      user: "Grace Mwai",
      action: "made a payment",
      time: "2 days ago.03:45PM",
    },
  ];

  return (
    <div className="border md:mr-4 border-gray-200 rounded-sm px-4 py-1">
      {/* Title */}
      <div className="flex mb-3">
        <h2 className="font-ibmPlexSans font-semibold text-lg">Recent Activity</h2>
      </div>

      {/* Activities List */}
      {activities.map((activity, index) => (
        <div
          key={index}
          className="flex justify-between items-center mb-2"
        >
          <div className="flex flex-col gap-1">
            <div className="flex flex-col md:flex-row items-baseline md:gap-1">
              <p className="font-ibmPlexSans text-sm md:text-base font-semibold">
                {activity.user}
              </p>
              <span className="text-xs md:text-sm font-ibmPlexSans">
                {activity.action}
              </span>
            </div>
            <p className="font-ibmPlexSans text-xs">{activity.time}</p>
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
