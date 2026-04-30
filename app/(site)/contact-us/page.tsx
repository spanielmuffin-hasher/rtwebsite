import type { Metadata } from "next";
import { SectionReveal } from "@/components/SectionReveal";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Get in touch with Rotaract Club of Coimbatore Crystals — mail us, WhatsApp us, or visit our Instagram page.",
};

const CONTACT_METHODS = [
  {
    title: "Mail Us",
    description: "Drop us an email and we'll respond within 24 hours.",
    value: "raccoimbatorecrystals2526@gmail.com",
    href: "mailto:raccoimbatorecrystals2526@gmail.com",
    icon: "📧",
    cta: "Send Email",
  },
  {
    title: "WhatsApp Us",
    description: "Reach us directly for quick queries or membership info.",
    value: "+91 79046 64543",
    href: "https://wa.me/917904664543",
    icon: "💬",
    cta: "Open WhatsApp",
  },
  {
    title: "Instagram Page",
    description: "Follow us for event updates, photos, and announcements.",
    value: "@rac_cbe_crystals",
    href: "https://instagram.com/rac_cbe_crystals",
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

          {/* Join Us — Google Form */}
          <SectionReveal>
            <div className="rounded-3xl border border-pink-100 bg-gradient-to-br from-pink-50 via-white to-violet-50 p-10 md:p-14 text-center max-w-2xl mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7 text-primary">
                  <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 className="text-3xl font-display font-bold text-neutral-900 mb-3">
                Ready to Join Rotaract Crystals?
              </h2>
              <p className="text-neutral-500 leading-relaxed mb-8 max-w-md mx-auto">
                Take the first step toward a journey of service, leadership, and lifelong fellowship.
                Fill out our membership form and we&apos;ll get back to you soon.
              </p>
              <a
                href="https://forms.gle/UR2uT1AbfPghP5NEA"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-8 py-4 text-base inline-flex items-center gap-2"
              >
                Fill the Membership Form
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <p className="mt-5 text-neutral-400 text-xs">
                Opens in a new tab · Google Form
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
