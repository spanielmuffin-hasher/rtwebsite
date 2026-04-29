"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface FormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const prefersReduced = useReducedMotion();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setStatus("submitting");
    // Simulate submission — replace with your actual API endpoint
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      console.log("Form data:", data);
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-neutral-100 p-8 shadow-card">
      <h3 className="font-display font-bold text-2xl text-neutral-900 mb-6">
        Send Us a Message
      </h3>

      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-center py-10"
          >
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-7 h-7 text-green-600">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h4 className="font-display font-bold text-xl text-neutral-900 mb-2">
              Message Sent!
            </h4>
            <p className="text-neutral-500 text-sm mb-6">
              Thanks for reaching out. We&apos;ll be in touch within 24 hours.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="btn-outline text-sm"
            >
              Send Another
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Name */}
            <FormField label="Full Name" error={errors.name?.message} required>
              <input
                {...register("name", { required: "Name is required." })}
                type="text"
                placeholder="Your full name"
                className={inputClass(!!errors.name)}
              />
            </FormField>

            {/* Email */}
            <FormField label="Email Address" error={errors.email?.message} required>
              <input
                {...register("email", {
                  required: "Email is required.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address.",
                  },
                })}
                type="email"
                placeholder="you@example.com"
                className={inputClass(!!errors.email)}
              />
            </FormField>

            {/* Phone (optional) */}
            <FormField label="Phone Number" error={errors.phone?.message}>
              <input
                {...register("phone", {
                  pattern: {
                    value: /^[+]?[\d\s-]{7,15}$/,
                    message: "Enter a valid phone number.",
                  },
                })}
                type="tel"
                placeholder="+91 98765 43210 (optional)"
                className={inputClass(!!errors.phone)}
              />
            </FormField>

            {/* Subject */}
            <FormField label="Subject" error={errors.subject?.message} required>
              <select
                {...register("subject", { required: "Please select a subject." })}
                className={inputClass(!!errors.subject)}
              >
                <option value="">Select a subject</option>
                <option value="membership">Join / Membership Enquiry</option>
                <option value="collaboration">Project Collaboration</option>
                <option value="sponsorship">Sponsorship / Donation</option>
                <option value="media">Media / Press</option>
                <option value="general">General Enquiry</option>
              </select>
            </FormField>

            {/* Message */}
            <FormField label="Message" error={errors.message?.message} required>
              <textarea
                {...register("message", {
                  required: "Message is required.",
                  minLength: { value: 20, message: "Minimum 20 characters." },
                })}
                rows={4}
                placeholder="Tell us how we can help..."
                className={`${inputClass(!!errors.message)} resize-none`}
              />
            </FormField>

            {status === "error" && (
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-600 text-sm bg-red-50 rounded-xl px-4 py-3"
              >
                Something went wrong. Please try again.
              </motion.p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="btn-primary w-full py-3.5 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "submitting" ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Sending…
                </span>
              ) : (
                "Send Message"
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function FormField({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-neutral-700">
        {label}
        {required && <span className="text-primary ml-0.5">*</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-red-500 text-xs"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function inputClass(hasError: boolean) {
  return `w-full px-4 py-3 rounded-xl border text-sm text-neutral-900 placeholder-neutral-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary ${
    hasError
      ? "border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-100"
      : "border-neutral-200 bg-neutral-50 focus:bg-white"
  }`;
}
