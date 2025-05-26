'use client';

import { Home, FileText, LogOut } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useLogout } from '@/hooks/useLogout';


const navItems = [
  { label: 'Home', icon: Home, href: '/dashboard' },
  { label: 'Create Presentation', icon: Home, href: '/dashboard' },
  { label: 'Find Presentation', icon: Home, href: '/dashboard' },
  { label: 'My Notes', icon: FileText, href: '/dashboard/notes' },
];

export default function Sidebar() {
    const logout = useLogout();
    

    return (
    <aside className="w-64  bg-muted/50 border-r flex flex-col p-4">
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
      <Button onClick={logout} variant="outline" className="mt-auto flex gap-2 items-center">
        <LogOut className="w-4 h-4" />
        Log Out
      </Button>
    </aside>
  );
}
