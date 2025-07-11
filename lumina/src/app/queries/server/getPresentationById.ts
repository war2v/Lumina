import { PresentationType } from "@/app/types";
import { createClient } from "@/lib/supabase/serverClient";
import { Presentation } from "lucide-react";


export const getPresentationById = async (id: string): Promise<PresentationType> => {
    const supabase = await createClient();


    let {data, error} = await supabase
        .from('presentations')
        .select('*')
        .eq('id', id);
    
    if (error) {
        throw new Error('Error Fetchin Data.')
    }
    if (!data){
        return <PresentationType>{
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
    
    const {created_at, current_resource_id, invite_code, title, description, is_public, created_by, created_by_username, active } = data[0];
   
       const presentation: PresentationType = {
           active: active,
           created_at: created_at,
           created_by: created_by,
           created_by_username: created_by_username,
           description: description,
           id: id,
           is_public: is_public,
           title: title,
           invite_code: invite_code,
           current_resource_id: current_resource_id
       }
       
       return presentation
   
    

    
}