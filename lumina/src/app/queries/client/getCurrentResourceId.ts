
import { PresentationType } from "@/app/types";
import { createClient } from "@/lib/supabase/browserClient";
import { Presentation } from "lucide-react";


export const getCurrentResourceId = async (presentation_id: string) => {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('presentations')
        .select('current_resource_id')
        .eq('id', presentation_id)

    if (error) {
        return new Error(error.message)
    }

    return data;

}