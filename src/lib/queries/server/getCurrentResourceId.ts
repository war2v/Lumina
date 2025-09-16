import { createClient } from "@/lib/supabase/serverClient";

export const getCurrentResourceId = async (presentation_id: string): Promise<string> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("presentations")
    .select("current_resource_id")
    .eq("id", presentation_id)
    .single(); // Ensures we return a single row, not an array

  if (error) {
    console.error("Error fetching current resource ID:", error.message);
    return "0";
  }

  return data?.current_resource_id || "0";
};
