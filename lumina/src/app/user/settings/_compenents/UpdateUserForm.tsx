"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const schema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  bio: z.string().max(300, "Bio must be under 300 characters").optional(),
  profileImage: z.any().optional(),
});

type UserFormData = z.infer<typeof schema>;

export default function UpdateUserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: UserFormData) => {
    //console.log("Form submitted", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 max-w-lg w-1/2"
    >
      <div>
        <Label htmlFor="fullName">Full Name</Label>
        <Input id="fullName" {...register("fullName")} />
        {errors.fullName && (
          <p className="text-sm text-red-500">{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="bio">Bio</Label>
        <Textarea id="bio" {...register("bio")} rows={4} />
        {errors.bio && (
          <p className="text-sm text-red-500">{errors.bio.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="profileImage">Profile Image</Label>
        <Input
          id="profileImage"
          type="file"
          accept="image/*"
          {...register("profileImage")}
        />
        <p className="text-xs text-muted-foreground mt-1">
          JPG, PNG, or GIF. Max 5MB.
        </p>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Update Profile"}
        </Button>
      </div>
    </form>
  );
}
