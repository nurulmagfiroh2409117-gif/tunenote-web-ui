"use client";

import { useState } from "react";
import Link from "next/link";
import { Music4, Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Email dan password wajib diisi.");
      return;
    }
    setIsLoading(true);
    setError("");
    await new Promise((r) => setTimeout(r, 1000));
    setIsLoading(false);
    router.push("/profile");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "linear-gradient(135deg, #f5f5f7 0%, #ede9fe 100%)" }}>
      <div className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-xl border border-gray-100">
        {/* Logo */}
        <div className="text-center mb-7">
          <div className="w-12 h-12 rounded-2xl bg-violet-600 flex items-center justify-center mx-auto mb-3">
            <Music4 size={22} className="text-white" />
          </div>
          <h1 className="text-xl font-black text-gray-900">Masuk ke TuneNote</h1>
          <p className="text-xs text-gray-400 mt-1">Log the music you live.</p>
        </div>

        {/* Quick Login Cards */}
        <div className="mb-6">
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-2">Login cepat sebagai</p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { name: "xu minghao", email: "minghao@tunenote.id", avatar: "M", color: "#7c3aed" },
              { name: "Nisha", email: "nisha@tunenote.id", avatar: "N", color: "#db2777" },
              { name: "Luka", email: "luka@tunenote.id", avatar: "L", color: "#0891b2" },
            ].map((u) => (
              <button
                key={u.name}
                onClick={() => setForm({ email: u.email, password: "music123" })}
                className="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-gray-200 hover:border-violet-300 hover:bg-violet-50 transition"
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs" style={{ background: u.color }}>
                  {u.avatar}
                </div>
                <span className="text-[9px] font-semibold text-gray-600 truncate w-full text-center">{u.name.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600">{error}</div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Email</label>
            <div className="relative">
              <Mail size={14} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="email@kamu.com"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl text-xs border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Password</label>
            <div className="relative">
              <Lock size={14} className="absolute left-3 top-3 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Password kamu"
                className="w-full pl-9 pr-10 py-2.5 rounded-xl text-xs border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-700">
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl text-sm font-bold text-white bg-violet-600 hover:bg-violet-700 disabled:opacity-70 transition flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Masuk...
              </>
            ) : "Masuk →"}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-5">
          Belum punya akun?{" "}
          <Link href="/" className="text-violet-600 font-semibold hover:underline">
            Daftar gratis
          </Link>
        </p>
      </div>
    </div>
  );
}
