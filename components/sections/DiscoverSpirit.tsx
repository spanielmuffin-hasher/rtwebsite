import Link from "next/link";
import { SectionReveal, StaggerReveal } from "@/components/SectionReveal";

const AVENUES = [
  {
    title: "Club Service",
    description: "Building a strong, active, and welcoming club community.",
    icon: "🤝",
  },
  {
    title: "Community Service",
    description: "Driving impact through local initiatives that transform lives.",
    icon: "🌍",
  },
  {
    title: "Professional Service",
    description: "Developing careers and skills through mentorship and workshops.",
    icon: "💼",
  },
  {
    title: "International Service",
    description: "Fostering global connections and cross-cultural understanding.",
    icon: "✈️",
  },
];

export function DiscoverSpirit() {
  return (
    <section className="py-24 bg-white">
      <div className="container-wide section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — text */}
          <div>
            <SectionReveal direction="left">
              <p className="text-primary text-xs font-semibold tracking-[0.25em] uppercase mb-3">
                Discover Your Rotaract Spirit
              </p>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-5">
                Four Avenues. One Mission.
              </h2>
              <p className="text-neutral-500 leading-relaxed mb-8">
                Rotaract is built on four avenues of service — each offering
                unique ways to grow, contribute, and connect. Find the one that
                resonates with you and dive in.
              </p>
              <Link href="/contact-us" className="btn-primary">
                Join Rotaract Crystals
              </Link>
            </SectionReveal>
          </div>

          {/* Right — avenue cards */}
          <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {AVENUES.map((avenue) => (
              <div
                key={avenue.title}
                className="p-6 rounded-2xl border border-neutral-100 bg-neutral-50 hover:border-primary/30 hover:bg-primary/3 hover:shadow-card transition-all duration-300 group"
              >
                <span className="text-3xl mb-4 block">{avenue.icon}</span>
                <h3 className="font-display font-bold text-neutral-900 text-base mb-2 group-hover:text-primary transition-colors duration-200">
                  {avenue.title}
                </h3>
                <p className="text-neutral-500 text-sm leading-relaxed">
                  {avenue.description}
                </p>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </div>
    </section>
  );
}
