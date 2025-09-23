import { createClient } from "@/lib/supabase/serverClient";
import { toast } from "sonner";

export type Account = {
    id?: string,
    created_at?: string,
    username?: string,
    first_name?: string,
    last_name?: string,
    role?: "attendee" | "presenter",
    updated_at?: string,
    profile_image_url?: string,
    bio?: string
}

export const getAccount = async () => {
    const supabase = await createClient();

    const { data, error}  = await supabase.from("accounts").select("*");

    if ( error ) {
        toast(error.message)
        return null
    }

    if ( !data || data.length === 0 ) {
        data.push(
            {
        id: "id",
        created_at: "",
        username: "",
        first_name: "",
        last_name: "",
        role: '',
        updated_at: "",
        profile_image_url: "",
        bio: "", }
        )
    }


    return { 
        id: data[0].id,
        created_at: data[0].created_at,
        username: data[0].username,
        first_name: data[0].first_name,
        last_name: data[0].last_name,
        role: data[0].role,
        updated_at: data[0].updated_at,
        profile_image_url: data[0].profile_image_url,
        bio: data[0].bio, 
    }

}