"use server";

import {
  registrationSchema,
  type RegistrationFormData,
} from "@/common/form/registerationSchema";
import { ZodError } from "zod";

export type ActionResponse = {
  success: boolean;
  message?: string;
  errors?: {
    [K in keyof RegistrationFormData]?: string[];
  };
};

export async function submitRegistration(
  data: RegistrationFormData
): Promise<ActionResponse> {
  try {
    // Server-side validation with Zod
    const validatedData = registrationSchema.parse(data);

    const APPS_SCRIPT_ENDPOINT = process.env.APPS_SCRIPT_ENDPOINT?.trim();
    const SECRET = process.env.SECRET?.trim();
    console.log(
      "APPS_SCRIPT_ENDPOINT:",
      APPS_SCRIPT_ENDPOINT,
      "SECRET:",
      SECRET,
      "validatedData:",
      validatedData
    );
    if (!APPS_SCRIPT_ENDPOINT || !SECRET) {
      console.error(
        "Missing APPS_SCRIPT_ENDPOINT or SECRET environment variables"
      );
      return {
        success: false,
        message: "Server configuration error. Please contact support.",
      };
    }

    // Reorder fields to ensure whyJoin is the last column in Google Sheets
    const { whyJoin, ...otherFields } = validatedData;
    const payload = { ...otherFields, whyJoin, _secret: SECRET };
    console.log("Payload to be sent:", payload);
    const response = await fetch(APPS_SCRIPT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
    console.log("Response from Apps Script:", response);
    const status = response.status;
    const ok = response.ok;

    let json: any = null;
    let bodyText: string | null = null;

    try {
      json = await response.json();
    } catch {
      try {
        bodyText = await response.text();
      } catch {
        bodyText = null;
      }
    }

    if (!ok || (json && json.success !== true)) {
      const errorMsg =
        json?.error ||
        (status >= 300 && status < 400
          ? "Configuration error: Apps Script redirected. Ensure Web App is deployed with access 'Anyone' and 'Execute as Me'."
          : `Submission failed with status ${status}`);

      console.error("Apps Script error:", { status, errorMsg, bodyText });

      return {
        success: false,
        message:
          "Failed to submit registration. Please try again or contact support.",
      };
    }

    return {
      success: true,
      message:
        json?.message || "Thank you for registering! We'll contact you soon.",
    };
  } catch (error) {
    console.error("Registration submission error:", error);

    if (error instanceof ZodError) {
      const fieldErrors: Partial<Record<keyof RegistrationFormData, string[]>> =
        {};

      error.issues.forEach((err) => {
        const field = err.path[0] as keyof RegistrationFormData;
        if (field) {
          if (!fieldErrors[field]) {
            fieldErrors[field] = [];
          }
          fieldErrors[field]!.push(err.message);
        }
      });

      return {
        success: false,
        message: "Please check the form for validation errors.",
        errors: fieldErrors,
      };
    }

    if (error instanceof TypeError && error.message.includes("fetch")) {
      return {
        success: false,
        message: "Network error. Please check your connection and try again.",
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    };
  }
}
