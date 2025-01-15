"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema, CreateUserFormData } from "@/schemas/userSchema";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import { registerAdmin } from "@/utils/api"; // Import the registerAdmin API

const CreateUserPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
  });

  const handleCloseClick = () => {
    if (document.referrer.includes("/manage-users")) {
      router.push("/manage-users");
    } else {
      router.push("/manage-users"); // Fallback route
    }
  };

  const onSubmit: SubmitHandler<CreateUserFormData> = async (data) => {
    setIsSubmitting(true);
    try {
      console.log("Form Data:", data); // Debugging

      // Register the user using the registerAdmin API
      const registerResponse = await registerAdmin(
        data.name,
        data.primaryNumber,
        data.email,
        data.password,
        data.secondaryNumber || "", // Optional field
        data.business,
        data.location,
        data.loginPin
      );

      if (registerResponse.success) {
        // Store the form data in sessionStorage
        sessionStorage.setItem("createUserData", JSON.stringify(data));

        // Show success toast notification
        toast.success("User has been registered successfully!");

        // Redirect to the Verify Email Page
        router.push("/create/verify-email");
      } else {
        toast.error("Failed to register user. Please try again.");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error("An error occurred while registering the user.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

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
        Create User Account
      </h1>
      <p className="text-gray-800 text-lg md:text-center mb-6">
        Enter account details for new account
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
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
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
              />
              {errors.primaryNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.primaryNumber.message}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-[15px] font-ibmPlexSans font-semibold">Email</label>
              <input
                {...register("email")}
                type="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-[#FDAC15] focus:border-[#FDAC15]"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="relative">
              <label className="block text-[15px] font-ibmPlexSans font-semibold">Password</label>
              <input
                {...register("password")}
                type={passwordVisible ? "text" : "password"}
                className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-[#FDAC15] focus:border-[#FDAC15]"
              />
              <button
                type="button"
                className="absolute right-3 top-10"
                onClick={togglePasswordVisibility}
              >
                <Image
                  src={passwordVisible ? "/see.png" : "/invisible.png"}
                  alt={passwordVisible ? "Hide password" : "Show password"}
                  width={20}
                  height={20}
                />
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
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
              />
              {errors.secondaryNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.secondaryNumber.message}</p>
              )}
            </div>

            {/* Business Field */}
            <div>
              <label className="block text-[15px] font-ibmPlexSans font-semibold">Business</label>
              <input
                {...register("business")}
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-[#FDAC15] focus:border-[#FDAC15]"
              />
              {errors.business && (
                <p className="text-red-500 text-sm mt-1">{errors.business.message}</p>
              )}
            </div>

            {/* Location Field */}
            <div>
              <label className="block text-[15px] font-ibmPlexSans font-semibold">Location</label>
              <input
                {...register("location")}
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-[#FDAC15] focus:border-[#FDAC15]"
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
              )}
            </div>

            {/* Login Pin Field */}
            <div>
              <label className="block text-[15px] font-ibmPlexSans font-semibold">Login Pin</label>
              <input
                {...register("loginPin")}
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-[#FDAC15] focus:border-[#FDAC15]"
              />
              {errors.loginPin && (
                <p className="text-red-500 text-sm mt-1">{errors.loginPin.message}</p>
              )}
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
            {isSubmitting ? "Submitting..." : "Verify"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUserPage;