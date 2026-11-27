"use client";

import { useState } from "react";
import { X, Music, Eye, EyeOff, User, Mail, Lock, Calendar } from "lucide-react";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin?: () => void;
}

const SAMPLE_USERS = [
  { name: "xu minghao", username: "xuminghao_x", email: "minghao@tunenote.id", password: "music123", avatar: "M", color: "#7c3aed" },
  { name: "Nisha Williams", username: "nishawilliams", email: "nisha@tunenote.id", password: "music123", avatar: "N", color: "#db2777" },
  { name: "Luka Bright", username: "lukabright", email: "luka@tunenote.id", password: "music123", avatar: "L", color: "#0891b2" },
];

export default function RegisterModal({ isOpen, onClose, onSwitchToLogin }: RegisterModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [step, setStep] = useState<"form" | "success">("form");
  const [selectedUser, setSelectedUser] = useState(SAMPLE_USERS[0]);
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    birthdate: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleQuickFill = (user: typeof SAMPLE_USERS[0]) => {
    setSelectedUser(user);
    setForm({
      name: user.name,
      username: user.username,
      email: user.email,
      birthdate: "2000-05-15",
      password: user.password,
      confirm: user.password,
    });
    setErrors({});
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Nama wajib diisi";
    if (!form.username.trim()) newErrors.username = "Username wajib diisi";
    else if (form.username.length < 3) newErrors.username = "Minimal 3 karakter";
    if (!form.email.trim()) newErrors.email = "Email wajib diisi";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Format email tidak valid";
    if (!form.birthdate) newErrors.birthdate = "Tanggal lahir wajib diisi";
    if (!form.password) newErrors.password = "Password wajib diisi";
    else if (form.password.length < 6) newErrors.password = "Minimal 6 karakter";
    if (form.password !== form.confirm) newErrors.confirm = "Password tidak cocok";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsLoading(false);
    setStep("success");
  };

  const handleClose = () => {
    setStep("form");
    setForm({ name: "", username: "", email: "", birthdate: "", password: "", confirm: "" });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && handleClose()}>
      <div className="modal-box" style={{ maxHeight: "90vh", overflowY: "auto" }}>
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition"
        >
          <X size={16} />
        </button>

        {step === "form" ? (
          <>
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-violet-600 flex items-center justify-center mx-auto mb-3">
                <Music size={22} className="text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Buat Akun TuneNote</h2>
              <p className="text-xs text-gray-500 mt-1">Log the music you live. Mulai perjalanan musikmu.</p>
            </div>

            {/* Quick Fill - Sample Users */}
            <div className="mb-5">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-2">Isi cepat dengan akun contoh</p>
              <div className="flex gap-2">
                {SAMPLE_USERS.map((u) => (
                  <button
                    key={u.username}
                    onClick={() => handleQuickFill(u)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium transition flex-1 ${
                      selectedUser.username === u.username && form.email === u.email
                        ? "border-violet-400 bg-violet-50 text-violet-700"
                        : "border-gray-200 bg-gray-50 text-gray-600 hover:border-violet-300"
                    }`}
                  >
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center text-white font-bold text-[9px] shrink-0"
                      style={{ background: u.color }}
                    >
                      {u.avatar}
                    </div>
                    <span className="truncate">{u.name.split(" ")[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Nama Lengkap</label>
                <div className="relative">
                  <User size={14} className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    id="reg-name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Nama lengkap kamu"
                    className={`w-full pl-9 pr-4 py-2.5 rounded-xl text-xs border ${errors.name ? "border-red-400 bg-red-50" : "border-gray-200"} focus:outline-none focus:ring-2 focus:ring-violet-400 transition`}
                  />
                </div>
                {errors.name && <p className="text-[10px] text-red-500 mt-0.5">{errors.name}</p>}
              </div>

              {/* Username */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Username</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-400 text-xs font-medium">@</span>
                  <input
                    type="text"
                    id="reg-username"
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value.toLowerCase().replace(/\s/g, "") })}
                    placeholder="username_kamu"
                    className={`w-full pl-7 pr-4 py-2.5 rounded-xl text-xs border ${errors.username ? "border-red-400 bg-red-50" : "border-gray-200"} focus:outline-none focus:ring-2 focus:ring-violet-400 transition`}
                  />
                </div>
                {errors.username && <p className="text-[10px] text-red-500 mt-0.5">{errors.username}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="email"
                    id="reg-email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="email@kamu.com"
                    className={`w-full pl-9 pr-4 py-2.5 rounded-xl text-xs border ${errors.email ? "border-red-400 bg-red-50" : "border-gray-200"} focus:outline-none focus:ring-2 focus:ring-violet-400 transition`}
                  />
                </div>
                {errors.email && <p className="text-[10px] text-red-500 mt-0.5">{errors.email}</p>}
              </div>

              {/* Birthdate */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Tanggal Lahir</label>
                <div className="relative">
                  <Calendar size={14} className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="date"
                    id="reg-birthdate"
                    value={form.birthdate}
                    onChange={(e) => setForm({ ...form, birthdate: e.target.value })}
                    className={`w-full pl-9 pr-4 py-2.5 rounded-xl text-xs border ${errors.birthdate ? "border-red-400 bg-red-50" : "border-gray-200"} focus:outline-none focus:ring-2 focus:ring-violet-400 transition`}
                  />
                </div>
                {errors.birthdate && <p className="text-[10px] text-red-500 mt-0.5">{errors.birthdate}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <Lock size={14} className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="reg-password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="Minimal 6 karakter"
                    className={`w-full pl-9 pr-10 py-2.5 rounded-xl text-xs border ${errors.password ? "border-red-400 bg-red-50" : "border-gray-200"} focus:outline-none focus:ring-2 focus:ring-violet-400 transition`}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-700">
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
                {errors.password && <p className="text-[10px] text-red-500 mt-0.5">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Konfirmasi Password</label>
                <div className="relative">
                  <Lock size={14} className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type={showConfirm ? "text" : "password"}
                    id="reg-confirm"
                    value={form.confirm}
                    onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                    placeholder="Ulangi password"
                    className={`w-full pl-9 pr-10 py-2.5 rounded-xl text-xs border ${errors.confirm ? "border-red-400 bg-red-50" : "border-gray-200"} focus:outline-none focus:ring-2 focus:ring-violet-400 transition`}
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-700">
                    {showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
                {errors.confirm && <p className="text-[10px] text-red-500 mt-0.5">{errors.confirm}</p>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                id="reg-submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl text-sm font-bold text-white bg-violet-600 hover:bg-violet-700 disabled:opacity-70 transition mt-2 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Membuat akun...
                  </>
                ) : (
                  "Daftar Sekarang →"
                )}
              </button>

              <p className="text-center text-xs text-gray-400">
                Sudah punya akun?{" "}
                <button type="button" onClick={onSwitchToLogin} className="text-violet-600 font-semibold hover:underline">
                  Masuk
                </button>
              </p>
            </form>
          </>
        ) : (
          /* Success State */
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🎵</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Selamat Datang!</h2>
            <p className="text-sm text-gray-500 mb-1">Akun <span className="font-bold text-violet-600">@{form.username}</span> berhasil dibuat.</p>
            <p className="text-xs text-gray-400 mb-6">Mulai log musik favoritmu sekarang.</p>
            <div className="bg-violet-50 rounded-2xl p-4 mb-6 text-left">
              <p className="text-xs text-violet-700 font-semibold mb-1">Info Akun</p>
              <p className="text-xs text-gray-600"><span className="font-medium">Nama:</span> {form.name}</p>
              <p className="text-xs text-gray-600"><span className="font-medium">Username:</span> @{form.username}</p>
              <p className="text-xs text-gray-600"><span className="font-medium">Email:</span> {form.email}</p>
            </div>
            <button
              onClick={handleClose}
              className="w-full py-3 rounded-xl text-sm font-bold text-white bg-violet-600 hover:bg-violet-700 transition"
            >
              Mulai Eksplorasi Musik 🎶
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
