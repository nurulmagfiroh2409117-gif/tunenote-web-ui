export default function TrackSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm animate-pulse"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="h-4 w-20 bg-gray-200 rounded-full"></div>
        <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
      </div>

      <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>

      <div className="h-3 w-1/2 bg-gray-200 rounded mb-2"></div>

      <div className="h-2.5 w-2/3 bg-gray-100 rounded"></div>
    </div>
  );
}