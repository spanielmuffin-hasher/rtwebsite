import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { SectionReveal, StaggerReveal } from "@/components/SectionReveal";
import { EventCard } from "@/components/EventCard";
import { TeamCard } from "@/components/TeamCard";
import { HorizontalGallery } from "@/components/GalleryGrid";
import { SupportCauses } from "@/components/sections/SupportCauses";
import { FAQ } from "@/components/sections/FAQ";
import { OfficialMessages } from "@/components/sections/OfficialMessages";
import { OurProjects } from "@/components/sections/OurProjects";
import { MilestoneBanner } from "@/components/sections/MilestoneBanner";
import { Testimonials } from "@/components/sections/Testimonials";
import { DiscoverSpirit } from "@/components/sections/DiscoverSpirit";
import { GSAPHomeAnimations } from "@/components/sections/GSAPHomeAnimations";
import { ParallaxBg } from "@/components/ParallaxSection";
import { FloatingOrbs } from "@/components/FloatingOrbs";
import {
  getFeaturedEvents,
  getLeadershipTeam,
  getFeaturedGallery,
} from "@/lib/sanity.queries";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Rotaract Club of Coimbatore Crystals — a youth-led service organisation under Rotary International District 3206 committed to community impact, leadership, and fellowship since 1997.",
  openGraph: {
    title: "Rotaract Club of Coimbatore Crystals",
    description:
      "Youth-led service organisation committed to community impact, professional growth, and lifelong fellowship. Est. 1997.",
    type: "website",
  },
};

export default async function HomePage() {
  const [events, team, gallery] = await Promise.all([
    getFeaturedEvents(),
    getLeadershipTeam(),
    getFeaturedGallery(),
  ]);

  return (
    <>
      {/* GSAP scroll timeline animations — client island */}
      <GSAPHomeAnimations />

      {/* ── Hero ──────────────────────────────────────────────── */}
      <Hero
        eyebrow="Rotaract Club of Coimbatore Crystals · RID 3206"
        title="Creating Fellowship Through Service"
        subtitle="A dynamic network of young leaders committed to service, growth, and lifelong connections."
        cta={{ label: "Join Rotaract Crystals", href: "/contact-us" }}
        ctaSecondary={{ label: "Our Activities", href: "/our-activities" }}
      />

      {/* ── Announcements & Updates ───────────────────────────── */}
      <section className="py-14 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #fdf2f8 0%, #f5f3ff 100%)" }}>
        <FloatingOrbs variant="section" />
        <div className="container-wide section-padding relative z-10">
          <SectionReveal className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <span className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-white text-xs font-bold tracking-widest uppercase shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Announcements &amp; Updates
            </span>
            <p className="text-slate-600 text-sm">
              Stay tuned for upcoming projects, events, and district-level
              activities. Follow us on social media for real-time updates.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ── Serving Since ─────────────────────────────────────── */}
      <section id="home-about" className="py-28 bg-white overflow-hidden relative">
        <FloatingOrbs variant="pink" />
        <div className="container-wide section-padding relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div id="home-about-text">
              <SectionReveal direction="left">
                <p className="text-primary text-xs font-semibold tracking-[0.25em] uppercase mb-3">
                  Serving Since 2017
                </p>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-5 leading-tight">
                  Built on Purpose,
                  <br />
                  <span className="text-gradient">Driven by People</span>
                </h2>
                <p className="text-slate-500 leading-relaxed mb-6">
                  The Rotaract Club of Coimbatore Crystals, chartered in 2017 and
                  sponsored by the Rotary Club of Coimbatore Metropolis, is a
                  dynamic community-based club dedicated to service, fellowship,
                  and leadership. Over the past nine years, the club has
                  successfully organised impactful initiatives such as
                  Magizhvithu Maghil, Rotarun, Operation Bark Boost, Words for
                  Warriors, and Make a Wish — reflecting its commitment to
                  community development and social responsibility. Known for
                  fostering collaboration, compassion, and innovation, the club
                  continues to empower individuals and create meaningful change.
                </p>
                <Link href="/our-team" className="btn-outline">
                  Meet the Team
                </Link>
              </SectionReveal>
            </div>

            <SectionReveal direction="right" className="relative">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { number: "2017", label: "Founded", gradient: "from-pink-50 to-rose-50", border: "border-pink-100" },
                  { number: "RID 3206", label: "District", gradient: "from-violet-50 to-purple-50", border: "border-violet-100" },
                  { number: "9+", label: "Years of Service", gradient: "from-amber-50 to-yellow-50", border: "border-amber-100" },
                  { number: "CBE", label: "Coimbatore", gradient: "from-pink-50 to-fuchsia-50", border: "border-pink-100" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`home-stat-card bg-gradient-to-br ${item.gradient} rounded-2xl p-6 border ${item.border} hover:shadow-card-hover transition-all duration-300 gradient-border`}
                    style={{ opacity: 0 }}
                  >
                    <p className="font-display font-bold text-2xl text-slate-900 mb-1">
                      {item.number}
                    </p>
                    <p className="text-slate-400 text-xs uppercase tracking-widest">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Leadership Team ───────────────────────────────────── */}
      {team.length > 0 && (
        <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #fdf2f8 0%, #f5f3ff 100%)" }}>
          <FloatingOrbs variant="violet" />
          <div className="container-wide section-padding relative z-10">
            <SectionReveal className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-5 mb-12">
              <div>
                <p className="text-primary text-xs font-semibold tracking-[0.25em] uppercase mb-3">
                  Leadership Team
                </p>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900">
                  Meet the Board
                </h2>
              </div>
              <Link href="/our-team" className="btn-outline flex-shrink-0">
                View Full Team
              </Link>
            </SectionReveal>

            <StaggerReveal className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {team.slice(0, 4).map((member) => (
                <TeamCard key={member._id} member={member} />
              ))}
            </StaggerReveal>
          </div>
        </section>
      )}

      {/* ── Discover Your Rotaract Spirit ─────────────────────── */}
      <DiscoverSpirit />


      {/* ── Support Our Causes ────────────────────────────────── */}
      <SupportCauses />

      {/* ── Frequently Asked Questions ────────────────────────── */}
      <FAQ />

      {/* ── Our Events Gallery ────────────────────────────────── */}
      {gallery.length > 0 && (
        <section className="pt-24 bg-white overflow-hidden relative">
          <FloatingOrbs variant="section" />
          <div className="container-wide section-padding mb-6 relative z-10">
            <SectionReveal className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-5">
              <div>
                <p className="text-primary text-xs font-semibold tracking-[0.25em] uppercase mb-3">
                  Our Events Gallery
                </p>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900">
                  Moments That Matter
                </h2>
              </div>
              <Link href="/gallery" className="btn-outline flex-shrink-0">
                Full Gallery
              </Link>
            </SectionReveal>
          </div>
          <HorizontalGallery images={gallery} />
        </section>
      )}

      {/* ── Message from Club Officials ───────────────────────── */}
      <OfficialMessages />

      {/* ── Our Projects ──────────────────────────────────────── */}
      <OurProjects />

      {/* ── Milestone Marked! ─────────────────────────────────── */}
      <MilestoneBanner />

      {/* ── Our Bulletins & Flipbooks ─────────────────────────── */}
      <section className="py-24 bg-white relative overflow-hidden">
        <FloatingOrbs variant="warm" />
        <div className="container-wide section-padding relative z-10">
          <SectionReveal className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-5 mb-12">
            <div>
              <p className="text-primary text-xs font-semibold tracking-[0.25em] uppercase mb-3">
                Our Bulletins &amp; Flipbooks
              </p>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900">
                Club Publications
              </h2>
            </div>
            <Link href="/bulletins" className="btn-outline flex-shrink-0">
              All Bulletins
            </Link>
          </SectionReveal>

          <SectionReveal>
            <div className="rounded-3xl border border-pink-100 p-12 text-center" style={{ background: "linear-gradient(135deg, #fdf2f8 0%, #f5f3ff 100%)" }}>
              <p className="text-slate-500 text-sm">
                Bulletin issues are published periodically. Visit the{" "}
                <Link href="/bulletins" className="text-primary font-semibold hover:underline">
                  Bulletins page
                </Link>{" "}
                to read and download all editions.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── Reviews & Testimonials ────────────────────────────── */}
      <Testimonials />

      {/* ── Recent Events ─────────────────────────────────────── */}
      {events.length > 0 && (
        <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #fdf2f8 0%, #ffffff 100%)" }}>
          <FloatingOrbs variant="cool" />
          <div className="container-wide section-padding relative z-10">
            <SectionReveal className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-5 mb-12">
              <div>
                <p className="text-primary text-xs font-semibold tracking-[0.25em] uppercase mb-3">
                  Our Activities
                </p>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900">
                  Recent Events
                </h2>
              </div>
              <Link href="/our-activities" className="btn-outline flex-shrink-0">
                View All
              </Link>
            </SectionReveal>

            <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.slice(0, 3).map((event, i) => (
                <EventCard key={event._id} event={event} priority={i === 0} />
              ))}
            </StaggerReveal>
          </div>
        </section>
      )}

      {/* ── Connect With Us ───────────────────────────────────── */}
      <section className="py-28 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #fdf2f8 0%, #f5f3ff 50%, #fce7f3 100%)" }}>
        <FloatingOrbs variant="hero" />
        <div className="container-wide section-padding relative z-10">
          <SectionReveal className="text-center max-w-2xl mx-auto">
            <p className="text-primary text-xs font-semibold tracking-[0.25em] uppercase mb-3">
              Connect With Us
            </p>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-5">
              Be Part of Something{" "}
              <span className="text-gradient">Bigger</span>
            </h2>
            <p className="text-slate-500 leading-relaxed mb-10">
              Whether you want to join, collaborate, or simply learn more about
              Rotaract Crystals — we&apos;d love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact-us" className="btn-primary px-8 py-4 text-base">
                Get in Touch
              </Link>
              <Link href="/our-activities" className="btn-outline px-8 py-4 text-base">
                Explore Activities
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
