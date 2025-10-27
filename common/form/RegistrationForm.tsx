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
import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button";
import {
  registrationSchema,
  type RegistrationFormData,
} from "./registerationSchema";

export default function RegistrationForm() {
  const [submitStatus, setSubmitStatus] = useState<{
    type: "idle" | "success" | "error";
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

  const onSubmit = async (data: RegistrationFormData) => {
    setSubmitStatus({ type: "idle" });

    try {
      const result = await submitRegistration(data);
      console.log("Submission result:", result);
      if (result.success) {
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

  return (
    <div className="w-full max-w-7xl mx-auto   backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-2xl shadow-primary-500/20 border border-primary-300/80 relative z-30">
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
              className="bg-white/80 border-primary-300/60 focus:border-primary-500 focus:ring-primary-500/20 text-primary-800 placeholder:text-primary-400/60"
              placeholder="Farid Belkacem"
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
              className="bg-white/80 border-primary-300/60 focus:border-primary-500 focus:ring-primary-500/20 text-primary-800 placeholder:text-primary-400/60"
              placeholder="farid@gmail.com"
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
              inputMode="tel"
              autoComplete="tel"
              className="bg-white/80 border-primary-300/60 focus:border-primary-500 focus:ring-primary-500/20 text-primary-800 placeholder:text-primary-400/60"
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
              className="bg-white/80 border-primary-300/60 focus:border-primary-500 focus:ring-primary-500/20 text-primary-800 placeholder:text-primary-400/60"
              placeholder="e.g. 2023XXXX"
            />
            {errors.universityNumber && (
              <p className="text-sm text-red-600 mt-1">
                {errors.universityNumber.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="discord" className="text-primary-700">
            Discord Username *
          </Label>
          <Input
            id="discord"
            type="text"
            {...register("discord")}
            autoComplete="username"
            className="bg-white/80 border-primary-300/60 focus:border-primary-500 focus:ring-primary-500/20 text-primary-800 placeholder:text-primary-400/60"
            placeholder="username"
          />
          {errors.discord && (
            <p className="text-sm text-red-600 mt-1">
              {errors.discord.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="whyJoin" className="text-primary-700">
            Why do you want to join UniByte? *
          </Label>
          <Textarea
            id="whyJoin"
            {...register("whyJoin")}
            rows={3}
            className="bg-white/80 border-primary-300/60 focus:border-primary-500 focus:ring-primary-500/20 text-primary-800 placeholder:text-primary-400/60 resize-none"
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
          >
            <SelectTrigger
              id="interests"
              className="bg-white/80 border-primary-300/60 focus:border-primary-500 focus:ring-primary-500/20 text-primary-800"
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
          >
            <SelectTrigger
              id="hearAboutUs"
              className="bg-white/80 border-primary-300/60 focus:border-primary-500 focus:ring-primary-500/20 text-primary-800"
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

        <div className="space-y-2">
          <Label htmlFor="canHelp" className="text-primary-700">
            If you would help the club, what can you do?
          </Label>
          <Textarea
            id="canHelp"
            {...register("canHelp")}
            rows={3}
            className="bg-white/80 border-primary-300/60 focus:border-primary-500 focus:ring-primary-500/20 text-primary-800 placeholder:text-primary-400/60 resize-none"
            placeholder="Tell us briefly what you could contribute..."
          />
          {errors.canHelp && (
            <p className="text-sm text-red-600 mt-1">
              {errors.canHelp.message}
            </p>
          )}
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            variant="primary"
            size="small"
            disabled={isSubmitting}
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

        {submitStatus.type == "success" && (
          <div className="mt-4 p-4 bg-primary-50 border border-priamry-200 rounded-xl text-primary-800 flex items-center justify-center">
            <Check className="mr-2 h-5 w-5 flex-shrink-0" />
            <p>{submitStatus.message}</p>
          </div>
        )}
        {submitStatus.type == "error" && (
          <div className="mt-4 p-4 bg-red-50 border border-red-300 rounded-xl text-red-800 flex items-center justify-center">
            <X className="mr-2 h-5 w-5 flex-shrink-0" />
            <p>{submitStatus.message}</p>
          </div>
        )}
      </form>
    </div>
  );
}
