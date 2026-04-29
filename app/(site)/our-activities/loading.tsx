import { EventCardSkeleton } from "@/components/EventCard";

export default function ActivitiesLoading() {
  return (
    <div aria-busy="true" aria-label="Loading activities">
      {/* Header skeleton */}
      <div className="pt-32 pb-16 bg-neutral-50 border-b border-neutral-100">
        <div className="container-wide section-padding space-y-4">
          <div className="skeleton h-3 w-28 rounded-full" />
          <div className="skeleton h-12 w-64 rounded-xl" />
          <div className="skeleton h-4 w-96 max-w-full rounded-full" />
        </div>
      </div>

      {/* Filter bar skeleton */}
      <div className="bg-white border-b border-neutral-100 py-3">
        <div className="container-wide section-padding flex gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton h-8 w-24 rounded-full flex-shrink-0" />
          ))}
        </div>
      </div>

      {/* Grid skeleton */}
      <div className="py-16 bg-white">
        <div className="container-wide section-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <EventCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
