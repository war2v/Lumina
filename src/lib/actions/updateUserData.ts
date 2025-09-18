import { toast } from "sonner";
import { Account } from "../queries/server/getAccount";
import { createClient } from "../supabase/browserClient";

export const UpdateUserData = async (formData: Account, user_id: string) => {
    const supabase = await createClient();

    //console.log(user_id)

    const { data, error } = await supabase
        .from('accounts')
        .update({ 
            username: formData.updated_at,
            first_name: formData.first_name,
            last_name: formData.last_name,
            role: formData.role,
            bio: formData.bio,
            profile_image_url: formData.profile_image_url,
            })
        .eq('id', user_id )
        .select();

    if (error) {
        //console.log(error.message)
        toast(error.message)
        return {}
    }

    //console.log(data)
    
    return data
    

    

}