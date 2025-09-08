import { PresentationType } from "@/app/types";
import { getUser } from "@/lib/supabase/getUserServer";
import { createClient } from "@/lib/supabase/serverClient";
import { redirect } from "next/navigation";


export const getUserResources = async () => {
    const supabase = await createClient();

    const { user }  = await getUser()

    if (!user){
        redirect("/sign-in")
    }

    let {data, error} = await supabase
        .from('presentation_resources')
        .select('*')
        .eq('uploaded_by', user.id);
    
    if (error || !data) {
        throw new Error('Error Fetchin Data.')
    }

    return data
}