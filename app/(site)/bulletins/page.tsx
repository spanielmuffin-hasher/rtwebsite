import type { Metadata } from "next";
import Image from "next/image";
import { SectionReveal, StaggerReveal } from "@/components/SectionReveal";
import { getAllBulletins } from "@/lib/sanity.queries";
import { urlFor } from "@/lib/image";

export const metadata: Metadata = {
  title: "Bulletins",
  description:
    "Read and download official bulletins and flipbooks published by Rotaract Club of Coimbatore Crystals.",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });
}

export default async function BulletinsPage() {
  const bulletins = await getAllBulletins();

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 bg-neutral-50 border-b border-neutral-100">
        <div className="container-wide section-padding">
          <SectionReveal>
            <p className="text-primary text-xs font-semibold tracking-[0.25em] uppercase mb-3">
              Bulletins
            </p>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-neutral-900 mb-4">
              Our Bulletins &amp; Flipbooks
            </h1>
            <p className="text-neutral-500 max-w-xl leading-relaxed">
              Official publications from Rotaract Club of Coimbatore Crystals —
              documenting our journey, projects, and milestones.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Bulletins list */}
      <section className="py-20 bg-white">
        <div className="container-wide section-padding">
          {bulletins.length > 0 ? (
            <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bulletins.map((bulletin, i) => (
                <div
                  key={bulletin._id}
                  className="group relative bg-white rounded-3xl border border-neutral-100 p-8 hover:shadow-card-hover hover:border-primary/20 transition-all duration-300"
                >
                  {i === 0 && (
                    <span className="absolute top-6 right-6 z-10 px-3 py-1 rounded-full bg-primary text-white text-[10px] font-bold tracking-widest uppercase">
                      Latest
                    </span>
                  )}

                  {/* Cover image or PDF icon */}
                  {bulletin.coverImage ? (
                    <div className="w-full h-44 rounded-2xl overflow-hidden mb-6 relative">
                      <Image
                        src={urlFor(bulletin.coverImage).width(400).height(220).fit("crop").format("webp").url()}
                        alt={bulletin.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-14 rounded-xl bg-primary/8 flex items-center justify-center mb-6">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="w-6 h-6 text-primary"
                      >
                        <path
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}

                  {bulletin.issue && (
                    <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-1">
                      {bulletin.issue}
                    </p>
                  )}
                  <h3 className="font-display font-bold text-neutral-900 text-lg mb-2 group-hover:text-primary transition-colors duration-200">
                    {bulletin.title}
                  </h3>
                  {bulletin.description && (
                    <p className="text-neutral-500 text-sm leading-relaxed mb-2 line-clamp-2">
                      {bulletin.description}
                    </p>
                  )}
                  <p className="text-neutral-400 text-xs">{formatDate(bulletin.publishedAt)}</p>

                  <div className="mt-6 flex items-center gap-3">
                    {bulletin.pdfUrl ? (
                      <>
                        <a
                          href={bulletin.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary text-xs py-2 px-5"
                        >
                          Read Online
                        </a>
                        <a
                          href={`${bulletin.pdfUrl}?dl=${encodeURIComponent(bulletin.title)}.pdf`}
                          download
                          className="btn-outline text-xs py-2 px-4"
                        >
                          Download
                        </a>
                      </>
                    ) : (
                      <span className="text-neutral-400 text-xs">PDF coming soon</span>
                    )}
                  </div>
                </div>
              ))}
            </StaggerReveal>
          ) : (
            <SectionReveal className="text-center py-20">
              <div className="w-16 h-16 rounded-2xl bg-primary/8 flex items-center justify-center mx-auto mb-5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-primary">
                  <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 className="text-2xl font-display font-bold text-neutral-900 mb-2">No bulletins yet</h2>
              <p className="text-neutral-400 text-sm">Check back soon — bulletins will appear here once published.</p>
            </SectionReveal>
          )}
        </div>
      </section>
    </>
  );
}
