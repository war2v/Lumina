"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/browserClient";

export function useRealtimeCurrentResource(presentationId: string, current_resource_ID: string) {
  const supabase = createClient();
  
  const [currentResourceId, setCurrentResourceId] = useState<number>(Number(current_resource_ID));

  useEffect(() => {
    if (!presentationId) return;
    
    const channel = supabase
      .channel(`realtime:presentation:${presentationId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "presentations",
          filter: `id=eq.${presentationId}`,
        },
        (payload) => {
          const newId = payload.new.current_resource_id;
          setCurrentResourceId(newId);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [presentationId, supabase]);

  return currentResourceId;
}
