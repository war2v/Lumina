"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/browserClient";
import { getUser } from "@/lib/supabase/getUserClient";
import { useRouter } from "next/navigation";

export const NotesContent = () => {
  const router = useRouter();
  const createNote = async () => {
    const supabase = await createClient();
    const { user } = await getUser();

    const { data, error } = await supabase
      .from("notes")
      .insert([{ user_id: user?.id }])
      .select();

    if (error) {
      throw new Error(error.message);
    }

    //console.log(data)
    router.refresh();
  };

  return (
    <div>
      <Button onClick={createNote}>Create Note</Button>
    </div>
  );
};
