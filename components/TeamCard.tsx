"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { urlFor } from "@/lib/image";
import { BLUR_SQUARE } from "@/lib/shimmer";
import type { TeamMember } from "@/types";

interface TeamCardProps {
  member: TeamMember;
}

export function TeamCard({ member }: TeamCardProps) {
  const prefersReduced = useReducedMotion();

  const imageUrl = member.image
    ? urlFor(member.image).width(400).height(400).fit("crop").format("webp").url()
    : null;

  return (
    <motion.article
      className="group relative bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-500 flex flex-col"
      whileHover={prefersReduced ? {} : { y: -6 }}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
    >
      {/* Photo */}
      <div className="relative w-full aspect-square overflow-hidden bg-neutral-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={member.image?.alt ?? member.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105 will-change-transform"
            placeholder="blur"
            blurDataURL={BLUR_SQUARE}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
            <span className="text-primary/40 text-6xl font-display font-bold">
              {member.name.charAt(0)}
            </span>
          </div>
        )}

        {/* LinkedIn hover overlay */}
        {member.linkedin && (
          <motion.div
            className="absolute inset-0 bg-neutral-900/85 flex items-center justify-center"
            initial={{ opacity: 0 }}
            whileHover={prefersReduced ? {} : { opacity: 1 }}
            transition={{ duration: 0.28 }}
          >
            <motion.a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on LinkedIn`}
              className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-neutral-900 hover:bg-primary hover:text-white transition-colors duration-200"
              initial={{ scale: 0.7, opacity: 0 }}
              whileHover={prefersReduced ? {} : { scale: 1.05 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </motion.a>
          </motion.div>
        )}
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display font-bold text-neutral-900 text-base leading-snug group-hover:text-primary transition-colors duration-200">
          {member.name}
        </h3>
        <p className="text-primary text-xs font-semibold tracking-wide uppercase mt-1">
          {member.role}
        </p>
        {member.boardYear && (
          <p className="text-neutral-400 text-xs mt-0.5">{member.boardYear}</p>
        )}
        {member.bio && (
          <p className="text-neutral-500 text-sm mt-3 leading-relaxed line-clamp-3">
            {member.bio}
          </p>
        )}
      </div>
    </motion.article>
  );
}

export function TeamCardSkeleton() {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-card" aria-hidden>
      <div className="skeleton w-full aspect-square" />
      <div className="p-5 space-y-2">
        <div className="skeleton h-4 w-3/4 rounded-lg" />
        <div className="skeleton h-3 w-1/2 rounded-full" />
        <div className="skeleton h-3 w-full rounded-lg mt-3" />
        <div className="skeleton h-3 w-4/5 rounded-lg" />
      </div>
    </div>
  );
}
