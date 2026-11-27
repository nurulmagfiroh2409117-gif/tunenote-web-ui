"use client";

import TopBar from "@/components/TopBar";
import { ChevronLeft, ChevronRight, Plus, Music, Mic2, Trash2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const DIARY_DATA: Record<string, {
  date: string; dayOfWeek: string;
  entries: { id: string; title: string; artist: string; cover: string; note: string; color: string }[];
}[]> = {
  "Sep 2026": [
    {
      date: "28",
      dayOfWeek: "Mon",
      entries: [
        { id: "d1", title: "Super Shy", artist: "NewJeans", cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&q=80", note: "such a fun song", color: "#ede9fe" },
        { id: "d2", title: "Lovesick Girls", artist: "BLACKPINK", cover: "https://images.unsplash.com/photo-1468164016595-6108e4c60c8b?w=200&q=80", note: "we were born to be alone strong", color: "#fce7f3" },
        { id: "d3", title: "girlsnboys", artist: "THE 8 ft. Vernon", cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=200&q=80", note: "mengikuti dengan gaya", color: "#ecfdf5" },
      ],
    },
    {
      date: "27",
      dayOfWeek: "Sun",
      entries: [
        { id: "d4", title: "Cruel Summer", artist: "Taylor Swift", cover: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=200&q=80", note: "summer vibes 🌊", color: "#fef3c7" },
      ],
    },
  ],
  "Aug 2026": [
    {
      date: "15",
      dayOfWeek: "Sat",
      entries: [
        { id: "d5", title: "About You", artist: "The 1975", cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&q=80", note: "nostalgic sound", color: "#ede9fe" },
        { id: "d6", title: "Best Part", artist: "Daniel Caesar", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&q=80", note: "smooth R&B vibes", color: "#ecfdf5" },
      ],
    },
  ],
};

const MONTHS = ["Sep 2026", "Aug 2026", "Jul 2026"];

const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const WEEK_DATES = ["22", "23", "24", "25", "26", "27", "28"];

export default function DiaryPage() {
  const [activeMonth, setActiveMonth] = useState("Sep 2026");
  const [activeDay, setActiveDay] = useState("28");

  const monthData = DIARY_DATA[activeMonth] || [];
  const selectedDayData = monthData.find((d) => d.date === activeDay);

  return (
    <div className="p-6 md:p-8">
      <TopBar title="Music Diary" />

      {/* Month Navigation */}
      <div className="flex items-center gap-3 mb-5">
        <button className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition">
          <ChevronLeft size={14} className="text-gray-500" />
        </button>
        <div className="flex gap-2">
          {MONTHS.map((m) => (
            <button
              key={m}
              onClick={() => { setActiveMonth(m); setActiveDay("28"); }}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${activeMonth === m ? "bg-violet-600 text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-violet-300"}`}
            >
              {m}
            </button>
          ))}
        </div>
        <button className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition">
          <ChevronRight size={14} className="text-gray-500" />
        </button>
      </div>

      {/* Week Calendar Strip */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm mb-6">
        <div className="grid grid-cols-7 gap-1">
          {WEEK_DAYS.map((day, i) => (
            <div key={day} className="text-center">
              <p className="text-[9px] font-medium text-gray-400 mb-1">{day}</p>
              <button
                onClick={() => setActiveDay(WEEK_DATES[i])}
                className={`w-8 h-8 rounded-full text-xs font-bold mx-auto flex items-center justify-center transition ${activeDay === WEEK_DATES[i] ? "bg-violet-600 text-white" : "text-gray-700 hover:bg-gray-100"}`}
              >
                {WEEK_DATES[i]}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Day Entries */}
      {selectedDayData ? (
        <section>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-sm font-bold text-gray-900">{activeDay} {activeMonth}</h2>
              <p className="text-xs text-gray-400">{selectedDayData.entries.length} Songs</p>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-600 text-white text-xs font-bold hover:bg-violet-700 transition">
              <Plus size={12} /> Add Song
            </button>
          </div>

          <div className="space-y-3">
            {selectedDayData.entries.map((entry) => (
              <div key={entry.id} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition group">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                    <img src={entry.cover} alt={entry.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link href={`/detail?id=${entry.id}`}>
                      <p className="text-sm font-bold text-gray-900 hover:text-violet-600 transition truncate">{entry.title}</p>
                    </Link>
                    <p className="text-xs text-gray-500 truncate">{entry.artist}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-medium" style={{ background: entry.color, color: "#374151" }}>
                        🎵 {entry.note}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                    <button className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center transition">
                      <Mic2 size={12} className="text-gray-400" />
                    </button>
                    <button className="w-7 h-7 rounded-full hover:bg-red-50 flex items-center justify-center transition">
                      <Trash2 size={12} className="text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <div className="bg-white rounded-2xl p-10 border border-gray-100 text-center">
          <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-3">
            <Music size={22} className="text-gray-400" />
          </div>
          <p className="text-sm font-bold text-gray-700">No entries for this day</p>
          <p className="text-xs text-gray-400 mt-1 mb-4">Start logging music you listened to today!</p>
          <button className="px-5 py-2 rounded-xl bg-violet-600 text-white text-xs font-bold hover:bg-violet-700 transition">
            + Add Song
          </button>
        </div>
      )}
    </div>
  );
}