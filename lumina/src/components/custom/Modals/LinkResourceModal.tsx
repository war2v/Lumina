"use client";

import BaseModal from "./BaseModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/browserClient";

export type Resource = {
  id: string;
  file_name: string;
  file_type: string;
  bucket_path: string;
};

export default function LinkResourceModal({
  open,
  onOpenChange,
  presentation_id,
  presentation_title,
  resources,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  presentation_id: string;
  presentation_title?: string;
  resources: any[] | null | undefined;
}) {
  const [resourceId, setResourceID] = useState("");
  const [resourceName, setResourceName] = useState("");
  ////console.log(resource_id)

  const onSubmit = async () => {
    if (resourceId !== "" && resources) {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("resource_associations")
        .insert({
          presentation_id: presentation_id,
          resource_id: resources[Number(resourceId)].id,
        })
        .select();
    }
    onOpenChange(false)
  };

  return (
    <BaseModal
      title="Select Resource"
      open={open}
      onOpenChange={onOpenChange}
    >
      <form onSubmit={onSubmit} className="flex flex-col gap-y-2">
        <h1 className="text-xs text-muted-foreground">Current Presentation</h1>
        <h1 className="text-sm bg-black bg-opacity-5 rounded-lg p-2">{presentation_title}</h1>
        <Select onValueChange={(e) => {setResourceID(e); console.log(resources ? resources[Number(resourceId)]: "")}}>
          <SelectTrigger>
            <div>
                <h1 className="text-sm text-muted-foreground">{resourceId ? resources ? resources[Number(resourceId)].file_name: resourceId :"Select a resource"}</h1>
            </div>
          </SelectTrigger>
          <SelectContent>
            {resources?.map((resource, index) => (
              <SelectItem key={resource.id} value={index.toString()}>
                {resource.file_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button type="submit">Link</Button>
      </form>
    </BaseModal>
  );
}
