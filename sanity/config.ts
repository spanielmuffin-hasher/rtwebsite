import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schema } from "./schema";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineConfig({
  name: "rotaract-crystals",
  title: "Rotaract Crystals CMS",
  basePath: "/admin",

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Events")
              .schemaType("event")
              .child(
                S.documentList()
                  .title("All Events")
                  .filter('_type == "event"')
                  .apiVersion("2024-01-01")
                  .schemaType("event")
                  .defaultOrdering([{ field: "date", direction: "desc" }])
              ),
            S.divider(),
            S.listItem()
              .title("Team Members")
              .schemaType("team")
              .child(
                S.documentList()
                  .title("Team Members")
                  .filter('_type == "team"')
                  .apiVersion("2024-01-01")
                  .schemaType("team")
                  .defaultOrdering([{ field: "order", direction: "asc" }])
              ),
            S.divider(),
            S.listItem()
              .title("Gallery")
              .schemaType("gallery")
              .child(
                S.documentList()
                  .title("Gallery Images")
                  .filter('_type == "gallery"')
                  .apiVersion("2024-01-01")
                  .schemaType("gallery")
                  .defaultOrdering([{ field: "order", direction: "asc" }])
              ),
            S.divider(),
            S.listItem()
              .title("Bulletins")
              .schemaType("bulletin")
              .child(
                S.documentList()
                  .title("All Bulletins")
                  .filter('_type == "bulletin"')
                  .apiVersion("2024-01-01")
                  .schemaType("bulletin")
                  .defaultOrdering([{ field: "publishedAt", direction: "desc" }])
              ),
          ]),
    }),
  ],

  schema,

  document: {
    productionUrl: async (prev, { document }) => {
      const slug = (document as { slug?: { current?: string } }).slug?.current;
      if (document._type === "event" && slug) {
        return `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/our-activities/${slug}`;
      }
      return prev;
    },
  },
});
