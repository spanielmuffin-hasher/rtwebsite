import { defineField, defineType } from "sanity";
import { ImagesIcon } from "@sanity/icons";

export const gallerySchema = defineType({
  name: "gallery",
  title: "Gallery Album",
  type: "document",
  icon: ImagesIcon,
  fields: [
    defineField({
      name: "title",
      title: "Event / Album Name",
      type: "string",
      description: "Name of the event, e.g. 'Installation Ceremony 2024'",
      validation: (R) => R.required().error("Album name is required."),
    }),

    defineField({
      name: "images",
      title: "Photos",
      type: "array",
      description:
        "Upload all photos for this event. Accepted formats: JPG, PNG, WebP — no HEIC.",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
            accept: "image/jpeg, image/png, image/webp",
          },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
              description: "Describe what is in the photo (for accessibility).",
              placeholder: "e.g. Members planting saplings at the village camp",
            }),
          ],
        },
      ],
      validation: (R) =>
        R.required().min(1).error("Upload at least one photo."),
    }),

    defineField({
      name: "caption",
      title: "Album Caption (optional)",
      type: "string",
      description:
        "Short label shown on hover over photos — defaults to the album name if left blank.",
      placeholder: "e.g. Food Donation Drive · January 2024",
      validation: (R) =>
        R.max(100).warning("Keep under 100 characters to avoid truncation."),
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: "Category used for gallery filtering.",
      options: {
        list: [
          { title: "Events", value: "events" },
          { title: "Community Service", value: "community-service" },
          { title: "Club Activities", value: "club-activities" },
          { title: "Awards & Recognition", value: "awards" },
          { title: "Rotaract Week", value: "rotaract-week" },
        ],
        layout: "dropdown",
      },
      validation: (R) => R.required().error("Please select a category."),
    }),

    defineField({
      name: "takenAt",
      title: "Date Photos Were Taken",
      type: "date",
      description: "Used to sort the gallery chronologically.",
      options: { dateFormat: "DD MMM YYYY" },
    }),

    defineField({
      name: "featured",
      title: "Feature on Homepage?",
      type: "boolean",
      description:
        "ON = first photo of this album appears in the homepage scrolling gallery.",
      initialValue: false,
    }),

    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower = appears first. Use multiples of 10.",
      placeholder: "e.g. 10",
      initialValue: 10,
      validation: (R) =>
        R.min(0).integer().warning("Must be a whole number ≥ 0."),
    }),
  ],

  orderings: [
    {
      title: "Display Order (recommended)",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Date Taken — Newest First",
      name: "dateDesc",
      by: [{ field: "takenAt", direction: "desc" }],
    },
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "images.0",
      takenAt: "takenAt",
      featured: "featured",
    },
    prepare({ title, subtitle, media, takenAt, featured }) {
      const date = takenAt
        ? new Date(takenAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        : null;
      const categoryLabel = subtitle
        ? subtitle
            .replace(/-/g, " ")
            .replace(/\b\w/g, (c: string) => c.toUpperCase())
        : "No category";
      return {
        title: `${featured ? "⭐ " : ""}${title ?? "Untitled Album"}`,
        subtitle: [categoryLabel, date].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
