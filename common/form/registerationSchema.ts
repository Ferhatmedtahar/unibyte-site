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

  whyJoin: z
    .string()
    .min(1, "Please tell us why you want to join ,"),

  interests: z.string().min(1, "Please select your interests"),

  hearAboutUs: z.string().min(1, "Please tell us how you heard about us"),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;
