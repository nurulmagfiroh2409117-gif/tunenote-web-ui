"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, BookOpen, BookMarked, Users, Settings, Music4, Bell } from "lucide-react";
import RegisterModal from "./RegisterModal";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Discover", href: "/discover", icon: Compass },
  { label: "My Library", href: "/library", icon: BookMarked },
  { label: "Music Diary", href: "/diary", icon: BookOpen },
  { label: "Following", href: "/following", icon: Users },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [showRegister, setShowRegister] = useState(false);

  return (
    <>
      <aside className="w-56 bg-white border-r border-gray-100 min-h-screen flex flex-col justify-between shrink-0 hidden md:flex" style={{ position: "sticky", top: 0, height: "100vh" }}>
        <div className="p-5">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mb-7">
            <div className="w-8 h-8 rounded-xl bg-violet-600 flex items-center justify-center">
              <Music4 size={16} className="text-white" />
            </div>
            <span className="text-base font-black text-gray-900 tracking-tight">TuneNote</span>
          </Link>

          {/* Navigation */}
          <nav className="space-y-0.5">
            {navItems.map(({ label, href, icon: Icon }) => {
              const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-violet-50 text-violet-700 font-semibold"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon size={16} className={isActive ? "text-violet-600" : "text-gray-400"} />
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-5">
          <Link href="/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition mb-4">
            <Settings size={16} className="text-gray-400" />
            Settings
          </Link>

          {/* Auth Buttons */}
          <div className="border-t border-gray-100 pt-4 space-y-2">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-2">Gabung dengan TuneNote</p>
            <Link
              href="/login"
              className="w-full block text-center py-2 px-4 rounded-xl text-xs font-bold bg-gray-900 text-white hover:bg-gray-800 transition"
            >
              Masuk / Login
            </Link>
            <button
              onClick={() => setShowRegister(true)}
              id="sidebar-register-btn"
              className="w-full block text-center py-2 px-4 rounded-xl text-xs font-bold bg-violet-50 text-violet-700 hover:bg-violet-100 transition"
            >
              Daftar Akun Baru
            </button>
          </div>
        </div>
      </aside>

      <RegisterModal isOpen={showRegister} onClose={() => setShowRegister(false)} />
    </>
  );
}