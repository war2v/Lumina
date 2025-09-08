"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { User } from "@supabase/supabase-js";
import { Account } from "@/lib/queries/server/getAccount";
import Image from "next/image";
import { ImageIcon } from "lucide-react";

import { UpdateUserData } from "@/lib/actions/updateUserData";
import { useRouter } from "next/navigation";
import { uploadProfilePicture } from "@/lib/actions/uploadProfilePicture";
import { useState } from "react";
import Link from "next/link";

const schema = z.object({
  username: z
    .string()
    .min(4, "username must be at least 4 characters")
    .optional(),
  first_name: z.string().min(1, "Atleast 1 character required").optional(),
  last_name: z.string().min(1, "Atleast 1 character required").optional(),
  role: z.enum(["attendee", "presenter"]).optional(),
  bio: z.string().max(300, "Bio must be under 300 characters").optional(),
  profile_image_url: z.any().optional(),
});

export type UserFormData = z.infer<typeof schema>;

interface UpdateUserFormProps {
  user: User;
  account: Account | null;
}

export default function UpdateUserForm({ user, account }: UpdateUserFormProps) {
  const router = useRouter();
  const {
    getValues,
    watch,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    resolver: zodResolver(schema),
  });

  const [pfpFile, setPfpFile] = useState<string | null>();
  const filelist = getValues("profile_image_url");
  ////console.log(URL.createObjectURL(filelist[0]))
  const onSubmit = async (data: UserFormData) => {
    let url = null;
    if (data.profile_image_url[0]) {
      url = await uploadProfilePicture(data.profile_image_url[0]);
    }

    ////console.log(url?.fullPath)

    const formated_data: UserFormData = {
      username: data.username ? data.username : account?.username,
      first_name: data.first_name ? data.first_name : account?.first_name,
      last_name: data.last_name ? data.last_name : account?.last_name,
      bio: data.bio ? data.bio : account?.bio,
      role: data.role ? data.role : account?.role,
      profile_image_url: url?.fullPath
        ? url?.fullPath
        : account?.profile_image_url,
    };

    UpdateUserData(formated_data, user.id);
    router.refresh();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 max-w-lg w-1/2 flex flex-col gap-y-2"
    >
      <div>
        <Button variant="outline">
          <Link href="/user/home">Dashboard</Link>
        </Button>
      </div>
      <div>
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          defaultValue={account?.username}
          {...register("username")}
        />
        {errors.username && (
          <p className="text-sm text-red-500">{errors.username.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="first_name">First Name</Label>
        <Input
          id="first_name"
          defaultValue={account?.first_name}
          {...register("first_name")}
        />
        {errors.first_name && (
          <p className="text-sm text-red-500">{errors.first_name.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="last_name">Last Name</Label>
        <Input
          id="last_name"
          defaultValue={account?.last_name}
          {...register("last_name")}
        />
        {errors.last_name && (
          <p className="text-sm text-red-500">{errors.last_name.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="role">Role</Label>
        <RadioGroup
          defaultValue={account?.role}
          {...register("role")}
          className="flex justify-center"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              {...register("role")}
              value="attendee"
              id="attendee"
            />
            <Label htmlFor="attendee">Attendee</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              {...register("role")}
              value="presenter"
              id="presenter"
            />
            <Label htmlFor="presenter">Presenter</Label>
          </div>
        </RadioGroup>
        {errors.role && (
          <p className="text-sm text-red-500">{errors.role.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          defaultValue={account?.bio}
          {...register("bio")}
          rows={4}
        />
        {errors.bio && (
          <p className="text-sm text-red-500">{errors.bio.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="profile_image_url">Profile Image</Label>
        <div className="flex">
          <div className="flex gap-x-2">
            <div>
              <h3 className="text-sm text-muted-foreground">Current</h3>
              {account?.profile_image_url ? (
                <Image
                  alt="Profile Image"
                  className="w-full h-full rounded-lg max-h-[50px] max-w-[50px]"
                  width={30}
                  height={30}
                  src={
                    process.env.NEXT_PUBLIC_SUPABASE_PROFILE_PICTURE_URL +
                    account?.profile_image_url
                  }
                />
              ) : (
                <ImageIcon className="w-full h-[50px]  max-w-[50px] " />
              )}
            </div>

            <div>
              <h3 className="text-sm text-muted-foreground">Preview</h3>
              {pfpFile ? (
                <Image
                  alt="Profile Image"
                  className="w-full h-full rounded-lg max-h-[50px] max-w-[50px]"
                  width={30}
                  height={30}
                  src={URL.createObjectURL(filelist[0])}
                />
              ) : (
                <ImageIcon className="w-full h-[50px] max-w-[50px]" />
              )}
            </div>
          </div>

          <div className="w-full flex flex-col pl-4">
            <Input
              id="profile_image_url"
              type="file"
              accept="image/*"
              {...register("profile_image_url")}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setPfpFile(URL.createObjectURL(file));
                } else {
                  setPfpFile(null);
                }
              }}
            />
            <p className="text-xs text-muted-foreground mt-1">
              JPG, PNG, or GIF. Max 5MB.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Update Profile"}
        </Button>
      </div>
    </form>
  );
}
