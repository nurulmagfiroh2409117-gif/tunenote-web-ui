"use client";

import { Bell, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface TopBarProps {
  title: string;
  showSearch?: boolean;
  searchValue?: string;
  onSearchChange?: (v: string) => void;
}

export default function TopBar({ title, showSearch = true, searchValue = "", onSearchChange }: TopBarProps) {
  const [localSearch, setLocalSearch] = useState(searchValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(e.target.value);
    onSearchChange?.(e.target.value.toLowerCase());
  };

  return (
    <div className="flex items-center justify-between gap-4 mb-6">
      <h1 className="text-xl font-extrabold text-gray-900 shrink-0">{title}</h1>
      <div className="flex items-center gap-3 flex-1 justify-end">
        {showSearch && (
          <div className="relative max-w-xs w-full">
            <Search size={13} className="absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              value={localSearch}
              onChange={handleChange}
              placeholder="Search..."
              className="w-full pl-9 pr-4 py-2 rounded-full text-xs bg-white border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
            />
          </div>
        )}
        <button className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition">
          <Bell size={14} className="text-gray-500" />
        </button>
        <Link href="/profile">
          <div className="w-8 h-8 rounded-full bg-violet-600 text-white font-bold text-xs flex items-center justify-center cursor-pointer hover:bg-violet-700 transition">
            M
          </div>
        </Link>
      </div>
    </div>
  );
}
