import { toast } from "sonner";
import { supabase } from "../supabase/supabase-client";
import { getUser } from "../supabase/getUserClient";

export type supabaseStorageFile = {
    id: string; 
    path: string; 
    fullPath: string; 
}

export async function uploadProfilePicture(file: File) {
    const { user } = await getUser();
    let name = ""
    switch (file.type){
        case "image/jpeg":
            name = "pyp.jpeg"
        case "mage/png":
            name = "pyp.png"
        case "image/gif":
            name = "pyp.gif"
            
    }

    const { data, error } = await supabase
        .storage
        .from('profile_pictures')
        .upload(`${user?.id}/${name}`, file, {
            upsert: true,
            contentType: "image/*"
        });
    
    if (error) {
        toast("Error uploading profile picture:" + error.message)
        return null
    }

    return data;
}