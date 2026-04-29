import { TeamCardSkeleton } from "@/components/TeamCard";

export default function TeamLoading() {
  return (
    <div aria-busy="true" aria-label="Loading team">
      {/* Header */}
      <div className="pt-32 pb-16 bg-neutral-50 border-b border-neutral-100">
        <div className="container-wide section-padding space-y-4">
          <div className="skeleton h-3 w-24 rounded-full" />
          <div className="skeleton h-14 w-80 rounded-xl" />
          <div className="skeleton h-4 w-[480px] max-w-full rounded-full" />
        </div>
      </div>

      {/* Leadership */}
      <div className="py-20 bg-white">
        <div className="container-wide section-padding">
          <div className="skeleton h-8 w-48 rounded-xl mb-12" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <TeamCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Members */}
      <div className="py-20 bg-neutral-50 border-t border-neutral-100">
        <div className="container-wide section-padding">
          <div className="skeleton h-8 w-36 rounded-xl mb-12" />
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <TeamCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
