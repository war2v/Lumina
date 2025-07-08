import { getUser } from "../../../lib/supabase/getUserServer";
import { createClient } from "@/lib/supabase/serverClient";
import { redirect } from "next/navigation";

export const getUserPresentations = async () => {
    const supabase = await createClient();

    const { user }  = await getUser()

    if (!user){
        redirect("/sign-in")
    }

    let {data, error} = await supabase
        .from('presentations')
        .select('*');
    
    if (error) {
        throw new Error('Error Fetchin Data.')
    }
    
    return data;
    

    
}