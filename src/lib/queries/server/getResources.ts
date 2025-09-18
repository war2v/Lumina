
import { Resource } from "@/app/types";
import { getUser } from "@/lib/supabase/getUserServer";
import { createClient } from "@/lib/supabase/serverClient";
import { redirect } from "next/navigation";
import { toast } from "sonner";



export const getResourcesById = async (presentation_id: string) => {
    const supabase = await createClient();

    const { user }  = await getUser()

    if (!user){
        redirect("/sign-in")
    }

    const {data, error} = await supabase
        .from('resource_associations')
        .select('*')
        .eq('presentation_id', presentation_id);
    
    //console.log(data)
    const resource_ids =[]
    if(data){
        for(let i = 0; i < data?.length; i++){
            resource_ids.push(data[i].resource_id)
        }
        
    }

    //console.log(resource_ids)
    const {data: resources, error: resources_error} = await supabase
        .from('presentation_resources')
        .select('*')
        .in('id', resource_ids);
    
    
    if (resources_error){
        toast(resources_error.message);
        return null
    }
    //console.log(resources);
    
    
    if (error) {
        toast(error.message)
        return null
    }
    
    ////console.log(data"error");
   
    let resource_list: Resource[] = [];
    
    for(let i = 0; i < resources.length; i++){
        resource_list.push({
            id: resources[i].id,
            file_name: resources[i].file_name, 
            file_path: resources[i].file_path, 
            uploaded_by: resources[i].uploaded_by
        })
    }
    return resource_list
   
    

    
}