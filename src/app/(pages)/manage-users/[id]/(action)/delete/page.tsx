"use client"; // Ensure this component is client-side rendered

import Image from "next/image";
import { useRouter } from "next/navigation"; // Import from 'next/navigation'
import { useParams } from "next/navigation"; // Import useParams to access dynamic parameters

const DeletePage = () => {
  const router = useRouter(); // Initialize the router object
  const params = useParams(); // Get the dynamic route parameters

  // Function to handle close button click
  const handleCloseClick = () => {
    // Navigate back to the user page using the dynamic id
    router.push(`/manage-users/${params.id}`);
  };

  return (
    <div className="p-3">
      {/* Close Button */}
      <div className="flex justify-end pr-2 mb-6">
        <div
          className="p-2 rounded-full bg-[#FFF7E8] shadow-md cursor-pointer"
          onClick={handleCloseClick} // Add onClick handler to navigate
        >
          <Image src="/closex.svg" alt="Close" width={20} height={20} />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center">
          <p className="font-ibmPlexSans font-semibold text-xl mb-4">Confirm Delete</p>
        </div>

        <div className="shadow-2xl px-3 md:mb-40 border border-gray-200 md:justify-between md:w-[70%] flex flex-col items-center md:flex-row md:px-14 py-3">
          <div className=" mb-3 ">
            <Image src="/tick.svg" alt="" width={22} height={22} />
          </div>

          <div className="flex flex-col gap-1 mb-4 ">
            <h3 className="mb-3 font-ibmPlexSans font-semibold text-lg">Personal Details</h3>
            <div className="flex items-center">
              <p className="font-ibmPlexSans font-medium ">Name:</p>
              <span className="font-ibmPlexSans ">John Doe</span>
            </div>
            <div className="flex items-center">
              <p className="font-ibmPlexSans font-medium ">Email:</p>
              <span className="font-ibmPlexSans ">johndoe@gmail.com</span>
            </div>
            <div className="flex items-center">
              <p className="font-ibmPlexSans font-medium ">Number:</p>
              <span className="font-ibmPlexSans ">_254 73668290</span>
            </div>
            <div className="flex items-center">
              <p className="font-ibmPlexSans font-medium ">Location:</p>
              <span className="font-ibmPlexSans ">Machakos, Kenya</span>
            </div>
          </div>

          <div className="flex flex-col gap-1 mb-3">
            <h3 className="mb-3 font-ibmPlexSans font-semibold text-lg">Account Details</h3>
            <div className="flex items-center">
              <p className="font-ibmPlexSans font-medium ">Status:</p>
              <span className="font-ibmPlexSans ">Active</span>
            </div>
            <div className="flex items-center">
              <p className="font-ibmPlexSans font-medium ">Balance:</p>
              <span className="font-ibmPlexSans ">Ksh 1223</span>
            </div>
            <div className="flex items-center">
              <p className="font-ibmPlexSans font-medium ">Business:</p>
              <span className="font-ibmPlexSans ">n/a</span>
            </div>
            <div className="flex items-center">
              <p className="font-ibmPlexSans font-medium ">Created:</p>
              <span className="font-ibmPlexSans ">2 Feb 2023</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 mb-5">
            <h3 className="mb-3 font-ibmPlexSans font-semibold text-lg">Other Actions</h3>
            <div className="flex items-center gap-3 bg-[#FFF7E8]">
              <Image src="/edit.svg" alt="" width={23} height={23} />
              <span className="font-ibmPlexSans  text-black">Edit details</span>
            </div>
            <div className="flex items-center gap-3 bg-[#FFF7E8]">
              <Image src="/delete.svg" alt="" width={19} height={19} />
              <span className="font-ibmPlexSans text-black ">Delete</span>
            </div>
            <div className="flex items-center gap-3 bg-[#FFF7E8]"> 
              <Image src="/primary.svg" alt="" width={19} height={19}/>
              <span className="font-ibmPlexSans text-black ">Contact</span>
            </div>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center gap-4 ">
          <button className="px-9 md:px-14 py-1 text-[#FDAC15] text-lg border border-[#FDAC15] rounded-sm font-ibmPlexSans font-medium">Cancel</button>
          <button className="px-9 md:px-14 py-1 text-white text-lg border border-[#FDAC15] bg-[#FDAC15] rounded-sm font-ibmPlexSans font-medium"> Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeletePage;
