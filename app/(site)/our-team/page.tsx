import type { Metadata } from "next";
import { getTeamMembers } from "@/lib/sanity.queries";
import { TeamCard } from "@/components/TeamCard";
import { SectionReveal, StaggerReveal } from "@/components/SectionReveal";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the dedicated members and leadership board of Rotaract Club of Coimbatore Crystals.",
};

export default async function OurTeamPage() {
  const team = await getTeamMembers();

  const leadership = team.filter((m) => m.isLeadership);
  const members = team.filter((m) => !m.isLeadership);

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 bg-neutral-50 border-b border-neutral-100">
        <div className="container-wide section-padding">
          <SectionReveal>
            <p className="text-primary text-xs font-semibold tracking-[0.25em] uppercase mb-3">
              Our Team
            </p>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-neutral-900 mb-4">
              The People Behind the Purpose
            </h1>
            <p className="text-neutral-500 max-w-xl leading-relaxed">
              Our club is powered by passionate young leaders who give their
              time, skills, and heart to serve the community.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Leadership board */}
      {leadership.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container-wide section-padding">
            <SectionReveal className="mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900">
                Leadership Board
              </h2>
            </SectionReveal>

            <StaggerReveal className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {leadership.map((member) => (
                <TeamCard key={member._id} member={member} />
              ))}
            </StaggerReveal>
          </div>
        </section>
      )}

      {/* All members */}
      {members.length > 0 && (
        <section className="py-20 bg-neutral-50 border-t border-neutral-100">
          <div className="container-wide section-padding">
            <SectionReveal className="mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900">
                Club Members
              </h2>
            </SectionReveal>

            <StaggerReveal className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {members.map((member) => (
                <TeamCard key={member._id} member={member} />
              ))}
            </StaggerReveal>
          </div>
        </section>
      )}

      {team.length === 0 && (
        <section className="py-32 bg-white">
          <div className="container-wide section-padding text-center">
            <SectionReveal>
              <p className="text-neutral-400 text-lg">
                Team profiles will appear here once added via the CMS.
              </p>
            </SectionReveal>
          </div>
        </section>
      )}
    </>
  );
}
