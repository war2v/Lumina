"use client";

import BaseModal from "./BaseModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,

} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/browserClient";

export type Resource = {
  id: string;
  file_name: string;
  file_type: string;
  bucket_path: string;
};

export default function AddResourceToPresentationModal({
  open,
  onOpenChange,
  resource_id,
  resource_name,
  presentations,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  resource_id: string;
  resource_name: string;
  presentations: any[] | null;
}) {
  const [presId, setPresId] = useState("");
  const [presName, setPresName] = useState("");
  ////console.log(resource_id)

  const onSubmit = async () => {
    if (presId !== "") {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("resource_associations")
        .insert({
          presentation_id: presentations ? presentations[Number(presId)].id : -1,
          resource_id: resource_id,
        })
        .select();
    }
  };

  useEffect(() => {
    setPresName(presentations ? presentations[Number(presId)].title : "")
  }, [presId])

  return (
    <BaseModal
      title="Select Presentation"
      open={open}
      onOpenChange={onOpenChange}
    >
      <form className="border-muted border rounded-lg p-2" onSubmit={onSubmit}>
        <h1 className="pb-4">{resource_name}</h1>
        <Select onValueChange={(e) => setPresId(e)}>
          <SelectTrigger className="overflow-hidden mb-2 max-w-[300px]">
            <div className="overflow-hidden">{presName}</div>
          </SelectTrigger>
          <SelectContent>
            {presentations?.map((presentation, index) => (
              <SelectItem key={presentation.id} value={index.toString()}>
                <h1 className="overflow-hidden">{presentation.title}</h1>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={() => onOpenChange(false)}>Link</Button>
      </form>
    </BaseModal>
  );
}
