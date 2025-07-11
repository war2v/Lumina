"use client"

import { createClient } from "@/lib/supabase/browserClient";
import { getUser } from "@/lib/supabase/getUserClient";

export async function  setCurrentResource(current_resource_id: string, projectId: string ) {
    const supabase = createClient()
    const { user } = await getUser()

    const { data: newId, error} = await supabase
        .from('presentations')
        .update({'current_resource_id': current_resource_id})
        .eq('id', projectId);

    if (error){
        return new Error(error.message);
    }

    return newId;
}