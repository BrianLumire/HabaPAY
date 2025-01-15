"use client";
import { GoogleLogin } from "@react-oauth/google";
import { loginWithGoogle } from "@/utils/api"; // Import the loginWithGoogle function
import { toast } from "react-toastify"; // Import toast for notifications
import { useRouter } from "next/navigation";

const GoogleAuth = () => {
  const router = useRouter();

  // Handle Google Sign-In Success
  const handleGoogleSuccess = async (credentialResponse: any) => {
    console.log("Google Sign-In Success:", credentialResponse);
    const token = credentialResponse.credential; // Google ID token
    console.log("Google ID Token:", token);

    try {
      // Send the Google ID token to your backend for verification
      const data = await loginWithGoogle(token);
      console.log("Backend Response:", data);

      // Extract tokens from the response
      const { access_token, refresh_token } = data.data;

      if (access_token && refresh_token) {
        // Store tokens in localStorage (for client-side access)
        localStorage.setItem("accessToken", access_token);
        localStorage.setItem("refreshToken", refresh_token);

        // Store tokens in cookies (for server-side access)
        document.cookie = `accessToken=${access_token}; path=/; max-age=86400;`; // 1 day expiry
        document.cookie = `refreshToken=${refresh_token}; path=/; max-age=86400;`; // 1 day expiry

        // Show success toast notification
        toast.success("Google Sign-In successful. Redirecting...");

        // Redirect to the home page
        router.push("/home");
      } else {
        toast.error("Failed to retrieve tokens.");
      }
    } catch (error: any) {
      console.error("Google Sign-In Error:", error);
      toast.error(error.message || "Google Sign-In failed. Please try again.");
    }
  };

  // Handle Google Sign-In Failure
  const handleGoogleFailure = () => {
    console.error("Google Sign-In Failed");
    toast.error("Google Sign-In failed. Please try again.");
  };

  return (
    <GoogleLogin
      onSuccess={handleGoogleSuccess}
      onError={handleGoogleFailure}
      useOneTap // Optional: Enable Google One Tap
    />
  );
};

export default GoogleAuth;