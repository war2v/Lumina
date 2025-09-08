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
import { Upload } from "lucide-react";
import BaseModal from "./BaseModal";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import CreatePresentationForm from "@/components/forms/createPresentationForm";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  files: z.any().optional(),
  tags: z.string().optional(),
});

type CreatePresentationFormData = z.infer<typeof schema>;

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