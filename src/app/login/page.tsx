"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle"

const Loginpage = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate a login processing delay (e.g., API call)
    setTimeout(() => {
      // After processing, redirect to /home
      router.push("/home");
    }, 2000); // 2 seconds delay
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="pr-4 flex-shrink-0  pt-3 flex justify-between items-center">
        <h1 className="font-ibmPlexSans font-semibold text-2xl pl-8 pt-6">
          HabaPay
        </h1>
        <ModeToggle/>
      </div>

      {/* Content Area */}
      <div className="flex-grow flex justify-center items-center">
        <div className="sm:border sm:border-gray-300 shadow-lg px-6 py-10 rounded-lg">
          {/* Title */}
          <h2 className="font-ibmPlexSans text-2xl text-center font-medium mb-16">
            Log in to Account
          </h2>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleLogin}>
            {/* Email Input */}
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="font-ibmPlexSans text-base font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="border border-gray-300 px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#FDAC15] focus:border-[#FDAC15]"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Input */}
            <div className="flex flex-col relative">
              <label
                htmlFor="password"
                className="font-ibmPlexSans text-base font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                type={passwordVisible ? "text" : "password"} // Show password if passwordVisible is true
                id="password"
                className="border mb-12 border-gray-300 px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#FDAC15] focus:border-[#FDAC15]"
                placeholder="Enter your password"
                required
              />

              {/* Toggle Password Visibility Icon */}
              <button
                type="button"
                className="absolute right-4 top-10"
                onClick={togglePasswordVisibility}
              >
                {/* Add your custom image/icons for showing and hiding password */}
                <Image
                  src={passwordVisible ? "/see.png" : "/invisible.png"} // Placeholder image names
                  alt={passwordVisible ? "Hide password" : "Show password"}
                  width={20}
                  height={20}
                />
              </button>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="text-white bg-[#FDAC15] px-24 py-3 rounded-lg shadow-md transition-all duration-300 hover:bg-[#e99b0d] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#FDAC15] focus:ring-offset-2"
                disabled={isProcessing} // Disable the button during processing
              >
                {isProcessing ? "Processing..." : "Log In"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
