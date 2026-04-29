import { groq } from "next-sanity";
import { sanityFetch } from "./sanity.client";
import type {
  SanityEvent,
  EventListItem,
  TeamMember,
  GalleryImage,
} from "@/types";

// ─── Fragments ───────────────────────────────────────────────────────────────

const imageFields = groq`
  _type,
  asset,
  hotspot,
  crop,
  alt,
  caption
`;

const eventListFields = groq`
  _id,
  title,
  slug,
  date,
  category,
  featured,
  coverImage { ${imageFields} }
`;

const eventFullFields = groq`
  _id,
  _createdAt,
  title,
  slug,
  date,
  category,
  featured,
  description,
  coverImage { ${imageFields} },
  images[] { ${imageFields} }
`;

// ─── Events ───────────────────────────────────────────────────────────────────

const getAllEventsQuery = groq`
  *[_type == "event"] | order(date desc) {
    ${eventListFields}
  }
`;

const getFeaturedEventsQuery = groq`
  *[_type == "event" && featured == true] | order(date desc) [0...6] {
    ${eventListFields}
  }
`;

const getEventBySlugQuery = groq`
  *[_type == "event" && slug.current == $slug][0] {
    ${eventFullFields}
  }
`;

const getEventsByCategoryQuery = groq`
  *[_type == "event" && category == $category] | order(date desc) {
    ${eventListFields}
  }
`;

const getRecentEventsQuery = groq`
  *[_type == "event"] | order(date desc) [0...$limit] {
    ${eventListFields}
  }
`;

const getEventSlugsQuery = groq`
  *[_type == "event" && defined(slug.current)] {
    "slug": slug.current
  }
`;

// ─── Team ─────────────────────────────────────────────────────────────────────

const getTeamMembersQuery = groq`
  *[_type == "team"] | order(order asc) {
    _id,
    name,
    role,
    boardYear,
    image { ${imageFields} },
    linkedin,
    bio,
    order,
    isLeadership
  }
`;

const getLeadershipTeamQuery = groq`
  *[_type == "team" && isLeadership == true] | order(order asc) {
    _id,
    name,
    role,
    boardYear,
    image { ${imageFields} },
    linkedin,
    bio,
    order,
    isLeadership
  }
`;

// ─── Gallery ──────────────────────────────────────────────────────────────────

const getGalleryImagesQuery = groq`
  *[_type == "gallery"] | order(order asc) {
    _id,
    title,
    images[] { _key, ${imageFields} },
    caption,
    category,
    takenAt,
    featured,
    order
  }
`;

const getFeaturedGalleryQuery = groq`
  *[_type == "gallery" && featured == true] | order(order asc) [0...12] {
    _id,
    title,
    images[] { _key, ${imageFields} },
    caption,
    category,
    takenAt,
    featured,
    order
  }
`;

const getGalleryByCategoryQuery = groq`
  *[_type == "gallery" && category == $category] | order(order asc) {
    _id,
    title,
    images[] { _key, ${imageFields} },
    caption,
    category,
    takenAt,
    featured,
    order
  }
`;

// ─── Bulletins ────────────────────────────────────────────────────────────────

const getAllBulletinsQuery = groq`
  *[_type == "bulletin"] | order(publishedAt desc) {
    _id,
    title,
    issue,
    description,
    publishedAt,
    coverImage { ${imageFields} },
    "pdfUrl": pdfFile.asset->url
  }
`;

// ─── Exported Query Functions ─────────────────────────────────────────────────

export async function getAllEvents(): Promise<EventListItem[]> {
  return sanityFetch<EventListItem[]>({
    query: getAllEventsQuery,
    tags: ["event"],
    revalidate: 60,
  });
}

export async function getFeaturedEvents(): Promise<EventListItem[]> {
  return sanityFetch<EventListItem[]>({
    query: getFeaturedEventsQuery,
    tags: ["event"],
    revalidate: 60,
  });
}

export async function getEventBySlug(slug: string): Promise<SanityEvent | null> {
  return sanityFetch<SanityEvent | null>({
    query: getEventBySlugQuery,
    params: { slug },
    tags: [`event:${slug}`],
    revalidate: 60,
  });
}

export async function getEventsByCategory(
  category: string
): Promise<EventListItem[]> {
  return sanityFetch<EventListItem[]>({
    query: getEventsByCategoryQuery,
    params: { category },
    tags: ["event"],
    revalidate: 60,
  });
}

export async function getRecentEvents(limit: number = 3): Promise<EventListItem[]> {
  return sanityFetch<EventListItem[]>({
    query: getRecentEventsQuery,
    params: { limit },
    tags: ["event"],
    revalidate: 60,
  });
}

export async function getEventSlugs(): Promise<{ slug: string }[]> {
  return sanityFetch<{ slug: string }[]>({
    query: getEventSlugsQuery,
    tags: ["event"],
    revalidate: false,
  });
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  return sanityFetch<TeamMember[]>({
    query: getTeamMembersQuery,
    tags: ["team"],
    revalidate: 300,
  });
}

export async function getLeadershipTeam(): Promise<TeamMember[]> {
  return sanityFetch<TeamMember[]>({
    query: getLeadershipTeamQuery,
    tags: ["team"],
    revalidate: 300,
  });
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  return sanityFetch<GalleryImage[]>({
    query: getGalleryImagesQuery,
    tags: ["gallery"],
    revalidate: 120,
  });
}

export async function getFeaturedGallery(): Promise<GalleryImage[]> {
  return sanityFetch<GalleryImage[]>({
    query: getFeaturedGalleryQuery,
    tags: ["gallery"],
    revalidate: 120,
  });
}

export async function getGalleryByCategory(
  category: string
): Promise<GalleryImage[]> {
  return sanityFetch<GalleryImage[]>({
    query: getGalleryByCategoryQuery,
    params: { category },
    tags: ["gallery"],
    revalidate: 120,
  });
}

export interface SanityBulletin {
  _id: string;
  title: string;
  issue?: string;
  description?: string;
  publishedAt: string;
  coverImage?: {
    _type: string;
    asset: { _ref: string; _type: string };
    hotspot?: object;
    crop?: object;
    alt?: string;
  };
  pdfUrl?: string;
}

export async function getAllBulletins(): Promise<SanityBulletin[]> {
  return sanityFetch<SanityBulletin[]>({
    query: getAllBulletinsQuery,
    tags: ["bulletin"],
    revalidate: 120,
  });
}
