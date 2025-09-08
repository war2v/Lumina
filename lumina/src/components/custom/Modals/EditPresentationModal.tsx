"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/browserClient";
import { useState } from "react";
import {  Upload } from "lucide-react";
import BaseModal from "./BaseModal";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  files: z.any().optional(),
  tags: z.string().optional(),
});

type EditPresentationFormData = z.infer<typeof schema>;

export type Resource = {
  id: string;
  file_name: string;
  file_type: string;
  bucket_path: string;
};

export default function EditPresentationModal({
  open,
  onOpenChange,
  initialData,
  presentationId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData: { title: string; description?: string, tags?: string };
  presentationId: string;
}) {
  const {user, loading} = useUser();
  const router = useRouter();
  const supabase = createClient();
  const [message, setMessage] = useState("");
  const [resources, setResources] = useState<FileList | null>();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditPresentationFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: initialData.title,
      description: initialData.description || "",
      tags: initialData.tags
    },
  });

  const onSubmit = async (data: EditPresentationFormData) => {
    setMessage("");
    try {
      const { error: updateError } = await supabase
        .from("presentations")
        .update({
          title: data.title,
          description: data.description,
          tags: data.tags,
        })
        .eq("id", presentationId);

      if (updateError) throw updateError;

      if (data.files?.length > 0) {
        const uploadedResources: FileList[] = [];

        for (const file of data.files) {
          const filePath = `${user?.id}/${Date.now()}-${file.name}`;

          const { error: uploadError } = await supabase.storage
            .from("presentation-resources")
            .upload(filePath, file);

          if (uploadError) throw uploadError;

          if (!user){ throw new Error("User Not Signed In") }

          
          
          const { data: inserted, error: insertError } = await supabase
            .from("presentation_resources")
            .insert({
              file_name: file.name,
              file_type: file.type,
              file_path: filePath,
              uploaded_by: user.id,
            })
            .select()
            .single();
          if (insertError) throw insertError;
          if (inserted) uploadedResources.push(inserted); 
          const { data, error } = await supabase
            .from("resource_associations")
            .insert({
              "presentation_id": presentationId,
              "resource_id": inserted.id,
            })
          
        }
        
      }

      setMessage("Changes saved.");
      onOpenChange(false);
      router.refresh()
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    }
  };

  return (
    <BaseModal title="Edit Presentation" open={open} onOpenChange={onOpenChange}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" {...register("title")} />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" {...register("description")} />
        </div>

        <div>
          <Label className="text-muted-foreground" htmlFor="tags">Tags</Label>
          <Textarea id="tags" {...register("tags")} />
        </div>

        <div>
          <Label htmlFor="files">Upload New Resources</Label>
          <Input
            id="files"
            type="file"
            multiple
            accept=".pptx,.pdf,.docx,.png,.jpg,.jpeg"
            {...register("files")}
            onChange={(e) => setResources(e.target.files)}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Supported: PPTX, PDF, DOCX, PNG, JPG
          </p>
        </div>

       
          <div className="space-y-1">
            <Label className="font-semibold">Current Resources</Label>
            <div>
              <h3 className="text-sm text-muted-foreground">{resources?.length} Files Selected</h3>
              
            </div>
          </div>
        

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="secondary"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            <Upload className="h-4 w-4 mr-1" />
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        {message && <p className="text-sm pt-2">{message}</p>}
      </form>
    </BaseModal>
  );
}