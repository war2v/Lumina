"use client";

import BaseModal from "./BaseModal";
import CreatePresentationForm from "@/components/forms/createPresentationForm";


export type Resource = {
  id: string;
  file_name: string;
  file_type: string;
  bucket_path: string;
};

export default function CreatePresentationModal(
    {open,
    onOpenChange}:{
        open: boolean;
        onOpenChange: (open: boolean) => void;
    }
){

  return (
    <BaseModal title="Create Presentation" open={open} onOpenChange={onOpenChange}>
        <CreatePresentationForm />
    </BaseModal>
  );
}