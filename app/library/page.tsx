"use client";

import TopBar from "@/components/TopBar";
import { Heart, ChevronRight, Plus } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const librarySongs = [
  { id: "l1", title: "Paris (Texas)", artist: "Lana Del Rey", cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&q=80", addedDaysAgo: 1 },
  { id: "l2", title: "DTMF", artist: "Rod Delay", cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&q=80", addedDaysAgo: 2 },
  { id: "l3", title: "About You", artist: "The1975", cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=200&q=80", addedDaysAgo: 3 },
  { id: "l4", title: "Jealousy", artist: "Taylor Swift", cover: "https://images.unsplash.com/photo-1468164016595-6108e4c60c8b?w=200&q=80", addedDaysAgo: 4 },
  { id: "l5", title: "Cruel Summer", artist: "Taylor Swift", cover: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=200&q=80", addedDaysAgo: 5 },
  { id: "l6", title: "Best Part", artist: "Daniel Caesar", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&q=80", addedDaysAgo: 6 },
];

const collections = [
  { name: "Favorite", count: 24, color: "#fef3c7", icon: "⭐" },
  { name: "Want to Listen", count: 18, color: "#ede9fe", icon: "🎧" },
  { name: "Add to cart", count: 7, color: "#ecfdf5", icon: "🛒" },
];

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState<"Songs" | "Albums" | "Artist">("Songs");
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  return (
    <div className="p-6 md:p-8">
      <TopBar title="My Library" />

      {/* Collections */}
      <section className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-sm font-bold text-gray-900">Collections</h2>
          <button className="text-xs font-semibold text-violet-600 flex items-center gap-1 hover:text-violet-700">
            <Plus size={12} /> New
          </button>
        </div>
        <div className="flex gap-3">
          {collections.map((col) => (
            <div
              key={col.name}
              className="flex-1 p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition cursor-pointer"
              style={{ background: col.color }}
            >
              <span className="text-2xl block mb-1">{col.icon}</span>
              <p className="text-xs font-bold text-gray-900">{col.name}</p>
              <p className="text-[10px] text-gray-500">{col.count} songs</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recently Added */}
      <section>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-sm font-bold text-gray-900">Recently Added</h2>
          <button className="text-xs font-semibold text-violet-600 flex items-center gap-1 hover:text-violet-700">
            See all <ChevronRight size={12} />
          </button>
        </div>

        {/* Tab Filters */}
        <div className="flex gap-2 mb-4 bg-gray-100 p-1 rounded-2xl w-fit">
          {(["Songs", "Albums", "Artist"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition ${activeTab === tab ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          {librarySongs.map((song) => (
            <Link href={`/detail?id=${song.id}`} key={song.id} className="group">
              <div className="bg-white rounded-2xl p-3 border border-gray-100 shadow-sm hover:shadow-md transition flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl overflow-hidden shrink-0">
                  <img src={song.cover} alt={song.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">{song.title}</p>
                  <p className="text-xs text-gray-500 truncate">{song.artist}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] text-gray-400">{song.addedDaysAgo}d ago</span>
                  <button
                    onClick={(e) => { e.preventDefault(); setLiked(l => ({ ...l, [song.id]: !l[song.id] })); }}
                    className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-red-50 transition"
                  >
                    <Heart size={13} className={liked[song.id] ? "text-red-500 fill-red-500" : "text-gray-300"} />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}