import TrackGrid from "@/components/TrackGrid";
import Link from "next/link";

export default function CatalogPage() {
  return (
    <div className="p-6 md:p-8">
      {/* Top Bar: Judul Halaman, Kolom Pencarian & Tombol Login/Register */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-extrabold text-gray-900">Discover</h1>

        <div className="flex items-center gap-4 flex-1 justify-end">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search for songs, albums, artists..."
              className="w-full pl-10 pr-4 py-2 rounded-full text-xs bg-white border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
            <span className="absolute left-3 top-2.5 text-xs text-gray-400">🔍</span>
          </div>

          {/* Tombol Login & Register Pengunjung */}
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

      {/* Hero Banner Gelap TRACKLOG */}
      <div className="relative bg-slate-900 text-white rounded-3xl p-8 mb-8 overflow-hidden flex flex-col justify-center min-h-[200px]">
        <div className="relative z-10 max-w-lg">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2">
            Good music deserves a place in your diary.
          </h2>
          <p className="text-xs text-slate-300 mb-6">
            Find, log, review, and collect the music that moves you.
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search for songs, albums, artists..."
              className="px-4 py-2.5 rounded-full text-xs text-gray-900 bg-white w-full max-w-xs focus:outline-none"
            />
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2.5 rounded-full">
              🔍
            </button>
          </div>
        </div>
      </div>

      {/* Seksi Grid Musik Responsif */}
      <TrackGrid />
    </div>
  );
}