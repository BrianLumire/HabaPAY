"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Import Link from next/link
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { login, loginWithGoogle, loginWithPin } from "@/utils/api"; // Import loginWithPin
import Image from "next/image";
import { ModeToggle } from "@/components/mode-toggle";

const Loginpage = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState(""); // Add state for PIN
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loginMethod, setLoginMethod] = useState<"password" | "pin">("password"); // Toggle between password and PIN
  const router = useRouter();

  // Handle Email/Password or Email/PIN Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrorMessage(null);

    try {
      let data;
      if (loginMethod === "password") {
        // Call the login API function for password
        data = await login(email, password);
      } else {
        // Call the loginWithPin API function for PIN
        data = await loginWithPin(email, pin);
      }

      // Extract tokens from the response
      const { access_token, refresh_token } = data.data;

      // Store tokens in localStorage
      if (access_token && refresh_token) {
        localStorage.setItem("accessToken", access_token);
        localStorage.setItem("refreshToken", refresh_token);
      } else {
        setErrorMessage("Failed to retrieve tokens.");
      }

      // Redirect to the home page
      router.push("/home");
    } catch (error: any) {
      setErrorMessage(error.message || "An error occurred. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  // Handle Google Sign-In Success
  const handleGoogleSuccess = async (credentialResponse: any) => {
    console.log("Google Sign-In Success:", credentialResponse);
    const token = credentialResponse.credential;
    console.log("Google ID Token:", token);

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const data = await loginWithGoogle(token);
      console.log("Backend Response:", data);

      const { access_token, refresh_token } = data.data;

      if (access_token && refresh_token) {
        localStorage.setItem("accessToken", access_token);
        localStorage.setItem("refreshToken", refresh_token);
      } else {
        setErrorMessage("Failed to retrieve tokens.");
      }

      router.push("/home");
    } catch (error: any) {
      console.error("Google Sign-In Error:", error);
      setErrorMessage(error.message || "Google Sign-In failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle Google Sign-In Failure
  const handleGoogleFailure = () => {
    setErrorMessage("Google Sign-In failed. Please try again.");
  };

  // Toggle between Password and PIN login methods
  const toggleLoginMethod = () => {
    setLoginMethod((prevMethod) => (prevMethod === "password" ? "pin" : "password"));
  };

  return (
    <GoogleOAuthProvider clientId="871395489201-4odg9ulq63s4a5s4p3t1jmagn5g3li0b.apps.googleusercontent.com">
      <div className="h-screen flex flex-col">
        {/* Header */}
        <div className="pr-4 flex-shrink-0 pt-3 flex justify-between items-center">
          <h1 className="font-ibmPlexSans font-semibold text-2xl pl-8 pt-6">
            HabaPay
          </h1>
          <ModeToggle />
        </div>

        {/* Content Area */}
        <div className="flex-grow flex justify-center items-center">
          <div className="sm:border sm:border-gray-300 shadow-lg px-6 py-10 rounded-lg">
            {/* Title */}
            <h2 className="font-ibmPlexSans text-2xl text-center font-medium mb-4">
              Log in to Account
            </h2>

            {/* Error Message */}
            {errorMessage && (
              <p className="text-red-500 text-center mb-4">{errorMessage}</p>
            )}

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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password or PIN Input */}
              {loginMethod === "password" ? (
                <div className="flex flex-col relative">
                  <label
                    htmlFor="password"
                    className="font-ibmPlexSans text-base font-medium text-gray-700 mb-2"
                  >
                    Password
                  </label>
                  <input
                    type={passwordVisible ? "text" : "password"}
                    id="password"
                    className="border mb-12 border-gray-300 px-4 py-2 rounded-md text-sm focus:outline-none focus:border-[#FDAC15]"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-10"
                    onClick={togglePasswordVisibility}
                  >
                    <Image
                      src={passwordVisible ? "/see.png" : "/invisible.png"}
                      alt={passwordVisible ? "Hide password" : "Show password"}
                      width={20}
                      height={20}
                    />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col">
                  <label
                    htmlFor="pin"
                    className="font-ibmPlexSans text-base font-medium text-gray-700 mb-2"
                  >
                    PIN
                  </label>
                  <input
                    type="password"
                    id="pin"
                    className="border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none  focus:border-[#FDAC15]"
                    placeholder="Enter your PIN"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    required
                  />
                </div>
              )}

              {/* Forgot Password or Forgot PIN Link */}
              <div className="text-center">
                <Link
                  href={loginMethod === "password" ? "/login/reset-password" : "/login/reset-pin"}
                  className="text-[#FDAC15] hover:underline"
                >
                  {loginMethod === "password" ? "Forgot Password?" : "Forgot PIN?"}
                </Link>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="text-white bg-[#FDAC15] px-24 py-3 rounded-lg shadow-md transition-all duration-300 hover:bg-[#e99b0d] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#FDAC15] focus:ring-offset-2"
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Log In"}
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="flex items-center justify-center my-6">
              <div className="border-t border-gray-300 flex-grow"></div>
              <span className="mx-4 text-gray-500">OR</span>
              <div className="border-t border-gray-300 flex-grow"></div>
            </div>

            {/* Google Sign-In Button */}
            <div className="flex items-center justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleFailure}
              />
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center my-6">
              <div className="border-t border-gray-300 flex-grow"></div>
              <span className="mx-4 text-gray-500">OR</span>
              <div className="border-t border-gray-300 flex-grow"></div>
            </div>

            {/* Login with PIN/Password Button */}
            <div className="flex items-center justify-center">
              <button
                onClick={toggleLoginMethod}
                className="text-[#FDAC15] bg-transparent px-24 py-3 rounded-lg border border-[#FDAC15] transition-all duration-300 hover:bg-[#FDAC15] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#FDAC15] focus:ring-offset-2"
              >
                {loginMethod === "password" ? "Login with PIN" : "Login with Password"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Loginpage;