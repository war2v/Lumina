import { getUser } from "@/lib/supabase/getUserServer";
import { createClient } from "../supabase/browserClient";

export interface HandleSaveProps {
    presentationId: string,
    content: string,
}

export async function handleSave({presentationId, content}: HandleSaveProps) {

    const supabase = createClient();

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