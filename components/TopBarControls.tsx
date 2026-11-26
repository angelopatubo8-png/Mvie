"use client";

import React, { useEffect, useRef, useState } from "react";
import SignUpModal from "@/components/SignUpModal";

interface UserInfo {
  name: string;
  email: string;
}

interface TopBarControlsProps {
  currentUser: UserInfo | null;
  onAuthSuccess: (user: UserInfo) => void;
  onLogout: () => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export default function TopBarControls({
  currentUser,
  onAuthSuccess,
  onLogout,
  searchQuery,
  onSearchChange,
}: TopBarControlsProps) {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<"signup" | "login" | null>(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (!loginEmail.trim() || loginPassword.length < 4) {
      setLoginError("Pakilagay ang email at password mo.");
      return;
    }

    const savedRaw = localStorage.getItem("cinestream_user");
    let displayName = loginEmail.split("@")[0];

    if (savedRaw) {
      try {
        const parsed = JSON.parse(savedRaw) as UserInfo;
        if (parsed.email?.toLowerCase() === loginEmail.trim().toLowerCase() && parsed.name) {
          displayName = parsed.name;
        }
      } catch {
        // ignore invalid stored user
      }
    }

    const loggedInUser = { name: displayName, email: loginEmail.trim() };
    localStorage.setItem("cinestream_user", JSON.stringify(loggedInUser));
    onAuthSuccess(loggedInUser);
    setAuthModalMode(null);
    setLoginEmail("");
    setLoginPassword("");
  };

  return (
    <header
      ref={containerRef}
      className="sticky top-0 z-40 w-full bg-gradient-to-r from-[#b91c1c] via-[#dc2626] to-[#ea580c] text-white shadow-lg"
    >
      {/* Top Row: Quick Links sa Kaliwa, Notifications / Sign Up / Login sa Kanan */}
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-6 pt-2 text-xs text-white/95">
        <nav className="flex items-center gap-3">
          <a href="#home" className="transition hover:text-white">
            Home
          </a>
          <span className="text-white/40">|</span>
          <a href="#mylist" className="transition hover:text-white">
            My List
          </a>
          <span className="text-white/40">|</span>
          <a href="#favorites" className="transition hover:text-white">
            Favorites
          </a>
          <span className="text-white/40">|</span>
          <a href="#history" className="transition hover:text-white">
            Watch History
          </a>
        </nav>

        <div className="flex items-center gap-3">
          {/* Notifications */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsNotifOpen((prev) => !prev)}
              className="flex items-center gap-1.5 rounded-md px-2 py-0.5 font-medium text-white/95 transition hover:bg-white/15 hover:text-white"
            >
              <span>🔔</span>
              <span>Notifications</span>
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-72 rounded-xl border border-white/15 bg-[#141720] p-4 text-white shadow-2xl">
                {currentUser ? (
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <span className="font-semibold">Notifications</span>
                      <span className="text-[11px] text-emerald-400">Active</span>
                    </div>
                    <div className="rounded-lg bg-white/5 p-2.5 text-xs text-gray-200">
                      Welcome to CineStream, <span className="font-semibold">{currentUser.name}</span>!
                    </div>
                    <div className="rounded-lg bg-white/5 p-2.5 text-xs text-gray-300">
                      New titles added in Trending &amp; Action categories.
                    </div>
                  </div>
                ) : (
                  <div className="py-3 text-center">
                    <div className="mx-auto mb-2.5 flex h-12 w-12 items-center justify-center rounded-full bg-red-600/20 text-lg font-bold text-red-400">
                      👤
                    </div>
                    <p className="text-sm font-medium text-gray-200">
                      Log in to view notifications
                    </p>
                    <p className="mt-1 text-[11px] text-gray-400">
                      Get alerts on new movies and saved watchlist updates.
                    </p>

                    <div className="mt-4 grid grid-cols-2 gap-2 border-t border-white/10 pt-3">
                      <button
                        type="button"
                        onClick={() => {
                          setIsNotifOpen(false);
                          setAuthModalMode("signup");
                        }}
                        className="rounded-lg bg-red-600 px-3 py-1.5 font-semibold text-white transition hover:bg-red-500"
                      >
                        Sign Up
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsNotifOpen(false);
                          setAuthModalMode("login");
                        }}
                        className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 font-semibold text-gray-200 transition hover:bg-white/10"
                      >
                        Login
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <span className="text-white/40">|</span>

          {/* Sign Up / Login / User */}
          {currentUser ? (
            <div className="flex items-center gap-2.5">
              <span className="rounded-full bg-white/15 px-3 py-0.5 font-semibold text-white">
                Hi, {currentUser.name}
              </span>
              <button
                type="button"
                onClick={onLogout}
                className="font-medium text-white/90 transition hover:text-white hover:underline"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 font-semibold">
              <button
                type="button"
                onClick={() => setAuthModalMode("signup")}
                className="rounded-md px-2 py-0.5 text-white transition hover:bg-white/15"
              >
                Sign Up
              </button>
              <span className="text-white/40">|</span>
              <button
                type="button"
                onClick={() => setAuthModalMode("login")}
                className="rounded-md px-2 py-0.5 text-white transition hover:bg-white/15"
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Row: CineStream Brand sa Kaliwa + Search Bar sa Gitna */}
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-3">
        <div className="flex shrink-0 items-center gap-2 text-xl font-extrabold tracking-tight">
          <span className="rounded-md bg-white/20 px-2 py-1 text-base">🎬</span>
          <span>CineStream</span>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-1 items-center rounded-md bg-white p-1 shadow-md"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search movies..."
            className="w-full bg-transparent px-3 py-1.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="px-2 text-xs text-gray-400 hover:text-gray-700"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
          <button
            type="submit"
            className="flex items-center justify-center rounded bg-[#dc2626] px-5 py-1.5 text-sm font-semibold text-white transition hover:bg-[#b91c1c]"
            aria-label="Search"
          >
            🔍
          </button>
        </form>
      </div>

      {/* Sign Up Modal */}
      <SignUpModal
        isOpen={authModalMode === "signup"}
        onClose={() => setAuthModalMode(null)}
        onSuccess={(user) => {
          onAuthSuccess(user);
          setAuthModalMode(null);
        }}
      />

      {/* Login Modal */}
      {authModalMode === "login" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-xl border border-white/10 bg-[#141720] p-6 text-white shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold tracking-tight">Log In</h2>
                <p className="text-xs text-gray-400">
                  Sign in to access your CineStream account
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setAuthModalMode(null);
                  setLoginError("");
                }}
                className="rounded-lg px-2.5 py-1 text-sm text-gray-400 hover:bg-white/10 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {loginError && (
                <div className="rounded-lg border border-red-500/40 bg-red-500/15 px-3 py-2 text-xs text-red-300">
                  {loginError}
                </div>
              )}

              <div>
                <label className="mb-1 block text-xs font-medium text-gray-300">
                  Email Address
                </label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-white/15 bg-[#0c0e14] px-3.5 py-2 text-sm text-white placeholder-gray-500 focus:border-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-gray-300">
                  Password
                </label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-white/15 bg-[#0c0e14] px-3.5 py-2 text-sm text-white placeholder-gray-500 focus:border-red-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setAuthModalMode("signup")}
                  className="text-xs text-red-400 hover:underline"
                >
                  Need an account? Sign Up
                </button>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthModalMode(null);
                      setLoginError("");
                    }}
                    className="rounded-lg border border-white/15 px-4 py-2 text-sm text-gray-300 hover:bg-white/10"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500"
                  >
                    Login
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}