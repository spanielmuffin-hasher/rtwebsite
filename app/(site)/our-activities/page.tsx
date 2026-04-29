import type { Metadata } from "next";
import { getAllEvents, getEventsByCategory } from "@/lib/sanity.queries";
import { EventCard } from "@/components/EventCard";
import { SectionReveal, StaggerReveal } from "@/components/SectionReveal";

export const metadata: Metadata = {
  title: "Our Activities",
  description:
    "Explore all events and projects by Rotaract Club of Coimbatore Crystals across Club Service, Community Service, Professional Service, and more.",
};

const CATEGORIES = [
  { value: "", label: "All Activities" },
  { value: "club-service", label: "Club Service" },
  { value: "community-service", label: "Community Service" },
  { value: "professional-service", label: "Professional Service" },
  { value: "international-service", label: "International Service" },
  { value: "district-priority", label: "District Priority Projects" },
];

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function OurActivitiesPage({ searchParams }: PageProps) {
  const { category } = await searchParams;
  const activeCategory = category ?? "";

  const events = activeCategory
    ? await getEventsByCategory(activeCategory)
    : await getAllEvents();

  return (
    <>
      {/* Page header */}
      <section className="pt-32 pb-16 bg-neutral-50 border-b border-neutral-100">
        <div className="container-wide section-padding">
          <SectionReveal>
            <p className="text-primary text-xs font-semibold tracking-[0.25em] uppercase mb-3">
              Our Activities
            </p>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-neutral-900 mb-4">
              What We Do
            </h1>
            <p className="text-neutral-500 max-w-xl leading-relaxed">
              From community outreach to professional development — browse all
              our events and projects.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Category filter */}
      <section className="sticky top-[4.5rem] z-30 bg-white border-b border-neutral-100">
        <div className="container-wide section-padding">
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <a
                key={cat.value}
                href={cat.value ? `/our-activities?category=${cat.value}` : "/our-activities"}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                  activeCategory === cat.value
                    ? "bg-primary text-white shadow-sm"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                {cat.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Events grid */}
      <section className="py-16 bg-white">
        <div className="container-wide section-padding">
          {events.length === 0 ? (
            <SectionReveal className="text-center py-20">
              <p className="text-neutral-400 text-lg">
                No activities found{activeCategory ? " in this category" : ""}.
              </p>
              {activeCategory && (
                <a
                  href="/our-activities"
                  className="mt-4 inline-block text-primary font-semibold hover:underline"
                >
                  View all activities
                </a>
              )}
            </SectionReveal>
          ) : (
            <>
              <SectionReveal className="mb-8">
                <p className="text-neutral-400 text-sm">
                  {events.length} {events.length === 1 ? "activity" : "activities"}
                  {activeCategory
                    ? ` in ${CATEGORIES.find((c) => c.value === activeCategory)?.label ?? activeCategory}`
                    : ""}
                </p>
              </SectionReveal>

              <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event, i) => (
                  <EventCard key={event._id} event={event} priority={i < 3} />
                ))}
              </StaggerReveal>
            </>
          )}
        </div>
      </section>
    </>
  );
}
