"use client"
import { createClient } from "../supabase/browserClient";

export default async function deleteResource(id:string) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("presentation_resources")
        .delete()
        .eq('id', id)

    //console.log(data)

    if (error) {
        return error.message
    }
    return 'Success'
}