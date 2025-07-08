// app/home/layout.tsx
import type { ReactNode } from "react";
import Sidebar from "@/components/custom/general/sidebar";
import Header from "@/components/custom/general/header";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-muted">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
