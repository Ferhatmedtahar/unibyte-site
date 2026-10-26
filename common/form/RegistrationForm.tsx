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
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Check,
  CheckCircle,
  Loader2,
  Mail,
  MessageCircle,
  X,
  Star,
  Trophy,
  Users,
} from "lucide-react";
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
      }),
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
    remainingTime:
      diffMinutes > 1 ? `${diffMinutes} minutes` : `${diffMinutes} minute`,
  };
};

export default function RegistrationForm() {
  const [submitStatus, setSubmitStatus] = useState<{
    type: "idle" | "success" | "error" | "blocked";
    message?: string;
  }>({ type: "idle" });

  const [showSuccessModal, setShowSuccessModal] = useState(false);

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
  const studyYear = watch("studyYear");

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
        setShowSuccessModal(true);
        reset();
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
    <div className="w-full max-w-7xl mx-auto bg-primary-50/70 rounded-[2rem] p-6 sm:p-10 relative z-30">
      {isBlocked && (
        <div className="mb-6 p-4 bg-primary-100 rounded-2xl text-primary-800 flex items-start">
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
              className="bg-white border-0 shadow-none focus-visible:ring-2 focus-visible:ring-primary-300/60 text-primary-800 placeholder:text-primary-400/60 disabled:opacity-50 disabled:cursor-not-allowed"
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
              className="bg-white border-0 shadow-none focus-visible:ring-2 focus-visible:ring-primary-300/60 text-primary-800 placeholder:text-primary-400/60 disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="email@gmail.com"
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="studyYear" className="text-primary-700">
            Study Year *
          </Label>
          <Select
            value={studyYear}
            onValueChange={(value) =>
              setValue(
                "studyYear",
                value as RegistrationFormData["studyYear"],
                {
                  shouldValidate: true,
                },
              )
            }
            disabled={isBlocked}
          >
            <SelectTrigger
              id="studyYear"
              className="bg-white border-0 shadow-none focus-visible:ring-2 focus-visible:ring-primary-300/60 text-primary-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <SelectValue placeholder="Select your study year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="engineering-1">
                Engineering — Year 1
              </SelectItem>
              <SelectItem value="engineering-2">
                Engineering — Year 2
              </SelectItem>
              <SelectItem value="engineering-3">
                Engineering — Year 3
              </SelectItem>
              <SelectItem value="engineering-4">
                Engineering — Year 4
              </SelectItem>
              <SelectItem value="engineering-5">
                Engineering — Year 5
              </SelectItem>
              <SelectItem value="lmd-1">LMD — Year 1</SelectItem>
              <SelectItem value="lmd-2">LMD — Year 2</SelectItem>
              <SelectItem value="lmd-3">LMD — Year 3</SelectItem>
              <SelectItem value="lmd-4">LMD — Year 4</SelectItem>
              <SelectItem value="lmd-5">LMD — Year 5</SelectItem>
            </SelectContent>
          </Select>
          {errors.studyYear && (
            <p className="text-sm text-red-600 mt-1">
              {errors.studyYear.message}
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
              className="bg-white border-0 shadow-none focus-visible:ring-2 focus-visible:ring-primary-300/60 text-primary-800 disabled:opacity-50 disabled:cursor-not-allowed"
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
              className="bg-white border-0 shadow-none focus-visible:ring-2 focus-visible:ring-primary-300/60 text-primary-800 disabled:opacity-50 disabled:cursor-not-allowed"
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
            size="large"
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

        {submitStatus.type === "error" && (
          <div className="mt-4 p-4 bg-red-50 rounded-xl text-red-800 flex items-center justify-center">
            <X className="mr-2 h-5 w-5 flex-shrink-0" />
            <p>{submitStatus.message}</p>
          </div>
        )}
      </form>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Modal Content */}
          <div className="relative w-full max-w-md transform overflow-hidden rounded-3xl bg-gradient-to-br from-white via-primary-50 to-white p-8 shadow-2xl transition-all duration-300 ease-out animate-in fade-in zoom-in-95">
            {/* Close Button */}
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute right-4 top-4 rounded-full p-1 text-primary-300 transition-colors hover:bg-primary-50 hover:text-primary-600"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Success Icon with Animation */}
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-gold-300 via-gold-400 to-gold-500">
              <CheckCircle className="h-12 w-12 text-primary-900" />
            </div>

            {/* Decorative Icons */}
            <div className="absolute -top-3 -left-3">
              <Star className="h-6 w-6 text-gold-400 opacity-70" />
            </div>
            <div className="absolute -top-3 -right-3">
              <Trophy className="h-6 w-6 text-gold-500 opacity-70" />
            </div>
            <div className="absolute -bottom-3 -left-3">
              <Users className="h-6 w-6 text-primary-400 opacity-60" />
            </div>
            <div className="absolute -bottom-3 -right-3">
              <Star className="h-6 w-6 text-gold-400 opacity-70" />
            </div>

            {/* Success Message */}
            <div className="text-center">
              <h3 className="mb-3 text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                Welcome to UniByte! 🎉
              </h3>
              <p className="mb-6 text-primary-700/70 leading-relaxed">
                Your registration has been successfully submitted! We're excited
                to have you join our community.
              </p>

              {/* Next Steps */}
              <div className="mb-6 space-y-4 rounded-2xl bg-white/70 p-5 backdrop-blur-sm">
                <div className="flex items-center space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100">
                    <Mail className="h-5 w-5 text-primary-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-primary-800">
                      Email Confirmation
                    </p>
                    <p className="text-sm text-primary-700/70">
                      Check your inbox for confirmation
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100">
                    <MessageCircle className="h-5 w-5 text-primary-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-primary-800">
                      Join Community
                    </p>
                    <p className="text-sm text-primary-700/70">
                      Connect with us on Discord
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full h-14 rounded-xl bg-primary-500 px-6 font-medium text-white transition-colors duration-300 hover:bg-primary-700 hover:cursor-pointer"
              >
                Awesome! Let's Go 🚀
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
