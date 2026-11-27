"use client";

import TopBar from "@/components/TopBar";
import { UserPlus, Music, Star, MessageSquare } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const followingUsers = [
  {
    id: "u1",
    name: "xu minghao",
    username: "@xuminghao_x",
    avatar: "M",
    color: "#7c3aed",
    location: "Seoul, South Korea",
    bio: "music is all",
    followers: "1.2k",
    following: 240,
    isFollowing: true,
    recentSong: { title: "Mystery of Love", artist: "Sufjan Stevens", cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&q=80" },
  },
  {
    id: "u2",
    name: "Nisha Williams",
    username: "@nishawilliams",
    avatar: "N",
    color: "#db2777",
    location: "New York, USA",
    bio: "indie & alternative lover",
    followers: "890",
    following: 156,
    isFollowing: true,
    recentSong: { title: "Cruel Summer", artist: "Taylor Swift", cover: "https://images.unsplash.com/photo-1468164016595-6108e4c60c8b?w=200&q=80" },
  },
  {
    id: "u3",
    name: "Luka Bright",
    username: "@lukabright",
    avatar: "L",
    color: "#0891b2",
    location: "London, UK",
    bio: "curator & music blogger",
    followers: "3.4k",
    following: 512,
    isFollowing: false,
    recentSong: { title: "About You", artist: "The 1975", cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=200&q=80" },
  },
  {
    id: "u4",
    name: "Jamie Rivers",
    username: "@jamiemusic",
    avatar: "J",
    color: "#059669",
    location: "Tokyo, Japan",
    bio: "k-pop & j-pop enthusiast",
    followers: "2.1k",
    following: 388,
    isFollowing: false,
    recentSong: { title: "Super Shy", artist: "NewJeans", cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&q=80" },
  },
];

export default function FollowingPage() {
  const [following, setFollowing] = useState<Record<string, boolean>>(
    Object.fromEntries(followingUsers.map((u) => [u.id, u.isFollowing]))
  );
  const [activeTab, setActiveTab] = useState<"Following" | "Suggested">("Following");

  const displayedUsers = activeTab === "Following"
    ? followingUsers.filter((u) => following[u.id])
    : followingUsers.filter((u) => !following[u.id]);

  return (
    <div className="p-6 md:p-8">
      <TopBar title="Following" />

      {/* Tab Filters */}
      <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-2xl w-fit">
        {(["Following", "Suggested"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-xl text-xs font-semibold transition ${activeTab === tab ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {displayedUsers.length > 0 ? displayedUsers.map((user) => (
          <div key={user.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition">
            <div className="flex items-start gap-4">
              <Link href="/profile">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 cursor-pointer hover:scale-105 transition"
                  style={{ background: user.color }}
                >
                  {user.avatar}
                </div>
              </Link>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <Link href="/profile">
                      <p className="text-sm font-bold text-gray-900 hover:text-violet-600 transition">{user.name}</p>
                    </Link>
                    <p className="text-xs text-gray-400">{user.username}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{user.bio}</p>
                  </div>
                  <button
                    onClick={() => setFollowing((f) => ({ ...f, [user.id]: !f[user.id] }))}
                    className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold transition shrink-0 ${
                      following[user.id]
                        ? "bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600"
                        : "bg-violet-600 text-white hover:bg-violet-700"
                    }`}
                  >
                    {!following[user.id] && <UserPlus size={11} />}
                    {following[user.id] ? "Following" : "Follow"}
                  </button>
                </div>

                <div className="flex items-center gap-4 mt-3">
                  <span className="text-xs text-gray-500"><span className="font-bold text-gray-900">{user.followers}</span> Followers</span>
                  <span className="text-xs text-gray-500"><span className="font-bold text-gray-900">{user.following}</span> Following</span>
                  <span className="text-xs text-gray-400">{user.location}</span>
                </div>

                {/* Recent Activity */}
                <div className="mt-3 flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0">
                    <img src={user.recentSong.cover} alt={user.recentSong.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-gray-400 font-medium">Recently listened</p>
                    <p className="text-xs font-semibold text-gray-800 truncate">{user.recentSong.title}</p>
                    <p className="text-[10px] text-gray-500 truncate">{user.recentSong.artist}</p>
                  </div>
                  <Link href="/detail" className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition shrink-0">
                    <Music size={12} className="text-gray-500" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )) : (
          <div className="bg-white rounded-2xl p-10 border border-gray-100 text-center shadow-sm">
            <p className="text-sm font-bold text-gray-700">
              {activeTab === "Following" ? "You're not following anyone yet" : "No suggestions right now"}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {activeTab === "Following" ? "Discover users to follow!" : "Check back later for new suggestions."}
            </p>
            {activeTab === "Following" && (
              <button onClick={() => setActiveTab("Suggested")} className="mt-4 px-5 py-2 rounded-xl bg-violet-600 text-white text-xs font-bold hover:bg-violet-700 transition">
                Find Users
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}