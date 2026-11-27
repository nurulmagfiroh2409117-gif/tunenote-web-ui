"use client";

import { useState, useEffect } from "react";
import TopBar from "@/components/TopBar";
import TrackSkeleton from "@/components/TrackSkeleton";
import Link from "next/link";
import { Heart, Star, TrendingUp } from "lucide-react";

interface Track {
  id: number;
  title: string;
  artist: string;
  album: string;
  year?: string;
  genre: string;
  isAvailable: boolean;
  rating?: number;
  cover?: string;
}

const extendedTracks: Track[] = [
  { id: 1, title: "BEAUTIFUL", artist: "TREASURE", album: "TREASURE - 2021", year: "2021", genre: "K-Pop", isAvailable: true, rating: 4.8, cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&q=80" },
  { id: 2, title: "BEAUTIFUL", artist: "SEVENTEEN", album: "SEVENTEEN - 2016", year: "2016", genre: "K-Pop", isAvailable: true, rating: 4.5, cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=200&q=80" },
  { id: 3, title: "BEAUTIFUL", artist: "EXO", album: "EXO - 2015", year: "2015", genre: "K-Pop", isAvailable: true, rating: 4.5, cover: "https://images.unsplash.com/photo-1468164016595-6108e4c60c8b?w=200&q=80" },
  { id: 4, title: "Beautiful", artist: "Wanna One", album: "Wanna One - 2017", year: "2017", genre: "K-Pop", isAvailable: false, rating: 4.3, cover: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=200&q=80" },
  { id: 5, title: "About You", artist: "The 1975", album: "Being Funny in a Foreign Language", genre: "Indie Pop", isAvailable: true, rating: 4.7, cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&q=80" },
  { id: 6, title: "Nights", artist: "Frank Ocean", album: "Blonde", genre: "Alternative R&B", isAvailable: true, rating: 4.9, cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&q=80" },
  { id: 7, title: "Cruel Summer", artist: "Taylor Swift", album: "Lover", genre: "Pop", isAvailable: true, rating: 4.6, cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&q=80" },
  { id: 8, title: "505", artist: "Arctic Monkeys", album: "Favourite Worst Nightmare", genre: "Indie Rock", isAvailable: false, rating: 4.8, cover: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=200&q=80" },
];

export default function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<"All" | "Songs" | "Albums">("All");
  const [liked, setLiked] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setTracks(extendedTracks);
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

  const hasSearched = searchQuery.trim().length > 0;

  return (
    <div className="p-6 md:p-8">
      <TopBar title="Discover" searchValue={searchQuery} onSearchChange={setSearchQuery} />

      {!hasSearched && (
        <div
          className="relative rounded-3xl p-8 mb-8 overflow-hidden flex flex-col justify-end min-h-[180px]"
          style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #3730a3 60%, #6d28d9 100%)" }}
        >
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80')", backgroundSize: "cover", backgroundPosition: "center" }} />
          <div className="relative z-10">
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-widest block mb-2">🔥 Search & Discover</span>
            <h2 className="text-2xl font-black text-white mb-1 leading-tight">Find the music<br />that moves you.</h2>
            <p className="text-xs text-indigo-200">Search from thousands of songs, albums, and artists.</p>
          </div>
        </div>
      )}

      <section>
        {hasSearched && (
          <div className="mb-5">
            <h2 className="text-base font-bold text-gray-900 mb-1">Search Results</h2>
            <p className="text-xs text-gray-400">for &quot;{searchQuery}&quot;</p>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-5 bg-gray-100 p-1 rounded-2xl w-fit">
          {(["All", "Songs", "Albums"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition ${activeFilter === f ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              {f}
            </button>
          ))}
        </div>

        {!hasSearched && (
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={15} className="text-violet-600" />
            <span className="text-sm font-bold text-gray-900">Trending</span>
          </div>
        )}

        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((item) => <TrackSkeleton key={item} />)}
          </div>
        ) : filteredTracks.length > 0 ? (
          <div className="space-y-3">
            {filteredTracks.map((track) => (
              <Link href={`/detail?id=${track.id}`} key={track.id} className="group">
                <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                    <img
                      src={track.cover || `https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&q=80`}
                      alt={track.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">{track.title}</p>
                    <p className="text-xs text-gray-500 truncate">{track.album}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="flex items-center gap-1">
                      <Star size={11} className="text-amber-500 fill-amber-500" />
                      <span className="text-xs font-bold text-gray-700">{track.rating || 4.5}</span>
                    </div>
                    <button
                      onClick={(e) => { e.preventDefault(); setLiked(l => ({ ...l, [track.id]: !l[track.id] })); }}
                      className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-red-50 transition"
                    >
                      <Heart size={12} className={liked[track.id] ? "text-red-500 fill-red-500" : "text-gray-300"} />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-gray-100 rounded-2xl p-10 text-center shadow-sm">
            <p className="text-sm font-bold text-gray-700">No results found</p>
            <p className="text-xs text-gray-400 mt-1">Try a different keyword or check the spelling.</p>
          </div>
        )}
      </section>
    </div>
  );
}