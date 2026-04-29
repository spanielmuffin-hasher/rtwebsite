import type { Metadata } from "next";
import { SectionReveal } from "@/components/SectionReveal";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Get in touch with Rotaract Club of Coimbatore Crystals — mail us, WhatsApp us, or visit our Instagram page.",
};

const CONTACT_METHODS = [
  {
    title: "Mail Us",
    description: "Drop us an email and we'll respond within 24 hours.",
    value: "rotaractcbecrystals@gmail.com",
    href: "mailto:rotaractcbecrystals@gmail.com",
    icon: "📧",
    cta: "Send Email",
  },
  {
    title: "WhatsApp Us",
    description: "Reach us directly for quick queries or membership info.",
    value: "+91 98765 43210",
    href: "https://wa.me/919876543210",
    icon: "💬",
    cta: "Open WhatsApp",
  },
  {
    title: "Instagram Page",
    description: "Follow us for event updates, photos, and announcements.",
    value: "@rotaractcbecrystals",
    href: "https://instagram.com/rotaractcbecrystals",
    icon: "📸",
    cta: "Follow Us",
  },
];

export default function ContactUsPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 bg-neutral-50 border-b border-neutral-100">
        <div className="container-wide section-padding">
          <SectionReveal>
            <p className="text-primary text-xs font-semibold tracking-[0.25em] uppercase mb-3">
              Contact us
            </p>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-neutral-900 mb-4">
              Let&apos;s Talk
            </h1>
            <p className="text-neutral-500 max-w-xl leading-relaxed">
              Whether you&apos;re looking to join, collaborate on a project, or simply
              find out more — we&apos;re here and happy to connect.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Contact methods */}
      <section className="py-20 bg-white">
        <div className="container-wide section-padding">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {CONTACT_METHODS.map((method, i) => (
              <SectionReveal key={method.title} delay={i * 0.1}>
                <div className="group p-8 rounded-3xl border border-neutral-100 bg-neutral-50 hover:border-primary/20 hover:shadow-card transition-all duration-400 h-full flex flex-col">
                  <span className="text-4xl mb-5 block">{method.icon}</span>
                  <h3 className="font-display font-bold text-neutral-900 text-xl mb-2">
                    {method.title}
                  </h3>
                  <p className="text-neutral-500 text-sm leading-relaxed mb-3 flex-1">
                    {method.description}
                  </p>
                  <p className="text-neutral-700 text-sm font-medium mb-5">
                    {method.value}
                  </p>
                  <a
                    href={method.href}
                    target={method.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="btn-primary text-sm py-2.5 px-6 self-start"
                  >
                    {method.cta}
                  </a>
                </div>
              </SectionReveal>
            ))}
          </div>

          {/* Connect With Us — address + form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Address */}
            <SectionReveal direction="left">
              <h2 className="text-3xl font-display font-bold text-neutral-900 mb-8">
                Connect With Us
              </h2>
              <ul className="space-y-6 text-sm text-neutral-600">
                <li className="flex gap-4">
                  <span className="text-xl flex-shrink-0 mt-0.5">📍</span>
                  <div>
                    <p className="font-semibold text-neutral-900 mb-1">Address</p>
                    <p className="leading-relaxed">Coimbatore, Tamil Nadu, India — 641 018</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-xl flex-shrink-0 mt-0.5">✉️</span>
                  <div>
                    <p className="font-semibold text-neutral-900 mb-1">Email</p>
                    <a
                      href="mailto:rotaractcbecrystals@gmail.com"
                      className="text-primary hover:underline"
                    >
                      rotaractcbecrystals@gmail.com
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-xl flex-shrink-0 mt-0.5">🌐</span>
                  <div>
                    <p className="font-semibold text-neutral-900 mb-1">District</p>
                    <p>Rotary International District 3206</p>
                  </div>
                </li>
              </ul>

              {/* Map placeholder */}
              <div className="mt-10 rounded-2xl bg-neutral-100 h-56 flex items-center justify-center border border-neutral-200">
                <p className="text-neutral-400 text-sm">Map — Coimbatore, TN</p>
              </div>
            </SectionReveal>

            {/* Contact form */}
            <SectionReveal direction="right">
              <ContactForm />
            </SectionReveal>
          </div>
        </div>
      </section>
    </>
  );
}
