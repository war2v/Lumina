"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useLogout } from "@/hooks/useLogout";

import { useRouter } from "next/navigation";
import { ThemeSelector } from "./ThemeSelector";
import Image from "next/image";
import { Account } from "@/lib/queries/server/getAccount";

interface Props {
  account: Account | null;
  title?: string;
}

export default function Header({ account , title = "Dashboard"}: Props) {
  const router = useRouter();
  const logout = useLogout();
  //console.log(account);

  return (
    <header className="flex items-center justify-between border-b px-6 py-4">
      <h1 className="text-xl font-semibold">{title}</h1>
      <div className="flex items-center gap-4">
       
        <ThemeSelector />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              {account ? (
                <Image
                  width={60}
                  height={50}
                  alt="U"
                  src={
                    account.profile_image_url
                      ? process.env.NEXT_PUBLIC_SUPABASE_PROFILE_PICTURE_URL +
                        account.profile_image_url
                      : "/globe.svg"
                  }
                />
              ) : (
                <AvatarFallback>U</AvatarFallback>
              )}
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-48" align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push("/user/settings")}>
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="text-red-500">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
