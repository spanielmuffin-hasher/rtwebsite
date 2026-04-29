import type { Metadata } from "next";
import { SectionReveal, StaggerReveal } from "@/components/SectionReveal";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Members Space",
  description:
    "Exclusive resources, updates, and tools for active members of Rotaract Club of Coimbatore Crystals.",
};

const RESOURCES = [
  {
    title: "Member Handbook",
    description:
      "Complete guide to Rotaract Crystals — our constitution, meeting procedures, and club policies.",
    icon: "📋",
  },
  {
    title: "Project Toolkit",
    description:
      "Templates, checklists, and planning frameworks for running successful service projects.",
    icon: "🛠️",
  },
  {
    title: "Training Materials",
    description:
      "Workshop slides, leadership training decks, and district-level learning resources.",
    icon: "📚",
  },
  {
    title: "Meeting Minutes",
    description:
      "Archive of board meeting notes and general body meeting records from current year.",
    icon: "📝",
  },
  {
    title: "Club Calendar",
    description:
      "Full schedule of upcoming meetings, events, district functions, and key deadlines.",
    icon: "📅",
  },
  {
    title: "Photo Archive",
    description:
      "High-resolution event photo archive for members to download and use for reports.",
    icon: "🖼️",
  },
];

export default function MembersSpacePage() {
  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 bg-neutral-900 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[100px]" />
        </div>
        <div className="container-wide section-padding relative z-10">
          <SectionReveal>
            <p className="text-primary text-xs font-semibold tracking-[0.25em] uppercase mb-3">
              Members Space
            </p>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-4">
              Welcome, Crystals Member
            </h1>
            <p className="text-neutral-400 max-w-xl leading-relaxed">
              Access exclusive resources, updates, and tools available only to
              active members of Rotaract Club of Coimbatore Crystals.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Access notice */}
      <section className="py-10 bg-primary/5 border-b border-primary/10">
        <div className="container-wide section-padding">
          <SectionReveal className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <span className="text-2xl flex-shrink-0">🔒</span>
            <p className="text-neutral-700 text-sm leading-relaxed">
              Some resources in this section are restricted to verified members.
              If you need access, please contact the club secretary or reach out
              via the{" "}
              <Link href="/contact-us" className="text-primary font-semibold hover:underline">
                Contact page
              </Link>
              .
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Resources */}
      <section className="py-20 bg-white">
        <div className="container-wide section-padding">
          <SectionReveal className="mb-12">
            <h2 className="text-3xl font-display font-bold text-neutral-900">
              Member Resources
            </h2>
          </SectionReveal>

          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {RESOURCES.map((resource) => (
              <div
                key={resource.title}
                className="group p-7 rounded-3xl border border-neutral-100 bg-neutral-50 hover:border-primary/20 hover:shadow-card transition-all duration-300 cursor-pointer"
              >
                <span className="text-3xl mb-5 block">{resource.icon}</span>
                <h3 className="font-display font-bold text-neutral-900 text-base mb-2 group-hover:text-primary transition-colors duration-200">
                  {resource.title}
                </h3>
                <p className="text-neutral-500 text-sm leading-relaxed">
                  {resource.description}
                </p>
                <p className="mt-4 text-primary text-xs font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Access resource →
                </p>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* Not a member CTA */}
      <section className="py-20 bg-neutral-50 border-t border-neutral-100">
        <div className="container-wide section-padding">
          <SectionReveal className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold text-neutral-900 mb-4">
              Not a Member Yet?
            </h2>
            <p className="text-neutral-500 leading-relaxed mb-8">
              Join Rotaract Club of Coimbatore Crystals to unlock access to
              all member resources, events, and our growing community.
            </p>
            <Link href="/contact-us" className="btn-primary px-8 py-4 text-base">
              Apply for Membership
            </Link>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
