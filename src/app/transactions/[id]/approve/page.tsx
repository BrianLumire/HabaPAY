"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { login, approveTransaction } from "@/utils/api";
import { toast } from "react-toastify";
import Image from "next/image";

// Define the schema for the form
const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

const ConfirmIdentityPage = () => {
  const { id } = useParams(); // Get transaction_id from URL
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      // Step 1: Validate admin identity by logging in
      await login(data.email, data.password);

      // Step 2: Approve the transaction
      await approveTransaction(Number(id));

      // Show success toast and redirect
      toast.success("Transaction approved successfully!");
      router.push("/home");
    } catch (error: any) {
      // Show error toast
      toast.error(error.message || "Failed to approve transaction.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle close button click
  const handleCloseClick = () => {
    router.push("/home");
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-full max-w-md p-8 border border-gray-200 rounded-lg shadow-lg">
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

        {/* Form Title */}
        <h2 className="text-2xl font-bold mb-12 text-center">Confirm Identity</h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-16">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full p-2 border rounded-md"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field with Toggle Visibility */}
          <div className="relative">
            <label className="block text-sm font-medium">Password</label>
            <input
              type={passwordVisible ? "text" : "password"}
              {...register("password")}
              className="w-full p-2 border rounded-md"
            />
            {/* Toggle Visibility Button */}
            <button
              type="button"
              className="absolute right-3 top-9"
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
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Centered Button with Space Above */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#FDAC15] text-white px-16 text-lg py-2 rounded-md hover:bg-[#e89b0f] transition-colors"
            >
              {isLoading ? "Processing..." : "Finish"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfirmIdentityPage;