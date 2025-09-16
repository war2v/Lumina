import { createClient } from "@/lib/supabase/browserClient";

export default function trackCurrentResource(presentationId: string) {
    const supabase = createClient();

    const channel = supabase
        .channel('presentation-watch')
        .on(
            'postgres_changes',
            {
            event: 'UPDATE',
            schema: 'public',
            table: 'presentations',
            filter: `id=eq.${presentationId}`, // current presentation
            },
            (payload) => {
            const newResourceId = payload.new.current_resource_id;
            // Fetch or update displayed resource
            }
        )
        .subscribe();

        return channel;

}

