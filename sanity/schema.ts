import { type SchemaTypeDefinition } from "sanity";
import { eventSchema } from "./schemas/event";
import { teamSchema } from "./schemas/team";
import { gallerySchema } from "./schemas/gallery";
import { bulletin } from "./schemas/bulletin";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [eventSchema, teamSchema, gallerySchema, bulletin],
};
