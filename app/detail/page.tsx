"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import { ArrowLeft, Heart, Share2, Bookmark, Star, Play, Music, Mic2 } from "lucide-react";
import { useState, Suspense } from "react";

const SONG_DATA: Record<string, {
  title: string; artist: string; album: string; year: string; duration: string;
  rating: number; reviews: number; listeners: number; cover: string;
  comments: { user: string; avatar: string; color: string; text: string; likes: number; time: string }[];
  similarSongs: { title: string; artist: string; cover: string }[];
}> = {
  "1": {
    title: "I Don't Understand But I Luv You",
    artist: "SEVENTEEN",
    album: "FML",
    year: "2023",
    duration: "3:38",
    rating: 4.8,
    reviews: 2341,
    listeners: 42000,
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80",
    comments: [
      { user: "Nisha Williams", avatar: "N", color: "#db2777", text: "This is the most emotional song I've heard this year. The lyrics really hit different late at night.", likes: 234, time: "2 hours ago" },
      { user: "xu minghao", avatar: "M", color: "#7c3aed", text: "SEVENTEEN never misses 🔥 this song is on repeat all day.", likes: 112, time: "5 hours ago" },
    ],
    similarSongs: [
      { title: "April Shower", artist: "SEVENTEEN", cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=200&q=80" },
      { title: "Stargirl", artist: "THE WEEKND", cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&q=80" },
      { title: "Cruel Summer", artist: "Taylor Swift", cover: "https://images.unsplash.com/photo-1468164016595-6108e4c60c8b?w=200&q=80" },
    ],
  },
  default: {
    title: "Ultraviolence",
    artist: "Lana Del Rey",
    album: "Ultraviolence",
    year: "2014",
    duration: "5:04",
    rating: 4.7,
    reviews: 12400,
    listeners: 89000,
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80",
    comments: [
      { user: "Nisha Williams", avatar: "N", color: "#db2777", text: "Lana's voice on this album is absolutely haunting. A masterpiece.", likes: 892, time: "1 day ago" },
      { user: "xu minghao", avatar: "M", color: "#7c3aed", text: "This song never gets old. The production is perfect.", likes: 456, time: "3 days ago" },
    ],
    similarSongs: [
      { title: "Young and Beautiful", artist: "Lana Del Rey", cover: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=200&q=80" },
      { title: "Video Games", artist: "Lana Del Rey", cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=200&q=80" },
      { title: "Cruel Summer", artist: "Taylor Swift", cover: "https://images.unsplash.com/photo-1468164016595-6108e4c60c8b?w=200&q=80" },
    ],
  },
};

function DetailContent() {
  const params = useSearchParams();
  const songId = params.get("id") || "default";
  const song = SONG_DATA[songId] || SONG_DATA["default"];

  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<"review" | "details" | "similar">("review");
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="p-6 md:p-8">
      <TopBar title="Detail" showSearch={false} />

      {/* Back button */}
      <Link href="/" className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition mb-6">
        <ArrowLeft size={16} />
        Back
      </Link>

      {/* Song Header */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm mb-6">
        <div className="flex gap-5 items-start">
          <div className="relative shrink-0">
            <div className="w-28 h-28 rounded-2xl overflow-hidden shadow-lg">
              <img src={song.cover} alt={song.title} className="w-full h-full object-cover" />
            </div>
            <button className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-violet-600 flex items-center justify-center shadow-md hover:bg-violet-700 transition">
              <Play size={14} className="text-white ml-0.5" />
            </button>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h1 className="text-lg font-black text-gray-900 leading-tight mb-0.5">{song.title}</h1>
                <p className="text-sm font-semibold text-violet-600 mb-0.5">{song.artist}</p>
                <p className="text-xs text-gray-500">{song.album} · {song.year} · {song.duration}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => setLiked(!liked)} className={`w-8 h-8 rounded-full border flex items-center justify-center transition ${liked ? "bg-red-50 border-red-200" : "bg-gray-50 border-gray-200"}`}>
                  <Heart size={14} className={liked ? "text-red-500 fill-red-500" : "text-gray-500"} />
                </button>
                <button onClick={() => setSaved(!saved)} className={`w-8 h-8 rounded-full border flex items-center justify-center transition ${saved ? "bg-violet-50 border-violet-200" : "bg-gray-50 border-gray-200"}`}>
                  <Bookmark size={14} className={saved ? "text-violet-600 fill-violet-600" : "text-gray-500"} />
                </button>
                <button className="w-8 h-8 rounded-full border border-gray-200 bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition">
                  <Share2 size={14} className="text-gray-500" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} size={12} className={s <= Math.round(song.rating) ? "text-amber-500 fill-amber-500" : "text-gray-200 fill-gray-200"} />
                ))}
                <span className="text-xs font-bold text-gray-900 ml-1">{song.rating}</span>
              </div>
              <span className="text-xs text-gray-400">{song.reviews.toLocaleString()} reviews</span>
              <span className="text-xs text-gray-400">{(song.listeners/1000).toFixed(0)}k listeners</span>
            </div>

            <div className="flex gap-2 mt-3">
              <button className="px-4 py-1.5 rounded-full text-xs font-bold bg-gray-900 text-white hover:bg-gray-800 transition flex items-center gap-1.5">
                <Mic2 size={12} /> Add to Diary
              </button>
              <button className="px-4 py-1.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition">
                Write Review
              </button>
            </div>
          </div>
        </div>

        {/* Platform Links */}
        <div className="flex gap-3 mt-5 pt-5 border-t border-gray-100">
          <a href="#" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-50 text-green-700 text-xs font-bold hover:bg-green-100 transition">
            <span className="text-sm">🎵</span> Spotify
          </a>
          <a href="#" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 text-red-600 text-xs font-bold hover:bg-red-100 transition">
            <span className="text-sm">▶</span> YouTube Music
          </a>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-5 bg-gray-100 p-1 rounded-2xl w-fit">
        {(["review", "details", "similar"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition capitalize ${activeTab === tab ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
          >
            {tab === "review" ? "Review" : tab === "details" ? "Details" : "Similar Songs"}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "review" && (
        <div className="space-y-4">
          {/* Write Review */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <p className="text-xs font-semibold text-gray-700 mb-3">Write a Review</p>
            <div className="flex gap-1 mb-3">
              {[1,2,3,4,5].map((s) => (
                <button
                  key={s}
                  onMouseEnter={() => setHoverRating(s)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(s)}
                  className="transition"
                >
                  <Star size={18} className={s <= (hoverRating || rating) ? "text-amber-500 fill-amber-500" : "text-gray-200 fill-gray-200"} />
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts on this song..."
                className="flex-1 px-4 py-2.5 rounded-xl text-xs border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
              />
              <button className="px-4 py-2.5 rounded-xl text-xs font-bold bg-violet-600 text-white hover:bg-violet-700 transition">
                Post
              </button>
            </div>
          </div>

          {/* Comments */}
          {song.comments.map((c, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0" style={{ background: c.color }}>
                  {c.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-gray-900">{c.user}</span>
                    <span className="text-[10px] text-gray-400">{c.time}</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{c.text}</p>
                  <button className="flex items-center gap-1 mt-2 text-[10px] text-gray-400 hover:text-red-500 transition">
                    <Heart size={10} /> {c.likes}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "details" && (
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Artist", value: song.artist },
              { label: "Album", value: song.album },
              { label: "Year", value: song.year },
              { label: "Duration", value: song.duration },
              { label: "Total Reviews", value: song.reviews.toLocaleString() },
              { label: "Total Listeners", value: `${(song.listeners/1000).toFixed(0)}k` },
            ].map((item) => (
              <div key={item.label} className="p-3 bg-gray-50 rounded-xl">
                <p className="text-[10px] text-gray-400 font-medium mb-0.5">{item.label}</p>
                <p className="text-sm font-bold text-gray-900">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "similar" && (
        <div className="space-y-3">
          {song.similarSongs.map((s, i) => (
            <Link href="/detail" key={i} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition">
              <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0">
                <img src={s.cover} alt={s.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-900">{s.title}</p>
                <p className="text-xs text-gray-500">{s.artist}</p>
              </div>
              <div className="flex items-center gap-1">
                <Star size={12} className="text-amber-500 fill-amber-500" />
                <span className="text-xs font-bold text-gray-700">4.{5+i}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function DetailPage() {
  return (
    <Suspense fallback={<div className="p-8 text-gray-500">Loading...</div>}>
      <DetailContent />
    </Suspense>
  );
}