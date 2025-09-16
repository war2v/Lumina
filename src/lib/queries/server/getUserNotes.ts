import { PresentationType } from "@/app/types";
import { getUser } from "@/lib/supabase/getUserServer";
import { createClient } from "@/lib/supabase/serverClient";
import { redirect } from "next/navigation";
import { toast } from "sonner";


export const getUserNotes = async (): Promise<any> => {
    const supabase = await createClient();

    const { user }  = await getUser()

    
    if (!user){
        redirect("/sign-in")
    }

    
    let {data, error} = await supabase
        .from('notes')
        .select(`
            id,
            user_id, 
            presentation_id, 
            content,
            presentations (
                title,
                created_by_username
            ) 
            `)
        .eq('user_id', user.id);
    
    if (error || !data) {
        console.log(error?.message)
        return []
    }
    
    return data
   
    

    
}