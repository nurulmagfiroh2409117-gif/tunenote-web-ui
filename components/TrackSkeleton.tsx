export default function TrackSkeleton() {
  return (
    <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 animate-pulse">
      <div className="w-12 h-12 rounded-xl bg-gray-100 shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-3 bg-gray-100 rounded-full w-3/4" />
        <div className="h-2.5 bg-gray-100 rounded-full w-1/2" />
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <div className="w-8 h-3 bg-gray-100 rounded-full" />
        <div className="w-7 h-7 rounded-full bg-gray-100" />
      </div>
    </div>
  );
}