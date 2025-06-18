import { z } from "zod";

export const PresentationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  isPublic: z.boolean().default(false).optional(),
  description: z.string().optional(),
});