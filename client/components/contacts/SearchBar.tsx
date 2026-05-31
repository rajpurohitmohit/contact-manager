"use client";

import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useContactStore } from "@/stores/contactStore";

export default function SearchBar() {
  const { searchQuery, setSearch } = useContactStore();
  const [value, setValue] = useState(searchQuery);
  const ref = useRef<HTMLInputElement>(null);

  // Debounce
  useEffect(() => {
    const t = setTimeout(() => setSearch(value), 280);
    return () => clearTimeout(t);
  }, [value, setSearch]);

  // Clear on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setValue(""); ref.current?.blur(); }
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); ref.current?.focus(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="relative">
      <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none" />
      <input
        ref={ref}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search contacts… (⌘K)"
        className={cn(
          "h-9 w-full sm:w-[280px] rounded-[8px] border border-[#E5E7EB] bg-white",
          "pl-9 pr-8 text-sm text-[#111827] placeholder:text-[#9CA3AF]",
          "focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5]",
          "transition-colors duration-150 hover:border-[#D1D5DB]"
        )}
      />
      {value && (
        <button
          onClick={() => setValue("")}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280] transition-colors cursor-pointer"
        >
          <X size={13} />
        </button>
      )}
    </div>
  );
}
