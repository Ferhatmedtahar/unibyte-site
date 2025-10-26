"use client";

import React, { useState, useRef } from "react";
import Button from "../Button";

interface FormData {
  name: string;
  email: string;
  phone: string;
  universityNumber: string;
  discord: string;
  whyJoin: string;
  interests: string;
  hearAboutUs: string;
  canHelp: string;
}

export default function RegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    universityNumber: "",
    discord: "",
    whyJoin: "",
    interests: "",
    hearAboutUs: "",
    canHelp: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error" | "invalid">("idle");
  const [missingFields, setMissingFields] = useState<string[]>([]);
  const submittingRef = useRef(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitForm = async () => {
    if (submittingRef.current) return;
    submittingRef.current = true;
    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Client-side validation to avoid native browser prompts
    const required = [
      "name",
      "email",
      "phone",
      "universityNumber",
      "discord",
      "whyJoin",
      "interests",
      "hearAboutUs",
    ] as const;
    const labels: Record<(typeof required)[number], string> = {
      name: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      universityNumber: "University Number",
      discord: "Discord Username",
      whyJoin: "Why Join",
      interests: "Your Interests",
      hearAboutUs: "How did you hear about us?",
    };
    const missing = required.filter((k) => !formData[k]?.toString().trim());
    if (missing.length) {
      setMissingFields(missing.map((k) => labels[k]));
      setSubmitStatus("invalid");
      setIsSubmitting(false);
      return;
    }
    setMissingFields([]);

    try {
      const endpoint = "/api/register";
      const payload = { ...formData };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let ok = res.ok;
      let data: any = null;
      try {
        data = await res.json();
      } catch {
        // If the response isn't JSON, rely on HTTP status
      }

      if (!ok || (data && data.success !== true)) {
        throw new Error(data?.error || "Submission failed");
      }

      setSubmitStatus("success");
      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        universityNumber: "",
        discord: "",
        whyJoin: "",
        interests: "",
        hearAboutUs: "",
        canHelp: "",
      });
      setTimeout(() => setSubmitStatus("idle"), 3000);
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 3000);
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-2xl shadow-primary-500/20 border border-primary-300/80 relative z-30">
      <div className="mb-6">
        <h3 className="text-2xl sm:text-3xl font-bold text-primary-600 mb-2">
          Join Our Community
        </h3>
        <p className="text-primary-500/80 text-sm sm:text-base">
          Fill out the form below to become part of UniByte
        </p>
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        onKeyDown={(e) => {
          if (e.key === "Enter" && (e.target as HTMLElement).tagName !== "TEXTAREA") {
            e.preventDefault();
          }
        }}
        className="space-y-4"
        noValidate
      >
        {/* Name and Email Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-primary-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-primary-300/60 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 bg-white/80 text-primary-800 placeholder-primary-400/60 relative z-20 pointer-events-auto"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-primary-300/60 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 bg-white/80 text-primary-800 placeholder-primary-400/60 relative z-20 pointer-events-auto"
              placeholder="john@example.com"
            />
          </div>
        </div>

        {/* Phone and University Number Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-primary-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              inputMode="tel"
              autoComplete="tel"
              required
              className="w-full px-4 py-3 rounded-xl border border-primary-300/60 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 bg-white/80 text-primary-800 placeholder-primary-400/60 relative z-20 pointer-events-auto"
              placeholder="+213 123 456 789"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-700 mb-2">
              University Number *
            </label>
            <input
              type="text"
              name="universityNumber"
              value={formData.universityNumber}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-primary-300/60 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 bg-white/80 text-primary-800 placeholder-primary-400/60 relative z-20 pointer-events-auto"
              placeholder="e.g. 2023XXXX"
            />
          </div>
        </div>

        {/* Discord Row */}
        <div>
          <label className="block text-sm font-medium text-primary-700 mb-2">
            Discord Username *
          </label>
          <input
            type="text"
            name="discord"
            value={formData.discord}
            onChange={handleInputChange}
            autoComplete="username"
            required
            className="w-full px-4 py-3 rounded-xl border border-primary-300/60 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 bg-white/80 text-primary-800 placeholder-primary-400/60 relative z-20 pointer-events-auto"
            placeholder="username"
          />
        </div>

        {/* Why do you want to join */}
        <div>
          <label className="block text-sm font-medium text-primary-700 mb-2">
            Why do you want to join UniByte? *
          </label>
          <textarea
            name="whyJoin"
            value={formData.whyJoin}
            onChange={handleInputChange}
            required
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-primary-300/60 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 bg-white/80 text-primary-800 placeholder-primary-400/60 resize-none relative z-20 pointer-events-auto"
            placeholder="Tell us about your motivation to join our community..."
          />
        </div>

        {/* Interests */}
        <div>
          <label className="block text-sm font-medium text-primary-700 mb-2">
            Your Interests *
          </label>
          <select
            name="interests"
            value={formData.interests}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-primary-300/60 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 bg-white/80 text-primary-800 cursor-pointer relative z-20 pointer-events-auto"
          >
            <option value="">Select your interests</option>
            <option value="programming">Programming</option>
            <option value="ui-ux-design">UI/UX Design</option>
            <option value="photography">Photography</option>
            <option value="3d">3D</option>
            <option value="web-development">Web Development</option>
            <option value="ai-ml">AI & Machine Learning</option>
            <option value="mobile-dev">Mobile Development</option>
            <option value="cybersecurity">Cybersecurity</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* How did you hear about us */}
        <div>
          <label className="block text-sm font-medium text-primary-700 mb-2">
            How did you hear about us? *
          </label>
          <select
            name="hearAboutUs"
            value={formData.hearAboutUs}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-primary-300/60 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 bg-white/80 text-primary-800 relative z-20 pointer-events-auto"
          >
            <option value="">Select an option</option>
            <option value="friend">Friend or Colleague</option>
            <option value="social-media">Social Media</option>
            <option value="university">University Event</option>
            <option value="website">Our Website</option>
            <option value="poster">Poster/Flyer</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* If you would help the club */}
        <div>
          <label className="block text-sm font-medium text-primary-700 mb-2">
            If you would help the club, what can you do?
          </label>
          <textarea
            name="canHelp"
            value={formData.canHelp}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-primary-300/60 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 bg-white/80 text-primary-800 placeholder-primary-400/60 resize-none relative z-20 pointer-events-auto"
            placeholder="Tell us briefly what you could contribute..."
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            type="button"
            variant="primary"
            size="large"
            disabled={isSubmitting}
            className="w-full"
            onClick={submitForm}
          >
            {isSubmitting ? "Submitting..." : "Join UniByte"}
          </Button>
        </div>

        {/* Status Messages */}
        {submitStatus === "invalid" && (
          <div className="mt-4 p-4 bg-yellow-100 border border-yellow-300 rounded-xl text-yellow-900">
            <p className="font-semibold mb-2">Please fill the following required fields:</p>
            <ul className="list-disc ml-6">
              {missingFields.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        )}
        {submitStatus === "success" && (
          <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded-xl text-green-800 text-center">
            Thank you for your interest! We'll contact you soon.
          </div>
        )}
        {submitStatus === "error" && (
          <div className="mt-4 p-4 bg-red-100 border border-red-300 rounded-xl text-red-800 text-center">
            Something went wrong. Please try again later.
          </div>
        )}
      </form>
    </div>
  );
}