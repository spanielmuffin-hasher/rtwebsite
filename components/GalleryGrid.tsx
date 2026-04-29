"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { urlFor } from "@/lib/image";
import { BLUR_GALLERY } from "@/lib/shimmer";
import type { GalleryImage, SanityImage } from "@/types";

gsap.registerPlugin(ScrollTrigger);

// ─── Flatten albums → individual photo tiles ──────────────────────────────────

interface FlatPhoto {
  key: string;
  image: SanityImage & { _key?: string };
  caption: string;
}

function flattenAlbums(albums: GalleryImage[]): FlatPhoto[] {
  return albums.flatMap((album) =>
    (album.images ?? []).map((img, i) => ({
      key: `${album._id}-${img._key ?? i}`,
      image: img,
      caption: album.caption ?? album.title,
    }))
  );
}

interface GalleryGridProps {
  images: GalleryImage[];
}

// ─── Masonry grid ─────────────────────────────────────────────────────────────
export function GalleryGrid({ images }: GalleryGridProps) {
  const prefersReduced = useReducedMotion();
  const photos = flattenAlbums(images);

  if (!photos.length) {
    return (
      <p className="text-neutral-400 text-center py-16">
        No images yet. Check back soon.
      </p>
    );
  }

  return (
    <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
      {photos.map((photo, i) => (
        <PhotoTile
          key={photo.key}
          photo={photo}
          index={i}
          prefersReduced={!!prefersReduced}
        />
      ))}
    </div>
  );
}

function PhotoTile({
  photo,
  index,
  prefersReduced,
}: {
  photo: FlatPhoto;
  index: number;
  prefersReduced: boolean;
}) {
  const imageUrl = photo.image?.asset?._ref
    ? urlFor(photo.image).width(500).format("webp").url()
    : null;

  if (!imageUrl) return null;

  return (
    <motion.div
      className="group relative break-inside-avoid rounded-2xl overflow-hidden bg-neutral-100 cursor-zoom-in h-48"
      initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
        delay: prefersReduced ? 0 : (index % 9) * 0.06,
      }}
    >
      <Image
        src={imageUrl}
        alt={photo.image?.alt ?? photo.caption ?? "Gallery photo"}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105 will-change-transform"
      />

      {/* Caption reveal on hover */}
      {photo.caption && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-transparent flex items-end p-4"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.28 }}
        >
          <motion.p
            className="text-white text-sm font-medium leading-snug"
            initial={{ y: 12, opacity: 0 }}
            whileHover={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.04 }}
          >
            {photo.caption}
          </motion.p>
        </motion.div>
      )}
    </motion.div>
  );
}

// ─── Horizontal scroll gallery — GSAP-pinned ─────────────────────────────────
export function HorizontalGallery({ images }: GalleryGridProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const photos = flattenAlbums(images);

  useEffect(() => {
    if (prefersReduced || !wrapperRef.current || !trackRef.current) return;

    const wrapper = wrapperRef.current;
    const track = trackRef.current;

    const getScrollAmount = () => -(track.scrollWidth - wrapper.offsetWidth);

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: () => `+=${Math.abs(getScrollAmount())}`,
          pin: true,
          scrub: 1.1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, wrapper);

    return () => ctx.revert();
  }, [photos, prefersReduced]);

  if (!photos.length) return null;

  // Reduced-motion fallback
  if (prefersReduced) {
    return (
      <div className="flex gap-4 overflow-x-auto pb-4 px-[5vw]">
        {photos.slice(0, 10).map((photo) => {
          const url = photo.image?.asset?._ref
            ? urlFor(photo.image).width(600).height(400).fit("crop").format("webp").url()
            : null;
          if (!url) return null;
          return (
            <div key={photo.key} className="flex-shrink-0 w-72 h-52 rounded-2xl overflow-hidden">
              <Image
                src={url}
                alt={photo.image?.alt ?? photo.caption ?? "Gallery"}
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div
      ref={wrapperRef}
      className="relative overflow-hidden"
      style={{ height: "100vh" }}
    >
      <motion.div
        className="absolute top-6 right-8 z-20 text-neutral-400 text-xs tracking-widest uppercase flex items-center gap-2"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <span>Scroll to explore</span>
        <span>→</span>
      </motion.div>

      <div
        ref={trackRef}
        className="absolute top-0 left-0 flex items-center gap-6 will-change-transform h-full pl-[5vw] pr-[5vw]"
      >
        {photos.map((photo, i) => {
          const url = photo.image?.asset?._ref
            ? urlFor(photo.image)
                .width(700)
                .height(500)
                .fit("crop")
                .format("webp")
                .url()
            : null;
          if (!url) return null;

          const heights = ["70%", "82%", "60%", "75%", "88%"];
          const cardH = heights[i % heights.length];
          const cardW = i % 3 === 1 ? "24rem" : i % 3 === 2 ? "17rem" : "20rem";

          return (
            <motion.div
              key={photo.key}
              className="group relative flex-shrink-0 rounded-2xl overflow-hidden"
              style={{ width: cardW, height: cardH }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 0.04,
              }}
            >
              <Image
                src={url}
                alt={photo.image?.alt ?? photo.caption ?? `Gallery ${i + 1}`}
                fill
                sizes="(max-width: 1024px) 80vw, 24rem"
                className="object-cover transition-transform duration-700 group-hover:scale-105 will-change-transform"
                placeholder="blur"
                blurDataURL={BLUR_GALLERY}
              />

              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-neutral-900/75 via-neutral-900/10 to-transparent"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.28 }}
              >
                {photo.caption && (
                  <motion.p
                    className="absolute bottom-4 left-4 right-4 text-white text-sm font-medium"
                    initial={{ y: 14, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.04 }}
                  >
                    {photo.caption}
                  </motion.p>
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Skeleton loader ──────────────────────────────────────────────────────────
export function GalleryGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="skeleton break-inside-avoid rounded-2xl"
          style={{ height: `${180 + (i % 3) * 60}px` }}
        />
      ))}
    </div>
  );
}
