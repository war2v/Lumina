"use client";
import { createClient } from "@/lib/supabase/browserClient";

export async function download(url: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .storage
        .from('presentation-resources')
        .download(url);


    return {data, error};
}