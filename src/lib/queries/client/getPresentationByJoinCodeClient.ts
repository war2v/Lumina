
import { Presentation } from "@/app/types";
import { createClient } from "@/lib/supabase/browserClient";


export const getPresentationByJoinCodeClient = async (code: string) => {
    const supabase = await createClient();


    const {data, error} = await supabase
        .from('presentations')
        .select('*')
        .eq('invite_code', code);
    
    if (error || !data) {
        throw new Error('Error Fetchin Data.')
    }

    if (data?.length === 0) {
        return ""
    }

    const {id, invite_code, created_at, title, description, is_public, created_by, active, created_by_username, current_resource_ID } = data[0];

    const presentation: Presentation = {
        active: active,
        created_at: created_at,
        created_by: created_by,
        created_by_username: created_by_username,
        description: description,
        id: id,
        is_public: is_public,
        title: title,
        invite_code: invite_code,
        current_resource_id: current_resource_ID,
    }
    
    return presentation

    
}