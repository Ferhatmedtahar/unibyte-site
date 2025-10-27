import { z } from "zod";

export const registrationSchema = z.object({
  name: z
    .string()
    .min(1, "Full name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .toLowerCase(),

  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/,
      "Please enter a valid phone number"
    ),

  universityNumber: z
    .string()
    .min(1, "University number is required")
    .regex(
      /^[0-9]{4}[A-Za-z0-9]+$/,
      "University number must start with 4 digits (e.g., 2023XXXX)"
    ),

  discord: z
    .string()
    .min(1, "Discord username is required")
    .min(2, "Discord username must be at least 2 characters")
    .max(32, "Discord username must be less than 32 characters")
    .regex(
      /^[a-z0-9._]+$/,
      "Discord username can only contain lowercase letters, numbers, dots, and underscores"
    ),

  whyJoin: z
    .string()
    .min(1, "Please tell us why you want to join")
    .min(20, "Please provide at least 20 characters")
    .max(1000, "Response must be less than 1000 characters"),

  interests: z.string().min(1, "Please select your interests"),

  hearAboutUs: z.string().min(1, "Please tell us how you heard about us"),

  canHelp: z
    .string()
    .max(1000, "Response must be less than 1000 characters")
    .optional()
    .or(z.literal("")),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;
