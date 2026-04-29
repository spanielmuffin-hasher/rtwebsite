import { EventCardSkeleton } from "@/components/EventCard";
import { TeamCardSkeleton } from "@/components/TeamCard";

export default function HomeLoading() {
  return (
    <div aria-busy="true" aria-label="Loading page content">
      {/* Hero skeleton */}
      <div className="min-h-[100svh] bg-neutral-900 flex items-center justify-center">
        <div className="text-center space-y-4 px-4">
          <div className="skeleton h-4 w-48 mx-auto rounded-full opacity-30" />
          <div className="skeleton h-16 w-[600px] max-w-full mx-auto rounded-2xl opacity-20" />
          <div className="skeleton h-16 w-[400px] max-w-full mx-auto rounded-2xl opacity-20" />
          <div className="skeleton h-5 w-[480px] max-w-full mx-auto rounded-full opacity-20" />
          <div className="flex justify-center gap-4 mt-6">
            <div className="skeleton h-12 w-44 rounded-full opacity-30" />
            <div className="skeleton h-12 w-40 rounded-full opacity-20" />
          </div>
        </div>
      </div>

      {/* Stats skeleton */}
      <div className="py-24 bg-white">
        <div className="container-wide section-padding">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="skeleton h-28 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>

      {/* Team skeleton */}
      <div className="py-24 bg-neutral-50">
        <div className="container-wide section-padding">
          <div className="skeleton h-8 w-48 rounded-xl mb-12" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <TeamCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Events skeleton */}
      <div className="py-24 bg-white">
        <div className="container-wide section-padding">
          <div className="skeleton h-8 w-40 rounded-xl mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <EventCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
