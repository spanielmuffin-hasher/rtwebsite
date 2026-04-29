import { defineField, defineType } from "sanity";
import { UsersIcon } from "@sanity/icons";

export const teamSchema = defineType({
  name: "team",
  title: "Team Member",
  type: "document",
  icon: UsersIcon,
  fields: [
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      description:
        "The member's full name as it should appear on the website. Use the name they go by publicly.",
      placeholder: "e.g. Priya Subramaniam",
      validation: (Rule) =>
        Rule.required()
          .min(2)
          .max(80)
          .error(
            "Full name is required and must be between 2 and 80 characters."
          ),
    }),

    defineField({
      name: "role",
      title: "Role / Designation",
      type: "string",
      description:
        "Their official role in the club for the selected board year. Use the exact title used in official communications.",
      placeholder: "e.g. President, Secretary, Director — Club Service",
      validation: (Rule) =>
        Rule.required()
          .min(2)
          .max(100)
          .error(
            "Role is required and must be between 2 and 100 characters."
          ),
    }),

    defineField({
      name: "boardYear",
      title: "Board Year",
      type: "string",
      description:
        'The Rotaract year this person served. Use the format "YYYY–YY", e.g. 2024–25.',
      placeholder: "e.g. 2024–25",
      validation: (Rule) =>
        Rule.required()
          .regex(/^\d{4}[–-]\d{2}$/, {
            name: "board year format",
            invert: false,
          })
          .error(
            'Board year is required. Use the format "2024–25" (four-digit year, dash, two-digit year).'
          ),
    }),

    defineField({
      name: "image",
      title: "Profile Photo",
      type: "image",
      description:
        "A clear headshot or portrait photo. Square or portrait orientation works best. The photo will be cropped to a square on the website.",
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
            "A brief description of the photo for screen readers. Usually just the person's name is enough.",
          placeholder: "e.g. Priya Subramaniam, President 2024–25",
          validation: (Rule) =>
            Rule.required()
              .min(2)
              .max(150)
              .error(
                "Please add an image description so screen readers can identify this person."
              ),
        }),
      ],
      validation: (Rule) =>
        Rule.required().error(
          "A profile photo is required. Please upload a clear headshot."
        ),
    }),

    defineField({
      name: "linkedin",
      title: "LinkedIn Profile URL (optional)",
      type: "url",
      description:
        "The full URL of their LinkedIn profile. This appears as a clickable icon on the team card. Leave blank if they don't have one or prefer not to share.",
      placeholder: "e.g. https://www.linkedin.com/in/priya-subramaniam",
      validation: (Rule) =>
        Rule.uri({ scheme: ["https"] }).warning(
          "LinkedIn URLs must start with https://www.linkedin.com/in/..."
        ),
    }),

    defineField({
      name: "bio",
      title: "Short Bio (optional)",
      type: "text",
      rows: 3,
      description:
        "A 1–3 sentence introduction about this member. Mention their background, interests, or what they contribute to the club. Keep it under 300 characters.",
      placeholder:
        "e.g. Passionate about community development, Priya has led three major outreach projects and serves as the club's liaison with local NGOs.",
      validation: (Rule) =>
        Rule.max(300).warning(
          "Bio is over 300 characters. It may be truncated on small screens — consider shortening it."
        ),
    }),

    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description:
        "Controls the position of this member in the team grid. Lower number = appears first. Use multiples of 10 (10, 20, 30…) so you can easily insert someone between existing members later.",
      placeholder: "e.g. 10",
      initialValue: 10,
      validation: (Rule) =>
        Rule.required()
          .min(0)
          .integer()
          .error(
            "Display order is required. Enter a whole number (0 or higher). Use 10, 20, 30 etc."
          ),
    }),

    defineField({
      name: "isLeadership",
      title: "Show in Homepage Leadership Section?",
      type: "boolean",
      description:
        "Turn ON for board office-bearers (President, Secretary, Treasurer, Directors, etc.) whose profiles should appear on the homepage. Leave OFF for general members.",
      initialValue: false,
    }),
  ],

  orderings: [
    {
      title: "Display Order (recommended)",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Name A–Z",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
    {
      title: "Board Year — Newest First",
      name: "boardYearDesc",
      by: [{ field: "boardYear", direction: "desc" }],
    },
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "image",
      boardYear: "boardYear",
      isLeadership: "isLeadership",
    },
    prepare({ title, subtitle, media, boardYear, isLeadership }) {
      return {
        title: `${isLeadership ? "🏅 " : ""}${title ?? "Unnamed Member"}`,
        subtitle: `${subtitle ?? "No role"}${boardYear ? ` · ${boardYear}` : ""}`,
        media,
      };
    },
  },
});
