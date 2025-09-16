import { getUser } from "@/lib/supabase/getUserClient";
import { createClient } from "@/lib/supabase/browserClient";
import { redirect } from "next/navigation";

export const getUserPresentations = async () => {
    const supabase = await createClient();

    const { user }  = await getUser()
    ////console.log(user)

    if (!user){
        redirect("/sign-in")
    }

    let {data, error} = await supabase
        .from('presentations')
        .select('*')
        .eq('created_by', user.id);
    
    if (error) {
        throw new Error('Error Fetchin Data.')
    }
    ////console.log(data)
    
    return data;
    

    
}