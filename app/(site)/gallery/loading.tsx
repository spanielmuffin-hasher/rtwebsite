import { GalleryGridSkeleton } from "@/components/GalleryGrid";

export default function GalleryLoading() {
  return (
    <div aria-busy="true" aria-label="Loading gallery">
      {/* Header */}
      <div className="pt-32 pb-16 bg-neutral-50 border-b border-neutral-100">
        <div className="container-wide section-padding space-y-4">
          <div className="skeleton h-3 w-20 rounded-full" />
          <div className="skeleton h-14 w-72 rounded-xl" />
          <div className="skeleton h-4 w-96 max-w-full rounded-full" />
        </div>
      </div>

      {/* Filter bar */}
      <div className="bg-white border-b border-neutral-100 py-3">
        <div className="container-wide section-padding flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="skeleton h-8 w-24 rounded-full flex-shrink-0" />
          ))}
        </div>
      </div>

      {/* Gallery */}
      <div className="py-16 bg-white">
        <div className="container-wide section-padding">
          <GalleryGridSkeleton count={9} />
        </div>
      </div>
    </div>
  );
}
