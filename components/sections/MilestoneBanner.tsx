import { SectionReveal } from "@/components/SectionReveal";
import Link from "next/link";

export function MilestoneBanner() {
  return (
    <section className="py-20 bg-neutral-900 overflow-hidden relative">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/8 blur-[120px]" />
      </div>

      <div className="container-wide section-padding relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <SectionReveal direction="left" className="max-w-2xl">
            <p className="text-primary text-xs font-semibold tracking-[0.25em] uppercase mb-3">
              Milestone Marked!
            </p>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              9 Years of Unbroken Service
            </h2>
            <p className="text-neutral-400 leading-relaxed">
              Chartered in 2017 and sponsored by the Rotary Club of Coimbatore
              Metropolis, Rotaract Crystals has grown into a dynamic force for
              community impact — fostering collaboration, compassion, and
              innovation across every chapter.
            </p>
          </SectionReveal>

          <SectionReveal direction="right" className="flex-shrink-0">
            <Link
              href="/our-activities"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-semibold text-sm tracking-wide hover:border-primary hover:bg-primary transition-all duration-300"
            >
              See Our Journey
            </Link>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
