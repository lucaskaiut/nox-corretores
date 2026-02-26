"use client";

import { Sidebar } from "./sidebar";

interface SidebarLayoutProps {
  children: React.ReactNode;
}

export function SidebarLayout({ children }: SidebarLayoutProps) {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <Sidebar />
      <main className="pb-24 pt-14 md:pl-64 md:pt-8 md:pb-0">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}
