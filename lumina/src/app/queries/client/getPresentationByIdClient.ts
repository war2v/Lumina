
import { PresentationType } from "@/app/types";
import { createClient } from "@/lib/supabase/browserClient";


export const getPresentationByIdClient = async (id: string): Promise<PresentationType> => {
    const supabase = await createClient();


    let {data, error} = await supabase
        .from('presentations')
        .select('*')
        .eq('id', id);
    
    if (error || !data) {
        throw new Error('Error Fetchin Data.')
    }

    const {created_at, title, description, is_public, created_by, active, created_by_username } = data[0];

    const presentation: PresentationType = {
        active: active,
        created_at: created_at,
        created_by: created_by,
        created_by_username: created_by_username,
        description: description,
        id: id,
        is_public: is_public,
        title: title,
    }
    
    return presentation

    
}