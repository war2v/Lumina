
import { getUser } from "@/lib/supabase/getUserServer";
import { createClient } from "@/lib/supabase/serverClient";
import { redirect } from "next/navigation";


export const getResourcesById = async (presentation_id: string) => {
    const supabase = await createClient();

    const { user }  = await getUser()

    if (!user){
        redirect("/sign-in")
    }

    let {data, error} = await supabase
        .from('presentation_resources')
        .select('*')
        .eq('presentation_id', presentation_id);
    
    if (error || !data) {
        throw new Error('Error Fetchin Data.')
    }
    
    //console.log(data);
   
       
    return data
   
    

    
}