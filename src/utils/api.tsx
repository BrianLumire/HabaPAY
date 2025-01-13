import axios from 'axios';
import { TransactionsResponse } from "@/types/types"; 

// Base URL for the API
const API_URL = 'https://api.frameworkconcepts.co.ke';

// Create an Axios instance with default settings
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Login API function
const login = async (email: string, password: string) => {
  try {
    const response = await apiClient.post('/api/v1/auth/login', { email, password });
    return response.data; // Returns user data and tokens
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Login failed. Please try again.');
  }
};

// New users list API function
const listNewUsers = async (page: number = 1, perPage: number = 10) => {
  try {
    const response = await apiClient.get('/api/v1/admins/users/new', {
      params: {
        page,
        per_page: perPage,
      },
    });
    return response.data; // Returns the list of new users data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to retrieve new users.');
  }
};

// List all users API function
const listAllUsers = async (page: number = 1, perPage: number = 10) => {
  try {
    const response = await apiClient.get('/api/v1/users', {
      params: {
        page,
        per_page: perPage,
      },
    });
    return response.data; // Returns the list of all users data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to retrieve all users.');
  }
};

// List all admin users API function
const listAllAdminUsers = async (page: number = 1, perPage: number = 10) => {
  try {
    const response = await apiClient.get('/api/v1/admins', {
      params: {
        page,
        per_page: perPage,
      },
    });
    return response.data; // Returns the list of admin users data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to retrieve admin users.');
  }
};

// Wallet balance API function
const getWalletBalance = async (phone: string) => {
  try {
    const response = await apiClient.get('/api/v1/wallet/balance', {
      params: { phone },
    });
    const balance = response.data.data.balance;
    return { balance }; // Return the balance value
  } catch (error: any) {
    console.error('Error fetching wallet balance:', error);
    throw new Error(error.response?.data?.message || 'Failed to retrieve wallet balance.');
  }
};

// Fetch recent user activity
const getUserActivity = async (
  userId: number,
  page: number = 1,
  perPage: number = 10,
  type?: string
) => {
  try {
    const response = await apiClient.get(`/api/v1/admins/users/${userId}/activity`, {
      params: {
        page,
        per_page: perPage,
        type,
      },
    });
    return response.data; // Returns the user activity data
  } catch (error: any) {
    console.error('Error fetching user activity:', error);
    throw new Error(error.response?.data?.message || 'Failed to retrieve user activity.');
  }
};

// Suspend User Account API function
const suspendUserAccount = async (userId: number) => {
  try {
    const response = await apiClient.post(`/api/v1/admins/users/${userId}/suspend`);
    return response.data; // Returns success message
  } catch (error: any) {
    console.error('Error suspending user account:', error);
    throw new Error(error.response?.data?.message || 'Failed to suspend user account.');
  }
};

// Unsuspend User Account API function
const unsuspendUserAccount = async (userId: number) => {
  try {
    const response = await apiClient.post(`/api/v1/admins/users/${userId}/unsuspend`);
    return response.data; // Returns success message
  } catch (error: any) {
    console.error('Error unsuspending user account:', error);
    throw new Error(error.response?.data?.message || 'Failed to unsuspend user account.');
  }
};

// Delete User Account API function
const deleteUserAccount = async (userId: number) => {
  try {
    const response = await apiClient.delete(`/api/v1/admins/users/${userId}`);
    return response.data; // Returns success message
  } catch (error: any) {
    console.error('Error deleting user account:', error);
    throw new Error(error.response?.data?.message || 'Failed to delete user account.');
  }
};

// Send PIN By Email API
const sendPinByEmail = async (email: string) => {
  try {
    const response = await apiClient.post('/api/v1/verifications/pin/send', { email });
    return response.data; // Returns success message
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to send verification pin.');
  }
};

// Verify PIN API
const verifyPin = async (email: string, pin: number) => {
  try {
    const response = await apiClient.post('/api/v1/verifications/pin/verify', { email, pin });
    return response.data; // Returns success message
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to verify pin.');
  }
};

// Send Email Verification Link API
const sendEmailVerificationLink = async (email: string) => {
  try {
    const response = await apiClient.post('/api/v1/verifications/email/send', { email });
    return response.data; // Returns success message
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to send email verification link.');
  }
};

// Send OTP API
const sendOtp = async (phoneNumber: string, email: string) => {
  try {
    const response = await apiClient.post('/api/v1/verifications/otp/send', {
      phone_number: phoneNumber,
      email,
    });
    return response.data; // Returns success message
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to send OTP.');
  }
};

// Verify OTP API
const verifyOtp = async (phoneNumber: string, otp: number) => {
  try {
    const response = await apiClient.post('/api/v1/verifications/otp/verify', {
      phone_number: phoneNumber,
      otp,
    });
    return response.data; // Returns success message
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to verify OTP.');
  }
};

// Update Login PIN API
const updateLoginPin = async (email: string, pin: string | number) => {
  try {
    const response = await apiClient.put('/api/v1/auth/login/pin', { email, pin });
    return response.data; // Returns success message
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to update login PIN.');
  }
};

// Login with PIN API function
const loginWithPin = async (email: string, pin: string | number) => {
  try {
    const response = await apiClient.post('/api/v1/auth/login/pin', { email, pin });
    return response.data; // Returns user data and tokens
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Login with PIN failed. Please try again.');
  }
};

// Update User Account API function
const updateUser = async (
  userId: number,
  data: {
    username: string;
    phone: string;
    email: string;
    secondary_phone?: string; // Make secondary_phone optional
    business_name: string;
    location: string;
  }
) => {
  try {
    // Prepare the request body (no password field)
    const requestBody = {
      username: data.username,
      phone: data.phone,
      email: data.email,
      secondary_phone: data.secondary_phone || "", // Default to empty string if undefined
      business_name: data.business_name,
      location: data.location,
    };

    // Make the API request
    const response = await apiClient.put(`/api/v1/admins/users/${userId}`, requestBody);
    return response.data; // Returns success message
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to update user account.');
  }
};

// Analytics Overview API function
const getAnalyticsOverview = async () => {
  try {
    const response = await apiClient.get('/api/v1/analytics/overview');
    return response.data; // Returns analytics overview data
  } catch (error: any) {
    console.error('Error fetching analytics overview:', error);
    throw new Error(error.response?.data?.message || 'Failed to retrieve analytics overview.');
  }
};

// Get User by ID API function
const getUserById = async (userId: number) => {
  try {
    console.log("Fetching user with ID:", userId); // Debugging line

    // Try fetching the user as a regular user
    const userResponse = await apiClient.get(`/api/v1/admins/users/${userId}`);
    console.log("Regular User Response:", userResponse.data); // Debugging line

    // Check if the response is successful AND data is not null
    if (userResponse.data.success && userResponse.data.data !== null) {
      console.log("User found in regular users endpoint:", userResponse.data); // Debugging line
      return userResponse.data; // Return the entire response data
    }

    console.log("User not found in regular users endpoint, trying admin endpoint..."); // Debugging line

    // Try fetching the user as an admin
    const adminResponse = await apiClient.get(`/api/v1/admins/${userId}`);
    console.log("Admin User Response:", adminResponse.data); // Debugging line

    // Check if the response is successful AND data is not null
    if (adminResponse.data.success && adminResponse.data.data !== null) {
      console.log("User found in admin endpoint:", adminResponse.data); // Debugging line
      return adminResponse.data; // Return the entire response data
    }

    // If neither user nor admin is found, throw an error
    console.log("User not found in either endpoint"); // Debugging line
    throw new Error("User not found.");
  } catch (error: any) {
    console.error("Error in getUserById:", error); // Debugging line
    throw new Error(error.response?.data?.message || "Failed to fetch user details.");
  }
};

// Register Admin API
const registerAdmin = async (
  username: string,
  phone: string,
  email: string,
  password: string,
  secondaryPhone: string,
  businessName: string,
  location: string,
  loginPin: string
) => {
  try {
    const response = await apiClient.post('/api/v1/auth/register', {
      username,
      phone,
      email,
      password,
      secondary_phone: secondaryPhone,
      business_name: businessName,
      location,
      login_pin: loginPin,
    });
    return response.data; // Returns success message and admin data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to register admin.');
  }
};

// Fetch recent analytics activity
const getAnalyticsActivity = async (page: number = 1, perPage: number = 10) => {
  try {
    const response = await apiClient.get('/api/v1/analytics/activity', {
      params: {
        page,
        per_page: perPage,
      },
    });
    return response.data; // Returns the analytics activity data
  } catch (error: any) {
    console.error('Error fetching analytics activity:', error);
    throw new Error(error.response?.data?.message || 'Failed to retrieve analytics activity.');
  }
};

// Google Auth API function
const loginWithGoogle = async (token: string) => {
  try {
    const response = await apiClient.post('/api/v1/auth/google', { token });
    return response.data; // Returns user data and tokens
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Google login failed. Please try again.');
  }
};

// List Transactions API function
const listTransactions = async (): Promise<TransactionsResponse> => {
  try {
    const response = await apiClient.get("/api/v1/transactions");
    return response.data; // Ensure this matches the TransactionsResponse type
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch transactions.");
  }
};

// Approve a Transaction API function
const approveTransaction = async (id: number) => {
  try {
    const response = await apiClient.post(`/api/v1/admins/transactions/${id}/approve`);
    return response.data; // Returns success message
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to approve transaction.");
  }
};

// Fetch transaction by ID
const fetchTransactionById = async (id: number) => {
  try {
    const response = await apiClient.get(`/api/v1/transactions/${id}`);
    return response.data; // Returns transaction details
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch transaction details.");
  }
};

// Reset Password API
const resetPassword = async (email: string) => {
  try {
    const response = await apiClient.post('/api/v1/auth/reset-password', { email });
    return response.data; // Returns success message
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to send reset password link.');
  }
};

// Update Password API
const updatePassword = async (email: string, password: string, token: string) => {
  try {
    const response = await apiClient.put('/api/v1/auth/password', { email, password, token });
    return response.data; // Returns success message
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to update password.');
  }
};

// Export the API functions
export {
  login,
  listNewUsers,
  listAllUsers,
  listAllAdminUsers,
  getWalletBalance,
  getUserActivity,
  suspendUserAccount,
  unsuspendUserAccount,
  deleteUserAccount,
  sendPinByEmail,
  verifyPin,
  sendEmailVerificationLink,
  sendOtp,
  verifyOtp,
  updateLoginPin,
  registerAdmin,
  updateUser,
  getUserById,
  getAnalyticsActivity,
  getAnalyticsOverview,
  loginWithGoogle,
  loginWithPin,
  listTransactions,
  approveTransaction,
  fetchTransactionById,
  resetPassword,
  updatePassword,
};