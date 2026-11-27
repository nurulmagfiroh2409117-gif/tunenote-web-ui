"use client";

import TopBar from "@/components/TopBar";
import { Bell, Moon, Globe, Shield, LogOut, ChevronRight } from "lucide-react";
import { useState } from "react";

const settingsSections = [
  {
    title: "Preferensi",
    items: [
      { icon: Bell, label: "Notifikasi", desc: "Kelola notifikasi & pemberitahuan", toggle: true, defaultOn: true },
      { icon: Moon, label: "Dark Mode", desc: "Tampilan gelap untuk mata nyaman", toggle: true, defaultOn: false },
      { icon: Globe, label: "Bahasa", desc: "Bahasa Indonesia", toggle: false },
    ],
  },
  {
    title: "Privasi & Keamanan",
    items: [
      { icon: Shield, label: "Privasi Akun", desc: "Kelola visibilitas profil kamu", toggle: false },
      { icon: Shield, label: "Ubah Password", desc: "Perbarui kata sandi akun", toggle: false },
    ],
  },
];

export default function SettingsPage() {
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    "Notifikasi": true,
    "Dark Mode": false,
  });

  return (
    <div className="p-6 md:p-8">
      <TopBar title="Settings" showSearch={false} />

      {/* Profile Card */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm mb-6 flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-violet-600 flex items-center justify-center text-white font-black text-xl">
          M
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-gray-900">xu minghao</p>
          <p className="text-xs text-gray-400">@xuminghao_x · minghao@tunenote.id</p>
          <p className="text-xs text-violet-600 mt-1 font-medium">Seoul, South Korea · Joined Feb 2019</p>
        </div>
        <ChevronRight size={16} className="text-gray-300" />
      </div>

      {/* Settings Sections */}
      {settingsSections.map((section) => (
        <div key={section.title} className="mb-6">
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-2 px-1">{section.title}</p>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {section.items.map((item, i) => (
              <div
                key={item.label}
                className={`flex items-center gap-4 p-4 hover:bg-gray-50 transition cursor-pointer ${i < section.items.length - 1 ? "border-b border-gray-100" : ""}`}
              >
                <div className="w-9 h-9 rounded-xl bg-violet-50 flex items-center justify-center shrink-0">
                  <item.icon size={16} className="text-violet-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                  <p className="text-xs text-gray-400">{item.desc}</p>
                </div>
                {item.toggle ? (
                  <button
                    onClick={() => setToggles((t) => ({ ...t, [item.label]: !t[item.label] }))}
                    className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${toggles[item.label] ? "bg-violet-600" : "bg-gray-200"}`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${toggles[item.label] ? "left-6" : "left-1"}`} />
                  </button>
                ) : (
                  <ChevronRight size={15} className="text-gray-300 shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Logout */}
      <button className="w-full flex items-center gap-3 p-4 bg-white rounded-2xl border border-red-100 shadow-sm hover:bg-red-50 transition text-left">
        <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
          <LogOut size={16} className="text-red-500" />
        </div>
        <div>
          <p className="text-sm font-semibold text-red-600">Keluar dari Akun</p>
          <p className="text-xs text-gray-400">Logout dari TuneNote</p>
        </div>
      </button>

      <p className="text-center text-[10px] text-gray-300 mt-6">TuneNote v1.0.0 · Log the music you live.</p>
    </div>
  );
}
