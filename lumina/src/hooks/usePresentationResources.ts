"use server";

import { createClient } from "@/lib/supabase/serverClient";

export async function getPresentationResources(presentationId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("presentation_resources")
    .select("*")
    .eq("presentation_id", presentationId);

  if (error) throw new Error(error.message);
  return data || [];
}