// app/home/layout.tsx
import type { ReactNode } from "react";
import Sidebar from "@/components/custom/general/sidebar";
import Header from "@/components/custom/general/header";
import { getAccount } from "@/lib/queries/server/getAccount";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const account = await getAccount()
  
  return (
    <div className="flex h-full overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header account={account} />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
