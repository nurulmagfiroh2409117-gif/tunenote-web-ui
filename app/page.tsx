import TrackGrid from "@/components/TrackGrid";

export default function Home() {
  return (
    <div className="p-6 md:p-8">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-extrabold text-gray-900">Home</h1>

        <div className="flex items-center gap-4 flex-1 justify-end">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search for songs, albums, artists..."
              className="w-full pl-10 pr-4 py-2 rounded-full text-xs bg-white border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
            <span className="absolute left-3 top-2.5 text-xs text-gray-400">🔍</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-xs text-gray-600">🔔</button>
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">L</div>
          </div>
        </div>
      </div>

      {/* Hero Banner Gelap TRACKLOG */}
      <div className="relative bg-black text-white rounded-3xl p-8 mb-8 overflow-hidden flex flex-col justify-center min-h-[200px]">
        <div className="relative z-10 max-w-lg">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2">
            Good music deserves a place in your diary.
          </h2>
          <p className="text-xs text-gray-300 mb-6">
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

      {/* Seksi Grid "Trending Now" */}
      <TrackGrid />

      {/* Seksi "Recommended for You" */}
      <section className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base font-bold text-gray-900">Recommended for You</h2>
          <button className="text-xs font-semibold text-gray-400 hover:text-gray-900">See all →</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80" alt="1975" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">The 1975</p>
              <p className="text-[10px] text-gray-400">Artist</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-xs">🎸</div>
            <div>
              <p className="text-xs font-bold text-gray-900">indie & alternative</p>
              <p className="text-[10px] text-gray-400">Genre</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">🎧</div>
            <div>
              <p className="text-xs font-bold text-gray-900">Chill Vibes</p>
              <p className="text-[10px] text-gray-400">Mood</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs">✨</div>
            <div>
              <p className="text-xs font-bold text-gray-900">Based on activity</p>
              <p className="text-[10px] text-gray-400">Personalized</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}