import { getUser } from "@/lib/supabase/getUserServer";
import { SupabaseClient } from "@supabase/supabase-js";

export interface HandleSaveProps {
    supabase: SupabaseClient<any, "public", any>,
    presentationId: string,
    content: string,
}

export async function handleSave({supabase, presentationId, content}: HandleSaveProps) {

    const {user} = await getUser()
    if (!user) return;

    const { data, error } = await supabase
      .from("notes")
      .insert({
        user_id: user.id,
        presentation_id: presentationId,
        content: content,
      })
      .select();

    if (error) return new Error("Failed to save note");

    return data
  }