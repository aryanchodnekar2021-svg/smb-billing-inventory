"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="flex h-full flex-col">
      <div className="flex h-16 items-center gap-2 border-b border-slate-200 px-4">
        <div
          aria-hidden="true"
          className="flex h-8 w-8 items-center justify-center rounded-md bg-indigo-600 text-sm font-bold text-white"
        >
          B
        </div>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-slate-900">{siteConfig.name}</p>
          <p className="text-xs text-slate-500">Business manager</p>
        </div>
      </div>

      <ul className="flex-1 space-y-1 overflow-y-auto p-3">
        {primaryNav.map((item) => {
          const isActive =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onNavigate}
                aria-current={isActive ? "page" : undefined}
                title={item.description}
                className={cn(
                  "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="border-t border-slate-200 p-3">
        <p className="rounded-md bg-slate-50 px-3 py-2 text-xs leading-relaxed text-slate-500">
          Foundation build — navigation items are placeholders. Business features arrive in
          later milestones.
        </p>
      </div>
    </nav>
  );
}
