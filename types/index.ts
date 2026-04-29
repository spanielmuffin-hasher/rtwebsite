import type { PortableTextBlock } from "@portabletext/types";

// ─── Sanity Image ────────────────────────────────────────────────────────────
export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  alt?: string;
  caption?: string;
}

// ─── Event ───────────────────────────────────────────────────────────────────
export interface EventCategory {
  value:
    | "club-service"
    | "community-service"
    | "district-priority"
    | "international-service"
    | "professional-service"
    | "rotaract-week";
  label: string;
}

export interface SanityEvent {
  _id: string;
  _createdAt: string;
  title: string;
  slug: { current: string };
  date: string;
  category: EventCategory["value"];
  featured: boolean;
  description: PortableTextBlock[];
  coverImage: SanityImage;
  images: SanityImage[];
}

export type EventListItem = Pick<
  SanityEvent,
  "_id" | "title" | "slug" | "date" | "category" | "featured" | "coverImage"
>;

// ─── Team ─────────────────────────────────────────────────────────────────────
export interface TeamMember {
  _id: string;
  name: string;
  role: string;
  boardYear: string;
  image: SanityImage;
  linkedin?: string;
  bio?: string;
  order: number;
  isLeadership: boolean;
}

// ─── Gallery ──────────────────────────────────────────────────────────────────
export type GalleryCategory =
  | "events"
  | "community-service"
  | "club-activities"
  | "awards"
  | "rotaract-week";

export interface GalleryImage {
  _id: string;
  title: string;
  images: (SanityImage & { _key: string })[];
  caption?: string;
  category?: GalleryCategory;
  takenAt?: string;
  featured: boolean;
  order: number;
}
