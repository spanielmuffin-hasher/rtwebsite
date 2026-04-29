import type { Metadata } from "next";
import { getGalleryImages, getGalleryByCategory } from "@/lib/sanity.queries";
import { GalleryGrid } from "@/components/GalleryGrid";
import { SectionReveal } from "@/components/SectionReveal";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A visual archive of Rotaract Club of Coimbatore Crystals — events, community service, and moments of fellowship.",
};

const CATEGORIES = [
  { value: "", label: "All Photos" },
  { value: "projects", label: "Projects" },
  { value: "awards", label: "Awards & Recognition" },
];

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function GalleryPage({ searchParams }: PageProps) {
  const { category } = await searchParams;
  const activeCategory = category ?? "";

  const images = activeCategory
    ? await getGalleryByCategory(activeCategory)
    : await getGalleryImages();

  return (
    <>
      {/* Header */}
      <section className="pt-24 md:pt-32 pb-10 md:pb-16 bg-neutral-50 border-b border-neutral-100">
        <div className="container-wide section-padding">
          <SectionReveal>
            <p className="text-primary text-xs font-semibold tracking-[0.25em] uppercase mb-3">
              Gallery
            </p>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-neutral-900 mb-4">
              Moments That Define Us
            </h1>
            <p className="text-neutral-500 max-w-xl leading-relaxed">
              Every photograph tells a story of service, fellowship, and impact.
              Browse our visual archive.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Category filter */}
      <section className="sticky top-[4.5rem] z-30 bg-white border-b border-neutral-100">
        <div className="container-wide section-padding">
          <div className="flex gap-2 overflow-x-auto py-3">
            {CATEGORIES.map((cat) => (
              <a
                key={cat.value}
                href={cat.value ? `/gallery?category=${cat.value}` : "/gallery"}
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

      {/* Gallery */}
      <section className="py-16 bg-white">
        <div className="container-wide section-padding">
          {images.length === 0 ? (
            <SectionReveal className="text-center py-20">
              <p className="text-neutral-400 text-lg">
                No photos yet{activeCategory ? " in this category" : ""}.
              </p>
            </SectionReveal>
          ) : (
            <>
              <SectionReveal className="mb-8">
                <p className="text-neutral-400 text-sm">
                  {images.reduce((sum, album) => sum + (album.images?.length ?? 0), 0)} photos
                </p>
              </SectionReveal>
              <GalleryGrid images={images} />
            </>
          )}
        </div>
      </section>
    </>
  );
}
