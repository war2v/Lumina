import { Presentation } from "@/app/types";
import { createClient } from "@/lib/supabase/serverClient";



export const getPresentationById = async (id: string): Promise<Presentation> => {
    const supabase = await createClient();


    const {data, error} = await supabase
        .from('presentations')
        .select('*')
        .eq('id', id);
    
    if (error) {
        throw new Error(error.message)
    }
    if (!data){
        return <Presentation>{
            active: false,
            created_at:"" ,
            created_by:"" ,
            created_by_username:"" ,
            description:"" ,
            id:"" ,
            is_public: false,
            title:"" ,
            invite_code:"",
            }
    }
    
    const {created_at, tags, start_datetime, end_datetime, current_resource_id, invite_code, title, description, is_public, created_by, created_by_username, active } = data[0];
   
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
           tags: tags,
           current_resource_id: current_resource_id,
           start_datetime: new Date(start_datetime),
           end_datetime: new Date(end_datetime),

       }
       
       return presentation
   
    

    
}