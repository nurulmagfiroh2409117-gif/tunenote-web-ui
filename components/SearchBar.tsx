"use client";

import { useState } from "react";

interface SearchBarProps {
  onSearchChange: (normalizedQuery: string) => void;
}

export default function SearchBar({ onSearchChange }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    setSearchTerm(rawValue);

    const normalizedQuery = rawValue.trim().toLowerCase();
    onSearchChange(normalizedQuery);
  };

  const handleClear = () => {
    setSearchTerm("");
    onSearchChange("");
  };

  return (
    <div className="relative flex-1 max-w-md">
      <label htmlFor="tunenote-search" className="sr-only">
        Cari judul lagu, album, atau artis
      </label>

      <span
        aria-hidden="true"
        className="absolute left-3.5 top-2.5 text-xs text-gray-500"
      >
        🔍
      </span>

      <input
        id="tunenote-search"
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Cari judul lagu, album, atau artis..."
        aria-label="Cari judul lagu, album, atau artis"
        className="w-full pl-10 pr-9 py-2 rounded-full text-xs bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-900"
      />

      {searchTerm && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Hapus kata kunci pencarian"
          className="absolute right-3 top-2 text-xs font-bold text-gray-500 hover:text-gray-900"
        >
          ✕
        </button>
      )}
    </div>
  );
}