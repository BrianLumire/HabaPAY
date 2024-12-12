import Image from "next/image";

const NewUser = () => {
  // Data for users
  const users = [
    { name: "Grace Mwai", email: "gracemwaii44@haba.co.ke" },
    { name: "John Doe", email: "johndoe123@haba.co.ke" },
    { name: "Jane Smith", email: "janesmith22@haba.co.ke" },
    { name: "Peter Parker", email: "peterparker@haba.co.ke" },
    { name: "Mary Johnson", email: "maryj88@haba.co.ke" },
  ];

  return (
    <div className="border border-gray-200 rounded-sm p-1">
      {/* Title */}
      <div className="flex items-center justify-between px-2">
        <p className="font-ibmPlexSans text-lg font-semibold">New Users</p>
        <div className="flex items-center gap-2">
          <span className="font-ibmPlexSans text-base text-[#898989]">View All</span>
          <Image src="/rightarrow.svg" alt="View All" width={8} height={8} />
        </div>
      </div>

      {/* Date Section */}
      <div className="flex mt-3">
        <p className="font-ibmPlexSans mb-4 font-semibold text-xs pl-8">5th March 2023</p>
      </div>

      {/* List Section */}
      {users.map((user, index) => (
        <div key={index} className="mx-6 flex items-center justify-between mb-3">
          <div className="flex flex-col">
            <p className="text-base font-ibmPlexSans font-semibold">{user.name}</p>
            <span className="text-xs font-ibmPlexSans text-[#656565]">{user.email}</span>
          </div>
          <div>
            <Image src="/edit.svg" alt="Edit User" width={23} height={23} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewUser;
