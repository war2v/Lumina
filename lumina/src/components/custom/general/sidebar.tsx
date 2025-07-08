"use client";

import { Home, FileText, LogOut, Search,  Monitor, Grid2X2Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useLogout } from "@/hooks/useLogout";

const url = "/user/home";
const navItems = [
  { label: "Home", icon: Home, href: `${url}` },
  { label: "Create Presentation", icon: Monitor, href: `${url}/create-presentation`, },
  { label: "Find Presentation", icon: Search, href: `${url}/find` },
  { label: "My Notes", icon: FileText, href: `${url}/notes` },
  { label: "My Presentations", icon: Grid2X2Plus, href: `${url}/mypresentations`}
];

export default function Sidebar() {
  const logout = useLogout();

  return (
    <aside className="bg-muted/50 border-r flex flex-col p-4">
      <Link href="/" className="flex">
        <Image src="/logo.svg" alt="Logo" width={180} height={30} />
      </Link>
      <nav className="space-y-3 flex-1 mt-4 p-2">
        {navItems.map(({ label, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            className="flex items-center gap-3 text-sm font-medium text-muted-foreground hover:text-foreground transition"
          >
            <Icon className="h-4 w-4" />
            {label}
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
