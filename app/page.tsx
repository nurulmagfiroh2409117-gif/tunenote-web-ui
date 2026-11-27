"use client";

import Link from "next/link";
import TopBar from "@/components/TopBar";
import { Heart, Star, TrendingUp, ChevronRight } from "lucide-react";
import { useState } from "react";
import RegisterModal from "@/components/RegisterModal";

const trendingTracks = [
  { id: "1", title: "Ultraviolence", artist: "Lana Del Rey", year: "ULTRAVIOLENCE", rating: 4.7, reviews: "12.4k", cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80" },
  { id: "2", title: "Stargirl", artist: "THE WEEKND", year: "The Weeknd", rating: 4.5, reviews: "9.8k", cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&q=80" },
  { id: "3", title: "April Shower", artist: "SEVENTEEN", year: "SEVENTEEN", rating: 4.6, reviews: "8.3k", cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80" },
  { id: "4", title: "IF I", artist: "TREASURE", year: "TREASURE", rating: 4.3, reviews: "7.4k", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80" },
];

const recommendedItems = [
  { id: "r1", title: "Love to Hate Me", artist: "BLACKPINK", cover: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80" },
  { id: "r2", title: "Love to Die", artist: "Troye Sivan", cover: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400&q=80" },
  { id: "r3", title: "About You", artist: "The 1975", cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&q=80" },
  { id: "r4", title: "IYKYK", artist: "Various", cover: "https://images.unsplash.com/photo-1468164016595-6108e4c60c8b?w=400&q=80" },
];

export default function Home() {
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="p-6 md:p-8">
      <TopBar title="Home" />

      {/* Hero Banner */}
      <div
        className="relative rounded-3xl p-8 mb-8 overflow-hidden flex flex-col justify-end min-h-[220px]"
        style={{ background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 60%, #0ea5e9 100%)" }}
      >
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="relative z-10">
          <span className="text-xs font-bold text-violet-200 uppercase tracking-widest mb-2 block">🎵 TuneNote Featured</span>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-2 leading-tight">
            Good music deserves a<br />place in your diary.
          </h2>
          <p className="text-sm text-violet-100 mb-5">Find, log, review, and collect the music that moves you.</p>
          <div className="flex gap-3">
            <button
              onClick={() => setShowRegister(true)}
              className="px-5 py-2.5 rounded-full text-xs font-bold bg-white text-violet-700 hover:bg-violet-50 transition shadow-sm"
            >
              Mulai Sekarang →
            </button>
            <Link href="/discover" className="px-5 py-2.5 rounded-full text-xs font-bold bg-white/20 text-white border border-white/30 hover:bg-white/30 transition">
              Explore Music
            </Link>
          </div>
        </div>
      </div>

      {/* Trending Now */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp size={16} className="text-violet-600" />
            <h2 className="text-base font-bold text-gray-900">Trending Now</h2>
          </div>
          <Link href="/discover" className="text-xs font-semibold text-violet-600 hover:text-violet-700 flex items-center gap-1">
            See all <ChevronRight size={12} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {trendingTracks.map((track) => (
            <Link href={`/detail?id=${track.id}`} key={track.id} className="group">
              <div className="bg-white rounded-2xl p-3 border border-gray-100 shadow-sm hover:shadow-md transition-all">
                <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-3 bg-gray-100">
                  <img src={track.cover} alt={track.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                  <button
                    onClick={(e) => { e.preventDefault(); setLiked(l => ({ ...l, [track.id]: !l[track.id] })); }}
                    className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center transition"
                  >
                    <Heart size={12} className={liked[track.id] ? "text-red-400 fill-red-400" : "text-white"} />
                  </button>
                </div>
                <h3 className="text-xs font-bold text-gray-900 truncate">{track.title}</h3>
                <p className="text-[10px] text-gray-500 truncate mb-1.5">{track.artist}</p>
                <div className="flex items-center gap-1 text-[10px] font-bold text-gray-800">
                  <Star size={10} className="text-amber-500 fill-amber-500" />
                  {track.rating}
                  <span className="text-gray-400 font-normal">({track.reviews})</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recommended for You */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base font-bold text-gray-900">Recommended for You</h2>
          <button className="text-xs font-semibold text-violet-600 hover:text-violet-700 flex items-center gap-1">
            See all <ChevronRight size={12} />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {recommendedItems.map((item) => (
            <Link href={`/detail?id=${item.id}`} key={item.id} className="group">
              <div className="bg-white rounded-2xl p-3 border border-gray-100 shadow-sm hover:shadow-md transition flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl overflow-hidden shrink-0">
                  <img src={item.cover} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-gray-900 truncate">{item.title}</p>
                  <p className="text-[10px] text-gray-500 truncate">{item.artist}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <RegisterModal isOpen={showRegister} onClose={() => setShowRegister(false)} />
    </div>
  );
}