'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b bg-white px-6 py-4">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
