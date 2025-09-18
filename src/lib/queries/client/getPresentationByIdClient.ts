
import { Presentation } from "@/app/types";
import { createClient } from "@/lib/supabase/browserClient";


export const getPresentationByIdClient = async (id: string): Promise<Presentation> => {
    const supabase = await createClient();


    const {data, error} = await supabase
        .from('presentations')
        .select('*')
        .eq('id', id);
    
    if (error || !data) {
        throw new Error('Error Fetchin Data.')
    }

    const {created_at, invite_code, title, description, is_public, created_by, active, created_by_username, current_resource_ID } = data[0];

    const presentation: Presentation = {
        active: active,
        invite_code: invite_code,
        created_at: created_at,
        created_by: created_by,
        created_by_username: created_by_username,
        description: description,
        id: id,
        is_public: is_public,
        title: title,
        current_resource_id: current_resource_ID,
    }
    
    return presentation

    
}