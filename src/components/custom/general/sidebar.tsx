"use client";

import { Home, FileText, LogOut, Search,  Monitor, Grid2X2Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useLogout } from "@/hooks/useLogout";

const url = "/user/home";
const navItems = [
  { label: "Home", icon: Home, href: `${url}` },
  { label: "Create", icon: Monitor, href: `${url}/create-presentation`, },
  { label: "Find", icon: Search, href: `${url}/find` },
  { label: "MyNotes", icon: FileText, href: `${url}/notes` },
  { label: "MyPresentations", icon: Grid2X2Plus, href: `${url}/mypresentations`}
];

export default function Sidebar() {
  const logout = useLogout();

  return (
    <aside className="border-r flex flex-col p-4 w-1/6 overflow-hidden">
      
      <Link href="/" className="flex">
        <Image src="/logo.svg" alt="Logo" width={180} height={30} />
      </Link>
      
      <nav className="space-y-3 flex-1 mt-4 p-2">
        {navItems.map(({ label, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            className="flex p-2 rounded-md border lg:border-0  justify-center lg:justify-normal items-center gap-3 text-sm font-medium text-muted-foreground hover:text-red-300 hover:border-red-300 transition"
          >
            <Icon className="h-4 w-4 min-h-4 min-w-4" />
            <div className="hidden lg:flex">
              {label}
            </div>
          </Link>
        ))}
      </nav>
      <Button
        onClick={logout}
        variant="outline"
        className="mt-auto flex gap-2 items-center"
      >
        <LogOut className="w-4 h-4" />
        Log Out
      </Button>
    </aside>
  );
}
