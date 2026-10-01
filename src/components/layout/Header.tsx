"use client";

import { siteConfig } from "@/config/site";

export function Header({ onOpenNav }: { onOpenNav: () => void }) {
  return (
    <header className="flex h-16 items-center gap-3 border-b border-slate-200 bg-white px-4 sm:px-6">
      <button
        type="button"
        onClick={onOpenNav}
        aria-label="Open navigation"
        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50 lg:hidden"
      >
        <span aria-hidden="true">☰</span>
      </button>

      <div className="hidden items-center gap-2 lg:flex">
        <p className="text-sm font-semibold text-slate-900">{siteConfig.name}</p>
      </div>

      <div className="flex flex-1 justify-center sm:justify-start">
        <label htmlFor="global-search" className="sr-only">
          Search (coming soon)
        </label>
        <input
          id="global-search"
          type="search"
          placeholder="Search products, customers, invoices… (soon)"
          disabled
          className="w-full max-w-md rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-500 placeholder:text-slate-400 disabled:cursor-not-allowed"
        />
      </div>

      <div className="flex items-center gap-2">
        <span className="hidden rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 sm:inline">
          Demo workspace
        </span>
        <button
          type="button"
          aria-label="Account (placeholder)"
          title="Account — authentication lands in a later milestone"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-600"
        >
          <span aria-hidden="true">A</span>
        </button>
      </div>
    </header>
  );
}
