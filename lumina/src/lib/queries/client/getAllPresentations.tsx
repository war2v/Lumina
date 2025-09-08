
import { createClient } from "@/lib/supabase/browserClient";


export const getAllPresentations = async () => {
    const supabase = createClient();

    let {data, error} = await supabase
        .from('presentations')
        .select('*');
    
    if (error) {
        throw new Error('Error Fetchin Data.')
    }
    
    return data;
    

    
}