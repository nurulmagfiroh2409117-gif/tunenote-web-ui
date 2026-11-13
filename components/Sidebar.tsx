import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-100 min-h-screen p-6 flex flex-col justify-between shrink-0 hidden md:flex">
      <div>
        {/* Logo & Tagline TRACKLOG */}
        <div className="mb-8">
          <Link href="/" className="flex items-center gap-2 text-xl font-black tracking-tight text-gray-900">
            <span className="text-2xl">♫</span> TuneNote
          </Link>
          <p className="text-xs text-gray-400 mt-1 font-medium">Log the music you live.</p>
        </div>

        {/* Menu Navigasi Utama */}
        <nav className="space-y-1">
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold bg-gray-100 text-gray-900">
            <span></span> Home
          </Link>
          <Link href="/discover" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition">
            <span></span> Discover
          </Link>
          <Link href="/library" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition">
            <span></span> My Library
          </Link>
          <Link href="/diary" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition">
            <span></span> Music Diary
          </Link>
          <Link href="/following" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition">
            <span></span> Following
          </Link>
        </nav>
      </div>

      {/* Bagian Bawah: Opsi Autentikasi Pengguna (Guest Mode) */}
      <div className="pt-6 border-t border-gray-100 space-y-2">
        <p className="text-xs text-gray-400 mb-2 font-medium">Gabung dengan TuneNote</p>
        <Link 
          href="/login" 
          className="w-full block text-center py-2 px-4 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition"
        >
          Masuk / Login
        </Link>
        <Link 
          href="/register" 
          className="w-full block text-center py-2 px-4 rounded-xl text-xs font-bold bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
        >
          Daftar Akun Baru
        </Link>
      </div>
    </aside>
  );
}