"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { SectionReveal } from "@/components/SectionReveal";

const FAQS = [
  {
    q: "What is Rotaract?",
    a: "Rotaract is a Rotary International programme for young people aged 18–30. It brings together leaders committed to making a positive difference in their communities while developing their leadership and professional skills.",
  },
  {
    q: "How do I join Rotaract Crystals?",
    a: "You can join by filling out our membership form on the Contact Us page or by reaching out to us directly via email or WhatsApp. Our membership team will get back to you promptly.",
  },
  {
    q: "What kind of projects does the club run?",
    a: "We run projects across Club Service, Community Service, Professional Service, and International Service avenues — from food donation drives and tribal village development to skill-building workshops and cultural events.",
  },
  {
    q: "Do I need prior volunteer experience to join?",
    a: "Not at all. We welcome members from all backgrounds. Our orientation programme will familiarise you with Rotaract values and our club's ongoing initiatives.",
  },
  {
    q: "Is there a membership fee?",
    a: "Yes, there is a nominal annual membership fee that covers club activities and district events. Please contact us for the current year's fee structure.",
  },
  {
    q: "What is Rotary International District 3206?",
    a: "RID 3206 is the Rotary district covering parts of Tamil Nadu and Puducherry. Rotaract Club of Coimbatore Crystals operates under this district.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const prefersReduced = useReducedMotion();

  return (
    <section className="py-24 bg-neutral-50">
      <div className="container-wide section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Heading column */}
          <SectionReveal className="lg:col-span-4" direction="left">
            <p className="text-primary text-xs font-semibold tracking-[0.25em] uppercase mb-3">
              Frequently Asked Questions
            </p>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-5">
              Got Questions?
            </h2>
            <p className="text-neutral-500 leading-relaxed">
              Everything you need to know about Rotaract Crystals and how to
              get involved.
            </p>
          </SectionReveal>

          {/* Accordion column */}
          <div className="lg:col-span-7 lg:col-start-6 space-y-3">
            {FAQS.map((faq, i) => (
              <SectionReveal key={i} delay={i * 0.06}>
                <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden">
                  <button
                    onClick={() =>
                      setOpenIndex(openIndex === i ? null : i)
                    }
                    className="w-full flex items-center justify-between px-6 py-5 text-left gap-4 group"
                    aria-expanded={openIndex === i}
                  >
                    <span className="font-display font-semibold text-neutral-900 group-hover:text-primary transition-colors duration-200 text-sm md:text-base">
                      {faq.q}
                    </span>
                    <motion.span
                      className="flex-shrink-0 w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 group-hover:bg-primary group-hover:text-white transition-colors duration-200"
                      animate={
                        prefersReduced ? {} : { rotate: openIndex === i ? 45 : 0 }
                      }
                      transition={{ duration: 0.25 }}
                    >
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="w-3.5 h-3.5"
                      >
                        <path d="M8 2v12M2 8h12" strokeLinecap="round" />
                      </svg>
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {openIndex === i && (
                      <motion.div
                        initial={prefersReduced ? {} : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={prefersReduced ? {} : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 text-neutral-600 text-sm leading-relaxed border-t border-neutral-50 pt-3">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
