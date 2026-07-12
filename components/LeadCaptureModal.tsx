"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useLeadCapture } from "./LeadCaptureProvider";

export const LeadCaptureModal = () => {
  const { isOpen, closeModal } = useLeadCapture();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Lock scroll & autofocus
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Small delay so the animation has started before we focus
      const t = setTimeout(() => nameRef.current?.focus(), 350);
      return () => clearTimeout(t);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [closeModal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, source: "cta" }),
      });

      if (response.ok) {
        closeModal();
        setName("");
        setEmail("");
        router.push("/thank-you");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Scrim — no blur, just a subtle dark overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-[998] bg-black/50"
          />

          {/* Top bar panel */}
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 right-0 z-[999] bg-[#111111] border-b border-neutral-800"
          >
            <div className="max-w-5xl mx-auto px-6 py-6 md:py-8">
              {/* Close */}
              <div className="flex items-center justify-between mb-6">
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.35, ease: "easeOut" }}
                  className="text-neutral-400 text-sm"
                >
                  Enter your details to book a free discovery call.
                </motion.p>

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15, duration: 0.3 }}
                  onClick={closeModal}
                  className="text-neutral-500 hover:text-white transition-colors text-sm font-mono tracking-wider uppercase"
                  aria-label="Close"
                >
                  ✕ close
                </motion.button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-end">
                  {/* Name */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.35, ease: "easeOut" }}
                    className="flex-1"
                  >
                    <label htmlFor="leadBarName" className="block text-[11px] font-mono text-neutral-500 uppercase tracking-widest mb-2">
                      Name
                    </label>
                    <input
                      ref={nameRef}
                      id="leadBarName"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      disabled={isSubmitting}
                      className="w-full bg-[#0B0B0B] border border-neutral-800 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#C8F135] focus:ring-1 focus:ring-[#C8F135] transition-colors placeholder:text-neutral-600"
                    />
                  </motion.div>

                  {/* Email */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.32, duration: 0.35, ease: "easeOut" }}
                    className="flex-1"
                  >
                    <label htmlFor="leadBarEmail" className="block text-[11px] font-mono text-neutral-500 uppercase tracking-widest mb-2">
                      Email
                    </label>
                    <input
                      id="leadBarEmail"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      disabled={isSubmitting}
                      className="w-full bg-[#0B0B0B] border border-neutral-800 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#C8F135] focus:ring-1 focus:ring-[#C8F135] transition-colors placeholder:text-neutral-600"
                    />
                  </motion.div>

                  {/* Submit */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.39, duration: 0.35, ease: "easeOut" }}
                    className="md:flex-shrink-0"
                  >
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full md:w-auto bg-[#C8F135] text-black font-semibold rounded-lg px-8 py-3 text-sm hover:bg-[#b5da30] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
                    >
                      {isSubmitting ? "Sending..." : "Continue →"}
                    </button>
                  </motion.div>
                </div>
              </form>

              {/* Bottom accent line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.45, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="h-[1px] bg-gradient-to-r from-transparent via-[#C8F135]/40 to-transparent mt-6 origin-left"
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
