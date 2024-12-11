import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle"

const Signpage = () => {
  return (
    <div className="h-screen flex flex-col">
      <div className="pr-4 flex-shrink-0  pt-3 flex justify-between items-center">
        <h1 className="font-ibmPlexSans font-semibold text-2xl pl-8 pt-6">
          HabaPay
        </h1>
        <ModeToggle/>
      </div>
      <div className="flex-grow flex justify-center items-center">
        <div className="sm:border sm:border-gray-300 shadow-lg px-6 py-8">
          {/*text box */}
          <div className="flex flex-col gap-7 mb-7">
            <h2 className="font-ibmPlexSans text-xl text-center font-medium">Welcome back</h2>
            <p className="font-ibmPlexSans font-normal text-center ">Sign in to proceed into your account</p>
          </div>
          {/*photo box */}
          <div className="flex mb-6">
            <Image src="/signin.png" alt="" height={300} width={300}/>
          </div>
          {/*button box */}
          <div className="flex items-center justify-center">
            <Link href="/login">
            <button className="text-white bg-[#FDAC15] px-20 py-2 rounded-md shadow-md transition-all duration-300 hover:bg-[#e99b0d] hover:scale-105 focus:outline-none focus:ring-1 focus:ring-[#FDAC15] focus:ring-offset-1">
            Sign In
          </button>
            </Link>
         
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signpage;
