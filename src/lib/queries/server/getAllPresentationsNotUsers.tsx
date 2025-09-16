
import { getUser } from "@/lib/supabase/getUserServer";
import { createClient } from "@/lib/supabase/serverClient";


export const getAllPresentationsNotUsers = async () => {
    const supabase = await createClient();
    const {user} = await getUser();

    let {data, error} = await supabase
        .from('presentations')
        .select('*')
        .neq('created_by', user?.id);
    
    if (error) {
        throw new Error('Error Fetchin Data.')
    }
    
    return data;
    

    
}