
import { createClient } from "@/lib/supabase/browserClient";


export const getAllPresentations = async () => {
    const supabase = createClient();

    const {data, error} = await supabase
        .from('presentations')
        .select('*');
    
    if (error) {
        throw new Error('Error Fetchin Data.')
    }
    
    return data;
    

    
}