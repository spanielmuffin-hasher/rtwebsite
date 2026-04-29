"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { urlFor } from "@/lib/image";
import { BLUR_CARD } from "@/lib/shimmer";
import type { EventListItem } from "@/types";

const CATEGORY_LABELS: Record<string, string> = {
  "club-service": "Club Service",
  "community-service": "Community Service",
  "district-priority": "District Priority",
  "international-service": "International Service",
  "professional-service": "Professional Service",
};

interface EventCardProps {
  event: EventListItem;
  priority?: boolean;
}

export function EventCard({ event, priority = false }: EventCardProps) {
  const prefersReduced = useReducedMotion();

  const imageUrl = event.coverImage
    ? urlFor(event.coverImage).width(600).height(400).fit("crop").format("webp").url()
    : null;

  const formattedDate = event.date
    ? new Date(event.date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <motion.article
      className="group relative bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-500"
      whileHover={prefersReduced ? {} : { y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <Link href={`/our-activities/${event.slug.current}`} className="block">
        {/* Image */}
        <div className="relative w-full aspect-[3/2] overflow-hidden bg-neutral-100">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={event.coverImage?.alt ?? event.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105 will-change-transform"
              priority={priority}
              placeholder="blur"
              blurDataURL={BLUR_CARD}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
              <span className="text-primary/30 text-5xl font-display font-bold">R</span>
            </div>
          )}

          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 bg-primary/80 flex items-end p-6"
            initial={{ opacity: 0 }}
            whileHover={prefersReduced ? {} : { opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.p
              className="text-white text-sm font-medium"
              initial={{ y: 16, opacity: 0 }}
              whileHover={prefersReduced ? {} : { y: 0, opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.05 }}
            >
              View event details →
            </motion.p>
          </motion.div>

          {/* Category pill */}
          {event.category && (
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-neutral-700 text-xs font-semibold">
                {CATEGORY_LABELS[event.category] ?? event.category}
              </span>
            </div>
          )}

          {event.featured && (
            <div className="absolute top-4 right-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary text-white text-xs font-bold">
                Featured
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {formattedDate && (
            <p className="text-primary text-xs font-semibold tracking-wide uppercase mb-2">
              {formattedDate}
            </p>
          )}
          <h3 className="font-display font-bold text-neutral-900 text-lg leading-snug group-hover:text-primary transition-colors duration-200 line-clamp-2">
            {event.title}
          </h3>
          <div className="mt-4 flex items-center gap-1 text-primary text-sm font-semibold">
            <span>Read more</span>
            <motion.span
              className="inline-block"
              initial={{ x: 0 }}
              whileHover={prefersReduced ? {} : { x: 4 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              →
            </motion.span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export function EventCardSkeleton() {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-card" aria-hidden>
      <div className="skeleton w-full aspect-[3/2]" />
      <div className="p-6 space-y-3">
        <div className="skeleton h-3 w-24 rounded-full" />
        <div className="skeleton h-5 w-full rounded-lg" />
        <div className="skeleton h-5 w-3/4 rounded-lg" />
        <div className="skeleton h-3 w-16 rounded-full mt-4" />
      </div>
    </div>
  );
}
