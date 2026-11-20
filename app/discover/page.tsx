// app/discover/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";

// Contoh data katalog lagu TuneNote (dapat disesuaikan dengan isi TrackGrid Anda)
const MUSIC_CATALOG = [
  { id: 1, title: "About You", artist: "The 1975", album: "Being Funny in a Foreign Language", genre: "Indie Pop" },
  { id: 2, title: "Nights", artist: "Frank Ocean", album: "Blonde", genre: "Alternative R&B" },
  { id: 3, title: "Cruel Summer", artist: "Taylor Swift", album: "Lover", genre: "Pop" },
  { id: 4, title: "505", artist: "Arctic Monkeys", album: "Favourite Worst Nightmare", genre: "Indie Rock" },
  { id: 5, title: "Best Part", artist: "Daniel Caesar ft. H.E.R.", album: "Freudian", genre: "R&B" },
  { id: 6, title: "Glimpse of Us", artist: "Joji", album: "SMITHEREENS", genre: "Ballad" },
];

export default function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Penyaringan (filter) dinamis real-time berdasarkan judul, artis, atau album
  const filteredTracks = MUSIC_CATALOG.filter((track) => {
    if (!searchQuery) return true;
    return (
      track.title.toLowerCase().includes(searchQuery) ||
      track.artist.toLowerCase().includes(searchQuery) ||
      track.album.toLowerCase().includes(searchQuery)
    );
  });

  return (
    <div className="p-6 md:p-8">
      {/* Top Bar: Judul Halaman (Kontrak Sosial), SearchBar & Tombol Autentikasi */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-extrabold text-gray-900">Discover</h1>

        <div className="flex items-center gap-4 flex-1 justify-end">
          <SearchBar onSearchChange={setSearchQuery} />

          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="px-4 py-2 text-xs font-bold text-gray-700 hover:text-gray-900 transition"
            >
              Masuk
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 text-xs font-bold bg-slate-900 text-white rounded-full hover:bg-slate-800 transition shadow-sm"
            >
              Daftar Gratis
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Banner Gelap TuneNote */}
      <div className="relative bg-slate-900 text-white rounded-3xl p-8 mb-8 overflow-hidden flex flex-col justify-center min-h-[180px]">
        <div className="relative z-10 max-w-lg">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2">
            Good music deserves a place in your diary.
          </h2>
          <p className="text-xs text-slate-300">
            Find, log, review, and collect the music that moves you.
          </p>
        </div>
      </div>

      {/* Seksi Hasil Katalog Musik Dinamis */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-gray-900">
            {searchQuery ? `Hasil pencarian untuk "${searchQuery}"` : "Trending Now"}
          </h2>
          <span className="text-xs text-gray-500">
            Menampilkan {filteredTracks.length} lagu
          </span>
        </div>

        {filteredTracks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTracks.map((track) => (
              <div
                key={track.id}
                className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                    {track.genre}
                  </span>
                  <span className="text-xs text-gray-400">♫</span>
                </div>
                <h3 className="text-sm font-bold text-gray-900">{track.title}</h3>
                <p className="text-xs font-medium text-gray-600">{track.artist}</p>
                <p className="text-[11px] text-gray-400 mt-1">{track.album}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
            <p className="text-sm font-semibold text-gray-800">
              Lagu atau artis tidak ditemukan
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Coba gunakan kata kunci lain atau periksa ejaan pencarian Anda.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}