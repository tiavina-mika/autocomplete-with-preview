import { z } from "zod";

export const memberSchema = z.object({
  id: z.string(),
  label: z.string()
});

export const teamSchema = z.object({
  member: memberSchema,
  members: z.array(memberSchema)
});
