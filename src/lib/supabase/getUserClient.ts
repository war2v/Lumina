import { createClient } from "./browserClient";

export const getUser = async () => {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    return { user }

}