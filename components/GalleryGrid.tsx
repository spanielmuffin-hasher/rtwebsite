"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
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

// ─── Lightbox ─────────────────────────────────────────────────────────────────

function Lightbox({ photo, onClose }: { photo: FlatPhoto; onClose: () => void }) {
  const imageUrl = photo.image?.asset?._ref
    ? urlFor(photo.image).width(1400).format("webp").quality(90).url()
    : null;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!imageUrl) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[99990] flex items-center justify-center p-4 md:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-neutral-950/92 backdrop-blur-sm" />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
        aria-label="Close"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
          <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
        </svg>
      </button>

      {/* Image container — stop propagation so clicking image doesn't close */}
      <motion.div
        className="relative z-10 max-w-5xl w-full max-h-[88vh] rounded-2xl overflow-hidden"
        initial={{ scale: 0.93, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={imageUrl}
          alt={photo.image?.alt ?? photo.caption ?? "Gallery photo"}
          width={1400}
          height={900}
          className="w-full h-auto max-h-[88vh] object-contain"
          priority
        />
        {photo.caption && (
          <div className="absolute bottom-0 left-0 right-0 px-5 py-3 bg-gradient-to-t from-black/70 to-transparent">
            <p className="text-white text-sm font-medium">{photo.caption}</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

// ─── Masonry grid ─────────────────────────────────────────────────────────────
export function GalleryGrid({ images }: GalleryGridProps) {
  const prefersReduced = useReducedMotion();
  const photos = flattenAlbums(images);
  const [lightboxPhoto, setLightboxPhoto] = useState<FlatPhoto | null>(null);
  const openLightbox = useCallback((p: FlatPhoto) => setLightboxPhoto(p), []);
  const closeLightbox = useCallback(() => setLightboxPhoto(null), []);

  if (!photos.length) {
    return (
      <p className="text-neutral-400 text-center py-16">
        No images yet. Check back soon.
      </p>
    );
  }

  return (
    <>
      <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
        {photos.map((photo, i) => (
          <PhotoTile
            key={photo.key}
            photo={photo}
            index={i}
            prefersReduced={!!prefersReduced}
            onClick={openLightbox}
          />
        ))}
      </div>

      <AnimatePresence>
        {lightboxPhoto && (
          <Lightbox photo={lightboxPhoto} onClose={closeLightbox} />
        )}
      </AnimatePresence>
    </>
  );
}

function PhotoTile({
  photo,
  index,
  prefersReduced,
  onClick,
}: {
  photo: FlatPhoto;
  index: number;
  prefersReduced: boolean;
  onClick: (p: FlatPhoto) => void;
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
      onClick={() => onClick(photo)}
    >
      <Image
        src={imageUrl}
        alt={photo.image?.alt ?? photo.caption ?? "Gallery photo"}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105 will-change-transform"
      />

      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-transparent flex items-end p-3"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.22 }}
      >
        <p className="text-white text-xs font-medium leading-snug line-clamp-2">
          {photo.caption}
        </p>
      </motion.div>

      {/* Zoom icon hint */}
      <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-3.5 h-3.5">
          <path d="M15 3h6m0 0v6m0-6l-7 7M9 21H3m0 0v-6m0 6l7-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
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
            ? urlFor(photo.image).width(700).height(500).fit("crop").format("webp").url()
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
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.04 }}
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
