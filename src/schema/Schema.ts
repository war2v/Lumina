import { z } from "zod";

export const PresentationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  isPublic: z.boolean().default(false).optional(),
  isActive: z.boolean().default(false).optional(),
  description: z.string().optional(),
  subtitle: z.string().optional(),
  co_presenter_ids: z.string().optional(),
  organization_id: z.string().optional(),
  audience_type: z.string().optional(),
  objectives: z.string().optional(),
  tags: z.string().optional(),
  questions_enabled: z.boolean().optional(),
  languages: z.string().optional(),
  private_presenter_notes: z.string().optional(),
});