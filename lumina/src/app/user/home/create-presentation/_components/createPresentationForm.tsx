"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@/lib/supabase/browserClient";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { redirect } from "next/navigation";
import { PresentationSchema } from "@/schema/Schema";


type PresentationFormData = z.infer<typeof PresentationSchema>;

export default function CreatePresentationForm({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PresentationFormData>({
    resolver: zodResolver(PresentationSchema),
    defaultValues: { isPublic: false },
  });

  const supabase = createClient();
  const [submitError, setSubmitError] = useState("");

  const onSubmit = async (Formdata: PresentationFormData) => {
    setSubmitError("");
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) {
      setSubmitError("User not authenticated.");
      return;
    }

    const { data, error } = await supabase
      .from("presentations")
      .insert({
        title: Formdata.title,
        description: Formdata.description,
        is_public: Formdata.isPublic,
        created_by: user.id,
        active: true,
      })
      .select();

    if (error) {
      setSubmitError(error.message);
    } else {
      redirect(`/user/home/presentations/${data[0].id}`);
      //redirect(`user/home/presentation/${}`)
      if (onSuccess) {
      }
    }
  };

  return (
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

      <div className="flex items-center justify-between">
        <Label htmlFor="isPublic">Public</Label>
        <Switch
          id="isPublic"
          onCheckedChange={(val) => setValue("isPublic", val)}
        />
      </div>

      {submitError && <p className="text-sm text-red-500">{submitError}</p>}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Create Presentation"}
      </Button>
    </form>
  );
}
