"use client";

import { useState } from "react";
import TopBar from "@/components/TopBar";
import { Star, Heart, MessageSquare, Music, Settings } from "lucide-react";
import Link from "next/link";
import RegisterModal from "@/components/RegisterModal";

const activity = [
  { id: "a1", type: "review", user: "xu minghao", text: "reviewed a song", song: "Mystery of Love", artist: "Sufjan Stevens", time: "2 hours ago", avatar: "M", color: "#7c3aed", cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&q=80", rating: 4 },
  { id: "a2", type: "diary", user: "xu minghao", text: "added to diary", song: "About You", artist: "The 1975", time: "1 day ago", avatar: "M", color: "#7c3aed", cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=200&q=80", rating: 5 },
  { id: "a3", type: "like", user: "xu minghao", text: "liked a song", song: "Cruel Summer", artist: "Taylor Swift", time: "2 days ago", avatar: "M", color: "#7c3aed", cover: "https://images.unsplash.com/photo-1468164016595-6108e4c60c8b?w=200&q=80", rating: 0 },
];

const reviews = [
  { id: "r1", song: "Mystery of Love", artist: "Sufjan Stevens", cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&q=80", rating: 4, text: "A truly beautiful and haunting piece. Perfect for quiet evenings.", likes: 42 },
  { id: "r2", song: "About You", artist: "The 1975", cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=200&q=80", rating: 5, text: "One of the best songs of 2023. The production is phenomenal.", likes: 89 },
];

const diaryEntries = [
  { id: "d1", song: "Super Shy", artist: "NewJeans", cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&q=80", date: "28 Sep 2026", note: "such a fun song" },
  { id: "d2", song: "Lovesick Girls", artist: "BLACKPINK", cover: "https://images.unsplash.com/photo-1468164016595-6108e4c60c8b?w=200&q=80", date: "28 Sep 2026", note: "BLACKPINK best group" },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"Activity" | "Reviews" | "Diary">("Activity");
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div>
      {/* Cover Photo */}
      <div className="relative h-48 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80"
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="p-6 md:p-8">
        {/* Profile Header */}
        <div className="flex items-end justify-between gap-4 -mt-14 mb-6">
          <div className="flex items-end gap-4">
            <div className="w-20 h-20 rounded-2xl bg-violet-600 border-4 border-white flex items-center justify-center text-white font-black text-2xl shadow-lg shrink-0">
              M
            </div>
            <div className="pb-1">
              <h1 className="text-xl font-black text-gray-900">xu minghao</h1>
              <p className="text-sm text-gray-500">@xuminghao_x</p>
            </div>
          </div>
          <div className="flex gap-2 pb-1">
            <button
              onClick={() => setShowRegister(true)}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-violet-600 text-white hover:bg-violet-700 transition"
            >
              Edit Profile
            </button>
            <Link href="/settings" className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition">
              <Settings size={15} className="text-gray-600" />
            </Link>
          </div>
        </div>

        {/* Bio & Stats */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm mb-6">
          <p className="text-sm text-gray-700 mb-1 font-medium">music is all</p>
          <p className="text-xs text-gray-400 mb-4">Seoul, South Korea · Joined Feb 2019</p>
          <div className="flex gap-6">
            <div className="text-center">
              <p className="text-base font-black text-gray-900">240</p>
              <p className="text-[10px] text-gray-400">Following</p>
            </div>
            <div className="text-center">
              <p className="text-base font-black text-gray-900">1.2k</p>
              <p className="text-[10px] text-gray-400">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-base font-black text-gray-900">328</p>
              <p className="text-[10px] text-gray-400">Songs Logged</p>
            </div>
            <div className="text-center">
              <p className="text-base font-black text-gray-900">4.6</p>
              <p className="text-[10px] text-gray-400">Avg Rating</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-5 bg-gray-100 p-1 rounded-2xl w-fit">
          {(["Activity", "Reviews", "Diary"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${activeTab === tab ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Activity Tab */}
        {activeTab === "Activity" && (
          <div className="space-y-3">
            {activity.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-start gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0" style={{ background: item.color }}>
                  {item.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-600">
                    <span className="font-bold text-gray-900">{item.user}</span> {item.text}
                  </p>
                  <div className="flex items-center gap-3 mt-2 p-2.5 bg-gray-50 rounded-xl">
                    <div className="w-9 h-9 rounded-lg overflow-hidden shrink-0">
                      <img src={item.cover} alt={item.song} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-gray-900 truncate">{item.song}</p>
                      <p className="text-[10px] text-gray-500 truncate">{item.artist}</p>
                    </div>
                    {item.rating > 0 && (
                      <div className="flex items-center gap-0.5">
                        {[1,2,3,4,5].map((s) => (
                          <Star key={s} size={9} className={s <= item.rating ? "text-amber-500 fill-amber-500" : "text-gray-200 fill-gray-200"} />
                        ))}
                      </div>
                    )}
                    {item.type === "like" && <Heart size={12} className="text-red-500 fill-red-500" />}
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === "Reviews" && (
          <div className="space-y-3">
            {reviews.map((review) => (
              <Link href={`/detail`} key={review.id} className="block">
                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition">
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-xl overflow-hidden shrink-0">
                      <img src={review.cover} alt={review.song} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-900 truncate">{review.song}</p>
                      <p className="text-xs text-gray-500 mb-1">{review.artist}</p>
                      <div className="flex gap-0.5 mb-2">
                        {[1,2,3,4,5].map((s) => (
                          <Star key={s} size={10} className={s <= review.rating ? "text-amber-500 fill-amber-500" : "text-gray-200 fill-gray-200"} />
                        ))}
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">{review.text}</p>
                      <div className="flex items-center gap-1 mt-2">
                        <Heart size={10} className="text-gray-400" />
                        <span className="text-[10px] text-gray-400">{review.likes} likes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Diary Tab */}
        {activeTab === "Diary" && (
          <div className="space-y-3">
            {diaryEntries.map((entry) => (
              <Link href="/diary" key={entry.id} className="block">
                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl overflow-hidden shrink-0">
                    <img src={entry.cover} alt={entry.song} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">{entry.song}</p>
                    <p className="text-xs text-gray-500 truncate">{entry.artist}</p>
                    <p className="text-[10px] text-gray-400 mt-1">{entry.date} · {entry.note}</p>
                  </div>
                  <Music size={14} className="text-gray-300 shrink-0" />
                </div>
              </Link>
            ))}
            <Link href="/diary" className="block text-center text-xs font-semibold text-violet-600 hover:text-violet-700 py-2">
              View full diary →
            </Link>
          </div>
        )}
      </div>

      <RegisterModal isOpen={showRegister} onClose={() => setShowRegister(false)} />
    </div>
  );
}
