import { PresentationResourceType } from "@/app/types";
import { getUser } from "@/lib/supabase/getUserClient";
import { createClient } from "@/lib/supabase/browserClient";
import { redirect } from "next/navigation";


export const getResourcesById = async (presentation_id: string) => {
    const supabase = await createClient();

    const { user }  = await getUser()

    if (!user){
        redirect("/sign-in")
    }

    let {data, error} = await supabase
        .from('resource_associations')
        .select('*')
        .eq('presentation_id', presentation_id);
    
    console.log(data)
    const resource_ids =[]
    if(data){
        for(let i = 0; i < data?.length; i++){
            resource_ids.push(data[i].resource_id)
        }
        
    }

    console.log(resource_ids)
    let {data: resources, error: resources_error} = await supabase
        .from('presentation_resources')
        .select('*')
        .in('id', resource_ids);
    
    

    console.log(resources)
    
    
    if (error) {
        const errorVar: PresentationResourceType[] = [{
            id: -1 ,
            created_at:"error" ,
            presentation_id: -1 ,
            file_name: error.message ,
            file_path:"error" ,
            file_type:"error" ,
            file_size: "error" ,
            uploaded_by: "error",
        }]
        return errorVar
    }
    
    ////console.log(data"error");
   
       
    return resources
   
    

    
}