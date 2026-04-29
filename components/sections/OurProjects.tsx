import Image from "next/image";
import Link from "next/link";
import { SectionReveal, StaggerReveal } from "@/components/SectionReveal";
import { urlFor } from "@/lib/image";
import type { EventListItem } from "@/types";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function categoryLabel(cat: string) {
  return cat
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

interface OurProjectsProps {
  events: EventListItem[];
}

export function OurProjects({ events }: OurProjectsProps) {
  return (
    <section className="py-24 bg-white">
      <div className="container-wide section-padding">
        <SectionReveal className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-5">
            Crystals in Action
          </h2>
          <p className="text-neutral-500 max-w-xl mx-auto leading-relaxed">
            Driven by service, united by purpose — creating change that truly matters.
          </p>
        </SectionReveal>

        {events.length > 0 ? (
          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.slice(0, 6).map((event) => {
              const imageUrl = event.coverImage?.asset?._ref
                ? urlFor(event.coverImage).width(600).height(380).fit("crop").format("webp").url()
                : null;

              return (
                <Link
                  key={event._id}
                  href={`/our-activities/${event.slug.current}`}
                  className="group flex flex-col rounded-3xl border border-neutral-100 overflow-hidden hover:border-primary/20 hover:shadow-card-hover transition-all duration-300"
                >
                  {/* Cover image */}
                  <div className="relative w-full h-52 bg-neutral-100 flex-shrink-0">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary/5">
                        <span className="text-primary/30 text-4xl font-display font-bold">
                          {event.title.charAt(0)}
                        </span>
                      </div>
                    )}
                    {/* Category badge */}
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-primary text-[10px] font-bold tracking-widest uppercase">
                      {categoryLabel(event.category)}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-6">
                    <p className="text-neutral-400 text-xs mb-2">{formatDate(event.date)}</p>
                    <h3 className="font-display font-bold text-neutral-900 text-lg mb-3 group-hover:text-primary transition-colors duration-200 leading-snug">
                      {event.title}
                    </h3>
                    {event.excerpt && (
                      <p className="text-neutral-500 text-sm leading-relaxed line-clamp-3 flex-1">
                        {event.excerpt}
                      </p>
                    )}
                    <span className="mt-4 inline-flex items-center gap-1 text-primary text-xs font-semibold tracking-wide">
                      Read more <span>→</span>
                    </span>
                  </div>
                </Link>
              );
            })}
          </StaggerReveal>
        ) : (
          <SectionReveal className="text-center py-12">
            <p className="text-neutral-400 text-sm">
              Events will appear here once added in the admin panel.
            </p>
          </SectionReveal>
        )}

        <SectionReveal className="text-center mt-12">
          <Link href="/our-activities" className="btn-outline">
            View All Activities
          </Link>
        </SectionReveal>
      </div>
    </section>
  );
}
