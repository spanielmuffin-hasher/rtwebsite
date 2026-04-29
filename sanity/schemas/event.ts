import { defineField, defineType } from "sanity";
import { CalendarIcon } from "@sanity/icons";

export const eventSchema = defineType({
  name: "event",
  title: "Event",
  type: "document",
  icon: CalendarIcon,
  fields: [
    defineField({
      name: "title",
      title: "Event Title",
      type: "string",
      description:
        "The full name of the event as it should appear on the website. Keep it clear and specific.",
      placeholder: "e.g. Food Donation Drive 2024",
      validation: (Rule) =>
        Rule.required()
          .min(3)
          .max(120)
          .error(
            "Event title is required and must be between 3 and 120 characters."
          ),
    }),

    defineField({
      name: "slug",
      title: "URL Slug (auto-generated)",
      type: "slug",
      description:
        'The web address for this event page. Click "Generate" to create it automatically from the title. Only change this if you have a specific reason to.',
      options: {
        source: "title",
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (Rule) =>
        Rule.required().error(
          'URL slug is required. Click the "Generate" button to create one from the title.'
        ),
    }),

    defineField({
      name: "date",
      title: "Event Date & Time",
      type: "datetime",
      description:
        "The date and time the event took place (or is scheduled to take place). Used to sort events chronologically.",
      options: {
        dateFormat: "DD MMM YYYY",
        timeFormat: "HH:mm",
        timeStep: 15,
      },
      validation: (Rule) =>
        Rule.required().error("Event date is required."),
    }),

    defineField({
      name: "category",
      title: "Service Avenue / Category",
      type: "string",
      description:
        "Select the Rotaract service avenue this event belongs to. This controls which filter tab it appears under on the Activities page.",
      options: {
        list: [
          { title: "Club Service", value: "club-service" },
          { title: "Community Service", value: "community-service" },
          { title: "District Priority Projects", value: "district-priority" },
          { title: "International Service", value: "international-service" },
          { title: "Professional Service", value: "professional-service" },
          { title: "Rotaract Week Celebration", value: "rotaract-week" },
        ],
        layout: "dropdown",
      },
      validation: (Rule) =>
        Rule.required().error(
          "Please select a category so the event appears under the correct filter."
        ),
    }),

    defineField({
      name: "featured",
      title: "Feature on Homepage?",
      type: "boolean",
      description:
        "Turn this ON to show this event in the featured section on the homepage. Limit to 3–6 events at a time for best results.",
      initialValue: false,
    }),

    defineField({
      name: "description",
      title: "Event Description",
      type: "array",
      description:
        "Write a full description of the event. You can use headings, bold text, and bullet points. This appears on the individual event page.",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal paragraph", value: "normal" },
            { title: "Heading 2 (large)", value: "h2" },
            { title: "Heading 3 (medium)", value: "h3" },
            { title: "Block Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Underline", value: "underline" },
              { title: "Strikethrough", value: "strike-through" },
              { title: "Inline Code", value: "code" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Add a Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                    description: "Paste the full web address, e.g. https://example.com",
                    validation: (Rule) =>
                      Rule.uri({
                        allowRelative: true,
                        scheme: ["http", "https", "mailto"],
                      }).error("Please enter a valid URL."),
                  },
                  {
                    name: "blank",
                    type: "boolean",
                    title: "Open link in a new tab?",
                    description: "Turn ON for external links (other websites). Leave OFF for internal links.",
                    initialValue: true,
                  },
                ],
              },
            ],
          },
        },
      ],
      validation: (Rule) =>
        Rule.required().error(
          "Description is required. Write at least a short summary of what happened at the event."
        ),
    }),

    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      description:
        "The main image shown at the top of the event page and on event cards. Use a clear, high-quality horizontal photo (landscape orientation works best).",
      options: {
        hotspot: true,
        accept: "image/jpeg, image/png, image/webp",
      },
      fields: [
        defineField({
          name: "alt",
          title: "Image Description (Alt Text)",
          type: "string",
          description:
            "Briefly describe what is in the photo. This is used by screen readers and search engines. Example: \"Volunteers distributing food bags at Gandhipuram\".",
          placeholder: "e.g. Rotaract members serving food at the donation camp",
          validation: (Rule) =>
            Rule.required()
              .min(5)
              .max(200)
              .error(
                "Please describe the image in 5–200 characters so visually impaired visitors can understand it."
              ),
        }),
      ],
      validation: (Rule) =>
        Rule.required().error(
          "A cover image is required. Upload a clear photo that represents this event."
        ),
    }),

    defineField({
      name: "images",
      title: "Additional Event Photos",
      type: "array",
      description:
        "Upload extra photos from the event. These appear in a photo gallery at the bottom of the event page. You can add up to 20 photos.",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              title: "Image Description (Alt Text)",
              type: "string",
              description: "Describe what is happening in this photo.",
              placeholder: "e.g. Team members presenting the cheque to the NGO",
              validation: (Rule) =>
                Rule.required()
                  .min(5)
                  .max(200)
                  .error(
                    "Please describe each image so visually impaired visitors can understand it."
                  ),
            },
            {
              name: "caption",
              title: "Caption (optional)",
              type: "string",
              description:
                "A short label that appears on the photo when visitors hover over it. Keep it under 80 characters.",
              placeholder: "e.g. Distributing 200 meal kits to families in need",
              validation: (Rule) =>
                Rule.max(80).warning(
                  "Captions over 80 characters may be cut off on small screens."
                ),
            },
          ],
        },
      ],
      validation: (Rule) =>
        Rule.max(20).warning(
          "More than 20 photos may slow down the page. Consider keeping the best 10–15."
        ),
    }),
  ],

  orderings: [
    {
      title: "Date — Newest First",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
    {
      title: "Date — Oldest First",
      name: "dateAsc",
      by: [{ field: "date", direction: "asc" }],
    },
    {
      title: "Title A–Z",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "date",
      media: "coverImage",
      category: "category",
      featured: "featured",
    },
    prepare({ title, subtitle, media, category, featured }) {
      const date = subtitle
        ? new Date(subtitle).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        : "No date set";
      const categoryLabel = category
        ? category
            .replace(/-/g, " ")
            .replace(/\b\w/g, (c: string) => c.toUpperCase())
        : "No category";
      return {
        title: `${featured ? "⭐ " : ""}${title ?? "Untitled Event"}`,
        subtitle: `${date} · ${categoryLabel}`,
        media,
      };
    },
  },
});
