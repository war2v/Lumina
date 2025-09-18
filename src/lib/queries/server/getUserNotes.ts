
import { Note } from "@/app/types";
import { getUser } from "@/lib/supabase/getUserServer";
import { createClient } from "@/lib/supabase/serverClient";
import { redirect } from "next/navigation";



export const getUserNotes = async () => {
    const supabase = await createClient();

    const { user }  = await getUser()
    

    
    if (!user){
        redirect("/sign-in")
    }

    
    const {data, error} = await supabase
        .from('notes')
        .select(`
            id,
            created_at,
            presentations (
                id,
                title
            ),
            content,
            updated_at
            `)
        .eq('user_id', user.id);
    
    
    if (error || !data) {
        //console.log(error?.message)
        return []
    }
    
    //console.log(data)

    const notes: Note[] = []

    for(let i = 0; i < data.length; i++){
        notes.push({
           id: data[i]?.id, 
           created_at: data[i]?.created_at,
           content: data[i]?.content,
           updated_at: data[i]?.updated_at
        })
    }

    return notes
   
    

    
}