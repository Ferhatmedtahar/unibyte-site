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

  studyYear: z.enum(
    [
      "engineering-1",
      "engineering-2",
      "engineering-3",
      "engineering-4",
      "engineering-5",
      "lmd-1",
      "lmd-2",
      "lmd-3",
      "lmd-4",
      "lmd-5",
    ],
    "Please select your study year",
  ),

  interests: z.string().min(1, "Please select your interests"),

  hearAboutUs: z.string().min(1, "Please tell us how you heard about us"),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;
