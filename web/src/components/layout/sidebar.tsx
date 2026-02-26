"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const MENU_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: HomeIcon },
  { href: "/customers", label: "Clientes", icon: UsersIcon },
  { href: "/insurance-companies", label: "Seguradoras", icon: BuildingIcon },
] as const;

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    </svg>
  );
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  );
}

function BuildingIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      />
    </svg>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, loading } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950 md:flex">
        <div className="flex h-16 items-center justify-between border-b border-neutral-200 px-4 dark:border-neutral-800">
          <Link
            href="/dashboard"
            className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-white"
          >
            Nox Corretores
          </Link>
          <ThemeToggle />
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-6 rounded-lg bg-neutral-100 p-4 dark:bg-neutral-900/50">
            <p className="truncate text-sm font-medium text-neutral-900 dark:text-white">
              {user?.name ?? "—"}
            </p>
            <p className="mt-0.5 truncate text-xs text-neutral-500">
              {user?.email ?? "—"}
            </p>
          </div>
          <nav className="space-y-1">
            {MENU_ITEMS.map(({ href, label, icon: Icon }) => {
              const isActive =
                pathname === href ||
                (href !== "/dashboard" && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#9333ea]/20 text-[#9333ea] dark:bg-[#9333ea]/20 dark:text-[#9333ea]"
                      : "text-neutral-400 hover:bg-neutral-800/50 hover:text-white dark:text-neutral-400 dark:hover:bg-neutral-800/50 dark:hover:text-white"
                  }`}
                >
                  <Icon className="size-5 shrink-0" />
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="border-t border-neutral-200 p-4 dark:border-neutral-800">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-neutral-400 hover:text-white"
            onClick={handleLogout}
            disabled={loading}
          >
            Sair
          </Button>
        </div>
      </aside>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-white pb-[env(safe-area-inset-bottom)] dark:border-neutral-800 dark:bg-neutral-950 md:hidden">
        <div className="flex justify-around">
          {MENU_ITEMS.map(({ href, label, icon: Icon }) => {
            const isActive =
              pathname === href ||
              (href !== "/dashboard" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`flex flex-1 flex-col items-center gap-1 px-2 py-3 text-xs transition-colors ${
                  isActive
                    ? "text-[#9333ea] dark:text-[#9333ea]"
                    : "text-neutral-500 hover:text-neutral-300 dark:text-neutral-500 dark:hover:text-neutral-300"
                }`}
              >
                <Icon className="size-5 shrink-0" />
                <span className="truncate">{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="fixed inset-x-0 top-0 z-30 flex h-14 items-center justify-between border-b border-neutral-200 bg-white px-4 dark:border-neutral-800 dark:bg-neutral-950 md:hidden">
        <span className="truncate text-sm font-medium text-neutral-900 dark:text-white">
          {user?.name ?? "Nox Corretores"}
        </span>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            disabled={loading}
            className="text-neutral-500 dark:text-neutral-400"
          >
            Sair
          </Button>
        </div>
      </div>
    </>
  );
}
