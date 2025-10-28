"use client";

import { submitRegistration } from "@/actions/registeration.action";
import { Input } from "@/common/ui/input";
import { Label } from "@/common/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/common/ui/select";
import { Textarea } from "@/common/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// import Button from "../Button";
import Button from "../Button";
import {
  registrationSchema,
  type RegistrationFormData,
} from "./registerationSchema";

// Storage key for tracking submissions
const SUBMISSION_KEY = "unibyte_registration_submission";

// Helper functions for submission tracking
const getSubmissionData = () => {
  if (typeof window === "undefined") return null;

  try {
    const data = localStorage.getItem(SUBMISSION_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

const setSubmissionData = (expiresAt: string) => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(
      SUBMISSION_KEY,
      JSON.stringify({
        submitted: true,
        expiresAt,
      })
    );
  } catch (error) {
    console.error("Failed to save submission data:", error);
  }
};

const canSubmit = () => {
  const data = getSubmissionData();

  if (!data || !data.submitted || !data.expiresAt) {
    return { canSubmit: true, remainingTime: null };
  }

  const now = new Date();
  const expiresAt = new Date(data.expiresAt);

  if (now >= expiresAt) {
    // Submission period has expired, clear the data
    localStorage.removeItem(SUBMISSION_KEY);
    return { canSubmit: true, remainingTime: null };
  }

  // Calculate remaining time
  const diffMs = expiresAt.getTime() - now.getTime();
  const diffMinutes = Math.ceil(diffMs / (1000 * 60));

  return {
    canSubmit: false,
    remainingTime: diffMinutes > 1 ? `${diffMinutes} minutes` : `${diffMinutes} minute`,
  };
};

export default function RegistrationForm() {
  const [submitStatus, setSubmitStatus] = useState<{
    type: "idle" | "success" | "error" | "blocked";
    message?: string;
  }>({ type: "idle" });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });

  const interests = watch("interests");
  const hearAboutUs = watch("hearAboutUs");

  // Check submission eligibility on mount
  useEffect(() => {
    const { canSubmit: eligible, remainingTime } = canSubmit();

    if (!eligible) {
      setSubmitStatus({
        type: "blocked",
        message: `You have already submitted a registration request. Please wait ${remainingTime} before submitting again.`,
      });
    }
  }, []);

  const onSubmit = async (data: RegistrationFormData) => {
    // Check if user can submit before processing
    const { canSubmit: eligible, remainingTime } = canSubmit();

    if (!eligible) {
      setSubmitStatus({
        type: "blocked",
        message: `You have already submitted a registration request. Please wait ${remainingTime} before submitting again.`,
      });
      return;
    }

    setSubmitStatus({ type: "idle" });

    try {
      const result = await submitRegistration(data);
      console.log("Submission result:", result);

      if (result.success) {
        // Calculate expiration date (1 minute from now)
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 1);

        // Store submission data
        setSubmissionData(expiresAt.toISOString());

        setSubmitStatus({
          type: "success",
          message: result.message,
        });
        reset();
        setTimeout(() => setSubmitStatus({ type: "idle" }), 5000);
      } else {
        setSubmitStatus({
          type: "error",
          message: result.message || "Something went wrong. Please try again.",
        });
        setTimeout(() => setSubmitStatus({ type: "idle" }), 5000);
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "An unexpected error occurred. Please try again later.",
      });
      setTimeout(() => setSubmitStatus({ type: "idle" }), 5000);
    }
  };

  const isBlocked = submitStatus.type === "blocked";

  return (
    <div className="w-full max-w-7xl mx-auto backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-2xl shadow-primary-500/20 border border-primary-300/80 relative z-30">
      {isBlocked && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-300 rounded-xl text-amber-900 flex items-start">
          <X className="mr-2 h-5 w-5 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Submission Restricted</p>
            <p className="text-sm mt-1">{submitStatus.message}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-primary-700">
              Full Name *
            </Label>
            <Input
              id="name"
              type="text"
              {...register("name")}
              disabled={isBlocked}
              className="bg-white/80 border-primary-300/60 focus:border-primary-500 focus:ring-primary-500/20 text-primary-800 placeholder:text-primary-400/60 disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="your name here"
            />
            {errors.name && (
              <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-primary-700">
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              disabled={isBlocked}
              className="bg-white/80 border-primary-300/60 focus:border-primary-500 focus:ring-primary-500/20 text-primary-800 placeholder:text-primary-400/60 disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="email@gmail.com"
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-primary-700">
              Phone Number *
            </Label>
            <Input
              id="phone"
              type="tel"
              {...register("phone")}
              disabled={isBlocked}
              inputMode="tel"
              autoComplete="tel"
              className="bg-white/80 border-primary-300/60 focus:border-primary-500 focus:ring-primary-500/20 text-primary-800 placeholder:text-primary-400/60 disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="+213 123 456 789"
            />
            {errors.phone && (
              <p className="text-sm text-red-600 mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="universityNumber" className="text-primary-700">
              University Number *
            </Label>
            <Input
              id="universityNumber"
              type="text"
              {...register("universityNumber")}
              disabled={isBlocked}
              className="bg-white/80 border-primary-300/60 focus:border-primary-500 focus:ring-primary-500/20 text-primary-800 placeholder:text-primary-400/60 disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="e.g. 2424XXXX"
            />
            {errors.universityNumber && (
              <p className="text-sm text-red-600 mt-1">
                {errors.universityNumber.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="whyJoin" className="text-primary-700">
            Please tell us why you want to join , and if you would help us  , what u can do ? *
          </Label>
          <Textarea
            id="whyJoin"
            {...register("whyJoin")}
            disabled={isBlocked}
            rows={3}
            className="bg-white/80 border-primary-300/60 focus:border-primary-500 focus:ring-primary-500/20 text-primary-800 placeholder:text-primary-400/60 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="Tell us about your motivation to join our community..."
          />
          {errors.whyJoin && (
            <p className="text-sm text-red-600 mt-1">
              {errors.whyJoin.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="interests" className="text-primary-700">
            Your Interests *
          </Label>
          <Select
            value={interests}
            onValueChange={(value) => setValue("interests", value)}
            disabled={isBlocked}
          >
            <SelectTrigger
              id="interests"
              className="bg-white/80 border-primary-300/60 focus:border-primary-500 focus:ring-primary-500/20 text-primary-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <SelectValue placeholder="Select your interests" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="programming">Programming</SelectItem>
              <SelectItem value="ui-ux-design">UI/UX Design</SelectItem>
              <SelectItem value="photography">Photography</SelectItem>
              <SelectItem value="3d">3D</SelectItem>
              <SelectItem value="web-development">Web Development</SelectItem>
              <SelectItem value="ai-ml">AI & Machine Learning</SelectItem>
              <SelectItem value="mobile-dev">Mobile Development</SelectItem>
              <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.interests && (
            <p className="text-sm text-red-600 mt-1">
              {errors.interests.message && "Please select an interest"}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="hearAboutUs" className="text-primary-700">
            How did you hear about us? *
          </Label>
          <Select
            value={hearAboutUs}
            onValueChange={(value) => setValue("hearAboutUs", value)}
            disabled={isBlocked}
          >
            <SelectTrigger
              id="hearAboutUs"
              className="bg-white/80 border-primary-300/60 focus:border-primary-500 focus:ring-primary-500/20 text-primary-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="friend">Friend or Colleague</SelectItem>
              <SelectItem value="social-media">Social Media</SelectItem>
              <SelectItem value="university">University Event</SelectItem>
              <SelectItem value="website">Our Website</SelectItem>
              <SelectItem value="poster">Poster/Flyer</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.hearAboutUs && (
            <p className="text-sm text-red-600 mt-1">
              {errors.hearAboutUs.message && "Please select an option"}
            </p>
          )}
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            variant="primary"
            size="small"
            disabled={isSubmitting || isBlocked}
            className="w-full"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Join UniByte"
            )}
          </Button>
        </div>

        {submitStatus.type === "success" && (
          <div className="mt-4 p-4 bg-primary-50 border border-primary-200 rounded-xl text-primary-800 flex items-center justify-center">
            <Check className="mr-2 h-5 w-5 flex-shrink-0" />
            <p>{submitStatus.message}</p>
          </div>
        )}
        {submitStatus.type === "error" && (
          <div className="mt-4 p-4 bg-red-50 border border-red-300 rounded-xl text-red-800 flex items-center justify-center">
            <X className="mr-2 h-5 w-5 flex-shrink-0" />
            <p>{submitStatus.message}</p>
          </div>
        )}
      </form>
    </div>
  );
}
