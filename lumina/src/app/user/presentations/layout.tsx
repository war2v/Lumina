// app/home/layout.tsx
import type { ReactNode } from "react";
import Header from "../home/_components/header";

export default function PresentationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="h-full bg-muted">
      <Header />
      <main className="overflow-y-auto p-6">{children}</main>
    </div>
  );
}
