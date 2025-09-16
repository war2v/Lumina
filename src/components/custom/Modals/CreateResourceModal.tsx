"use client";
import { Label } from "@/components/ui/label";
import BaseModal from "./BaseModal";

import { Input } from "@/components/ui/input";

export type Resource = {
  id: string;
  file_name: string;
  file_type: string;
  bucket_path: string;
};

export default function CreateResourceModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <BaseModal title="Create Resource" open={open} onOpenChange={onOpenChange}>
      <form>
        <div>
          <Label htmlFor="files">File Name</Label>
          <Input id="name" type="text" />
        </div>
        <div>
          <Label htmlFor="files">Upload New Resources</Label>
          <Input
            id="files"
            type="file"
            multiple
            accept=".pptx,.pdf,.docx,.png,.jpg,.jpeg"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Supported: PPTX, PDF, DOCX, PNG, JPG
          </p>
        </div>
      </form>
    </BaseModal>
  );
}
