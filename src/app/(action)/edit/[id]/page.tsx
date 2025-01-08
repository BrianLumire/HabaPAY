"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema, CreateUserFormData } from "@/schemas/userSchema";
import { getUserById, updateUser, updateLoginPin } from "@/utils/api";
import Image from "next/image";

const EditPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
  });

  // Fetch user data based on the ID from the route
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log("Fetching user data..."); // Debugging line
        const userData = await getUserById(Number(params.id));
        console.log("Fetched User Data:", userData); // Debugging line
  
        if (userData && userData.success) {
          console.log("User data fetched successfully:", userData.data); // Debugging line
          // Pre-fill the form fields with the fetched data
          setValue("name", userData.data.username || "");
          setValue("primaryNumber", userData.data.phone || "");
          setValue("email", userData.data.email || "");
          setValue("password", "********"); // Placeholder for password
          setValue("secondaryNumber", userData.data.secondary_phone || "");
          setValue("business", userData.data.business_name || "");
          setValue("location", userData.data.location || "");
          setValue("loginPin", userData.data.login_pin || "");
        } else {
          console.log("User data fetch failed or no data found"); // Debugging line
          toast.error("Failed to fetch user data. Please try again.");
          router.push("/manage-users");
        }
      } catch (error: any) {
        console.error("Error in fetchUserData:", error); // Debugging line
        toast.error(error.message || "An error occurred while fetching user data.");
        router.push("/manage-users");
      } finally {
        console.log("Setting isLoading to false"); // Debugging line
        setIsLoading(false); // Ensure this is always called
      }
    };
  
    // Call the fetchUserData function
    fetchUserData();
  }, [params.id, router, setValue]);
  
  const handleCloseClick = () => {
    router.push("/manage-users"); // Redirect to the manage-users page
  };

  const onSubmit: SubmitHandler<CreateUserFormData> = async (data) => {
    setIsSubmitting(true);
    try {
      // Execute both API calls concurrently
      const [updateUserResponse, updatePinResponse] = await Promise.all([
        updateUser(Number(params.id), {
          username: data.name,
          phone: data.primaryNumber,
          email: data.email,
          secondary_phone: data.secondaryNumber || "", // Default to empty string if undefined
          business_name: data.business,
          location: data.location,
        }),
        updateLoginPin(data.email, data.loginPin),
      ]);

      if (updateUserResponse.success && updatePinResponse.success) {
        toast.success("User updated successfully!");
        router.push("/manage-users"); // Redirect to manage-users after successful update
      } else {
        toast.error("Failed to update user. Please try again.");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred while updating the user.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const handleResetPassword = () => {
    // Implement password reset logic here (e.g., send a reset link to the user's email)
    toast.info("Password reset link sent to the user's email.");
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="p-4 h-screen">
      {/* Close Button */}
      <div className="flex justify-end pr-2 mb-6">
        <div
          className="p-2 rounded-full bg-[#FFF7E8] shadow-md cursor-pointer"
          onClick={handleCloseClick}
          aria-label="Close"
        >
          <Image src="/closex.svg" alt="Close" width={20} height={20} />
        </div>
      </div>

      {/* Heading */}
      <h1 className="text-2xl font-bold font-ibmPlexSans md:text-center mb-2">
        Edit User Account
      </h1>
      <p className="text-gray-800 text-lg md:text-center mb-6">
        Update account details for the user
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="md:flex md:space-x-24 md:mb-16 mb-4 md:mx-40">
          {/* Left Column */}
          <div className="md:w-1/2 mb-12 md:mb-0 space-y-14">
            {/* Name Field */}
            <div>
              <label className="block text-[15px] font-ibmPlexSans font-semibold">Name</label>
              <input
                {...register("name")}
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-[#FDAC15] focus:border-[#FDAC15]"
                aria-describedby="name-error"
              />
              {errors.name && (
                <p id="name-error" className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Primary Number Field */}
            <div>
              <label className="block text-[15px] font-ibmPlexSans font-semibold">
                Primary Number
              </label>
              <input
                {...register("primaryNumber")}
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-[#FDAC15] focus:border-[#FDAC15]"
                aria-describedby="primaryNumber-error"
              />
              {errors.primaryNumber && (
                <p id="primaryNumber-error" className="text-red-500 text-sm mt-1">
                  {errors.primaryNumber.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-[15px] font-ibmPlexSans font-semibold">Email</label>
              <input
                {...register("email")}
                type="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-[#FDAC15] focus:border-[#FDAC15]"
                aria-describedby="email-error"
              />
              {errors.email && (
                <p id="email-error" className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="relative">
              <label className="block text-[15px] font-ibmPlexSans font-semibold">Password</label>
              <input
                {...register("password")}
                type={passwordVisible ? "text" : "password"}
                className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-[#FDAC15] focus:border-[#FDAC15] bg-gray-100 cursor-not-allowed"
                readOnly // Make the field uneditable
                value="********" // Display a placeholder value
                aria-describedby="password-error"
              />
              <button
                type="button"
                className="absolute right-3 top-10"
                onClick={togglePasswordVisibility}
                aria-label={passwordVisible ? "Hide password" : "Show password"}
              >
                <Image
                  src={passwordVisible ? "/see.png" : "/invisible.png"}
                  alt={passwordVisible ? "Hide password" : "Show password"}
                  width={20}
                  height={20}
                />
              </button>
              <button
                type="button"
                onClick={handleResetPassword}
                className="mt-2 text-sm text-[#FDAC15] hover:underline"
              >
                Reset Password
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="md:w-1/2 space-y-14">
            {/* Secondary Number Field */}
            <div>
              <label className="block text-[15px] font-ibmPlexSans font-semibold">
                Secondary Number
              </label>
              <input
                {...register("secondaryNumber")}
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-[#FDAC15] focus:border-[#FDAC15]"
                placeholder="Optional"
                aria-describedby="secondaryNumber-error"
              />
              {errors.secondaryNumber && (
                <p id="secondaryNumber-error" className="text-red-500 text-sm mt-1">
                  {errors.secondaryNumber.message}
                </p>
              )}
            </div>

            {/* Business Field */}
            <div>
              <label className="block text-[15px] font-ibmPlexSans font-semibold">Business</label>
              <input
                {...register("business")}
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-[#FDAC15] focus:border-[#FDAC15]"
                aria-describedby="business-error"
              />
              {errors.business && (
                <p id="business-error" className="text-red-500 text-sm mt-1">
                  {errors.business.message}
                </p>
              )}
            </div>

            {/* Location Field */}
            <div>
              <label className="block text-[15px] font-ibmPlexSans font-semibold">Location</label>
              <input
                {...register("location")}
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-[#FDAC15] focus:border-[#FDAC15]"
                aria-describedby="location-error"
              />
              {errors.location && (
                <p id="location-error" className="text-red-500 text-sm mt-1">
                  {errors.location.message}
                </p>
              )}
            </div>

            {/* Login Pin Field */}
            <div>
              <label className="block text-[15px] font-ibmPlexSans font-semibold">Login Pin</label>
              <input
                {...register("loginPin")}
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-[#FDAC15] focus:border-[#FDAC15]"
                aria-describedby="loginPin-error"
              />
              {errors.loginPin && (
                <p id="loginPin-error" className="text-red-500 text-sm mt-1">
                  {errors.loginPin.message}
                </p>
              )}
              {/* Add a small note below the Login Pin field */}
              <p className="text-sm text-gray-500 mt-1">
                Update your login pin for secure access.
              </p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center pb-6 space-x-6">
          <button
            type="button"
            onClick={() => router.push("/manage-users")}
            className="px-9 md:px-14 py-1 text-[#FDAC15] text-lg border border-[#FDAC15] rounded-sm font-ibmPlexSans font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-9 md:px-14 py-1 bg-[#FDAC15] text-white rounded-sm font-ibmPlexSans font-medium text-lg hover:bg-[#e69900] disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPage;