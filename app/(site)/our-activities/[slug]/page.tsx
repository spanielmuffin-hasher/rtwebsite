import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { getEventBySlug, getEventSlugs } from "@/lib/sanity.queries";
import { urlFor } from "@/lib/image";
import { BLUR_HERO, BLUR_CARD } from "@/lib/shimmer";
import { SectionReveal } from "@/components/SectionReveal";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const CATEGORY_LABELS: Record<string, string> = {
  "club-service": "Club Service",
  "community-service": "Community Service",
  "district-priority": "District Priority Projects",
  "international-service": "International Service",
  "professional-service": "Professional Service",
  "rotaract-week": "Rotaract Week Celebration",
};

export async function generateStaticParams() {
  const slugs = await getEventSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return { title: "Event Not Found" };

  const ogImage = event.coverImage
    ? urlFor(event.coverImage).width(1200).height(630).fit("crop").format("webp").url()
    : undefined;

  const formattedDate = event.date
    ? new Date(event.date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : undefined;

  return {
    title: event.title,
    description: formattedDate
      ? `${event.title} — ${CATEGORY_LABELS[event.category] ?? event.category} · ${formattedDate}`
      : event.title,
    openGraph: {
      title: `${event.title} | Rotaract Crystals`,
      description: formattedDate ?? event.title,
      type: "article",
      publishedTime: event.date,
      images: ogImage
        ? [{ url: ogImage, width: 1200, height: 630, alt: event.title }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: event.title,
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function EventSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  const coverUrl = event.coverImage
    ? urlFor(event.coverImage).width(1200).height(600).fit("crop").format("webp").url()
    : null;

  const formattedDate = event.date
    ? new Date(event.date).toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <>
      {/* Cover */}
      {coverUrl && (
        <div className="relative w-full h-[60vh] min-h-[320px] bg-neutral-900 overflow-hidden">
          <Image
            src={coverUrl}
            alt={event.coverImage?.alt ?? event.title}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-80"
            placeholder="blur"
            blurDataURL={BLUR_HERO}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/70 via-neutral-900/20 to-transparent" />
        </div>
      )}

      {/* Article */}
      <article className="bg-white">
        <div className="container-tight section-padding py-14">
          {/* Breadcrumb */}
          <SectionReveal className="flex items-center gap-2 text-xs text-neutral-400 mb-8">
            <Link
              href="/our-activities"
              className="hover:text-primary transition-colors"
            >
              Our Activities
            </Link>
            <span>/</span>
            <span className="text-neutral-600 line-clamp-1">{event.title}</span>
          </SectionReveal>

          {/* Meta badges */}
          <SectionReveal>
            <div className="flex flex-wrap items-center gap-3 mb-5">
              {event.category && (
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                  {CATEGORY_LABELS[event.category] ?? event.category}
                </span>
              )}
              {event.featured && (
                <span className="px-3 py-1 rounded-full bg-primary text-white text-xs font-bold">
                  Featured
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-4">
              {event.title}
            </h1>
            {formattedDate && (
              <p className="text-neutral-400 text-sm">{formattedDate}</p>
            )}
          </SectionReveal>

          {/* Rich text body */}
          {event.description && (
            <SectionReveal
              delay={0.15}
              className="mt-10 prose prose-neutral prose-lg max-w-none
                prose-headings:font-display prose-headings:font-bold
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-strong:text-neutral-900
                prose-blockquote:border-primary prose-blockquote:text-neutral-600"
            >
              <PortableText value={event.description} />
            </SectionReveal>
          )}

          {/* Photo gallery */}
          {event.images && event.images.length > 0 && (
            <SectionReveal delay={0.2} className="mt-14">
              <h2 className="font-display font-bold text-2xl text-neutral-900 mb-6">
                Event Photos
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {event.images.map((img, i) => {
                  const url = urlFor(img)
                    .width(700)
                    .height(500)
                    .fit("crop")
                    .format("webp")
                    .url();
                  return (
                    <div
                      key={i}
                      className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100 group"
                    >
                      <Image
                        src={url}
                        alt={img.alt ?? `${event.title} — photo ${i + 1}`}
                        fill
                        sizes="(max-width: 768px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        placeholder="blur"
                        blurDataURL={BLUR_CARD}
                      />
                      {img.caption && (
                        <div className="absolute inset-0 bg-neutral-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                          <p className="text-white text-xs">{img.caption}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </SectionReveal>
          )}

          {/* Back */}
          <SectionReveal
            delay={0.25}
            className="mt-16 pt-10 border-t border-neutral-100"
          >
            <Link
              href="/our-activities"
              className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all duration-200"
            >
              ← Back to Our Activities
            </Link>
          </SectionReveal>
        </div>
      </article>
    </>
  );
}
