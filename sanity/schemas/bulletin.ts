import { defineField, defineType } from "sanity";

export const bulletin = defineType({
  name: "bulletin",
  title: "Bulletin",
  type: "document",
  icon: () => "📰",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "issue",
      title: "Issue Number / Label",
      type: "string",
      description: 'e.g. "Vol 1 Issue 3" or "January 2025"',
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "pdfFile",
      title: "PDF File",
      type: "file",
      options: { accept: ".pdf" },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published Date",
      type: "date",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 3,
    }),
  ],
  orderings: [
    {
      title: "Newest First",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "issue",
      media: "coverImage",
    },
  },
});
