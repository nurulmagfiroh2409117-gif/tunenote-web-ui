"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import TrackSkeleton from "@/components/TrackSkeleton";
import tracksData from "@/data/tracks.json";

interface Track {
  id: number;
  title: string;
  artist: string;
  album: string;
  genre: string;
  isAvailable: boolean;
}

export default function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTracks(tracksData);
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const filteredTracks = tracks.filter((track) => {
    if (!searchQuery) return true;
    return (
      track.title.toLowerCase().includes(searchQuery) ||
      track.artist.toLowerCase().includes(searchQuery) ||
      track.album.toLowerCase().includes(searchQuery)
    );
  });

  return (
    <div className="p-6 md:p-8">
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

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-gray-900">
            {searchQuery ? `Hasil pencarian untuk "${searchQuery}"` : "Trending Now"}
          </h2>
          <span className="text-xs text-gray-500">
            {isLoading
              ? "Memuat katalog..."
              : `Menampilkan ${filteredTracks.length} lagu`}
          </span>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <TrackSkeleton key={item} />
            ))}
          </div>
        ) : filteredTracks.length > 0 ? (
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
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      track.isAvailable
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {track.isAvailable ? "Tersedia" : "Terbatas"}
                  </span>
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