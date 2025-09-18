
import { createClient } from "@/lib/supabase/serverClient";


export const getAllPresentations = async () => {
    const supabase = await createClient();

    const {data, error} = await supabase
        .from('presentations')
        .select('*');
    
    if (error) {
        throw new Error('Error Fetchin Data.')
    }
    
    return data;
    

    
}