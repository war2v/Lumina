import { getUser } from "@/lib/supabase/getUserServer";
import { createClient } from "@/lib/supabase/serverClient";


export const ensureUserNote = async (presentationId: string) => {
  const supabase = await createClient();

  const { user } = await getUser();

  if ( !user ) throw new Error("Not authenticated");

  const { data: existingNote, error: fetchError } = await supabase
    .from("notes")
    .select("*")
    .eq("user_id", user.id)
    .eq("presentation_id", presentationId)
    .single();

  if (fetchError){
    console.log(fetchError)
  }

  if (existingNote) return existingNote;

  const { data: newNote, error: insertError } = await supabase
    .from("notes")
    .insert({
      user_id: user.id,
      presentation_id: presentationId,
      content: "",
    })
    .select()
    .single();

  if (insertError) throw new Error(insertError.message);

  return newNote;
};
