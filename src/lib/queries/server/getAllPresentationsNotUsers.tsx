
import { Presentation } from "@/app/types";
import { createClient } from "@/lib/supabase/serverClient";
import { User } from "@supabase/supabase-js";


export const getAllPresentationsNotUsers = async (user: User) => {
    const supabase = await createClient();
    if(user.id === undefined){
        return []
    }
    const {data, error} = await supabase
        .from('presentations')
        .select('*')
        .neq('created_by', user?.id);
    
    if (error) {
        console.log(error)
    }
    
    const pres_data: Presentation[] = [];
        
        if(data){
            for(let i = 0; i < data.length; i++){
                pres_data.push({
                    id: data[i]?.id,
                    created_at: data[i]?.created_at,
                    title: data[i]?.title,
                    description: data[i]?.description,
                    is_public: data[i].is_public,
                    created_by: data[i]?.created_by,
                    active: data[i].active,
                    created_by_username: data[i]?.created_by_username,
                    current_resource_id: data[i]?.current_resource_id,
                    invite_code: data[i]?.invite_code,
                    subtitle: data[i]?.subtitle,
                    co_presenter_ids: data[i]?.co_presenter_ids,
                    organization_id: data[i]?.organization_id,
                    tags: data[i]?.tags,
                    start_datetime: data[i]?.start_datetime,
                    end_datetime: data[i]?.end_datetime,
                    timezone: data[i]?.timezone,
                    questions_enabled: data[i]?.questions_enabled,
                    languages: data[i]?.languages,
                    linked_note_id: data[i]?.linked_note_id,
                    
                })
            }
        }
        
        return pres_data;
    

    
}