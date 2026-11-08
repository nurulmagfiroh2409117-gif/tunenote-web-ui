import React from "react";

export interface TrackProps {
  id: string;
  title: string;
  artist: string;
  rating: number;
  reviewsCount: string;
  coverUrl: string;
}

export default function TrackCard({ title, artist, rating, reviewsCount, coverUrl }: TrackProps) {
  return (
    <div className="bg-white rounded-2xl p-3 border border-gray-100 shadow-sm hover:shadow-md transition group">
      {/* Cover Image dengan Tombol Quick Bookmark */}
      <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-3 bg-gray-100">
        <img src={coverUrl} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
        <button className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-black/60 text-white text-xs flex items-center justify-center backdrop-blur-md">
          🔖
        </button>
      </div>

      {/* Informative Content */}
      <h3 className="text-sm font-bold text-gray-900 truncate" title={title}>
        {title}
      </h3>
      <p className="text-xs text-gray-500 font-medium truncate mb-2">
        {artist}
      </p>

      {/* Rating Tag */}
      <div className="flex items-center gap-1 text-xs font-bold text-gray-900">
        <span className="text-amber-500">★</span> {rating} 
        <span className="text-gray-400 font-normal">({reviewsCount})</span>
      </div>
    </div>
  );
}