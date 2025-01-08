import { z } from "zod";

// Define the Zod schema for form validation
export const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  primaryNumber: z.string().min(10, "Primary number must be at least 10 digits"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  secondaryNumber: z.string().min(10, "Secondary number must be at least 10 digits").optional().or(z.literal("")),
  business: z.string().min(1, "Business is required"),
  location: z.string().min(1, "Location is required"),
  loginPin: z.string().min(4, "Login pin must be at least 4 digits").max(6, "Login pin cannot exceed 6 digits"),
});

// Infer the type from the Zod schema
export type CreateUserFormData = z.infer<typeof createUserSchema>;