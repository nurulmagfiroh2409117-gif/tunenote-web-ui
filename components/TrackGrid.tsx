import React from "react";
import TrackCard, { TrackProps } from "./TrackCard";

const trendingTracks: TrackProps[] = [
  {
    id: "1",
    title: "Ultraviolence",
    artist: "Lana Del Rey",
    rating: 4.7,
    reviewsCount: "12.4k",
    coverUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&q=80",
  },
  {
    id: "2",
    title: "Stargirl",
    artist: "The Weeknd",
    rating: 4.5,
    reviewsCount: "9.8k",
    coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&q=80",
  },
  {
    id: "3",
    title: "April Shower",
    artist: "SEVENTEEN",
    rating: 4.6,
    reviewsCount: "8.3k",
    coverUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&q=80",
  },
  {
    id: "4",
    title: "IF I",
    artist: "TREASURE",
    rating: 4.3,
    reviewsCount: "7.4k",
    coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&q=80",
  },
];

export default function TrackGrid() {
  return (
    <section className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-bold text-gray-900">Trending Now</h2>
        <button className="text-xs font-semibold text-gray-400 hover:text-gray-900">
          See all →
        </button>
      </div>

      {/* Layout Grid 4 Kolom (Mobile 1 Kolom -> Tablet 2 -> Laptop 3 -> Desktop 4) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {trendingTracks.map((track) => (
          <TrackCard key={track.id} {...track} />
        ))}
      </div>
    </section>
  );
}