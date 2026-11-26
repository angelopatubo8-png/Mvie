"use client";

import React, { useState } from "react";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (user: { name: string; email: string }) => void;
}

export default function SignUpModal({
  isOpen,
  onClose,
  onSuccess,
}: SignUpModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submittedUser, setSubmittedUser] = useState<{
    name: string;
    email: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || password.length < 6) {
      setError("Pakilagay ang pangalan, email, at password (at least 6 characters).");
      return;
    }

    const userData = { name: name.trim(), email: email.trim() };
    localStorage.setItem("cinestream_user", JSON.stringify(userData));
    setSubmittedUser(userData);
    onSuccess?.(userData);
  };

  const handleResetAndClose = () => {
    setSubmittedUser(null);
    setName("");
    setEmail("");
    setPassword("");
    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 text-card-foreground shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Create Account</h2>
            <p className="text-xs text-muted-foreground">
              Sign up to save movies to your CineStream list
            </p>
          </div>
          <button
  type="button"
  onClick={handleResetAndClose}
  className="rounded-lg px-2.5 py-1 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
>
  ✕
</button>
        </div>

        {submittedUser ? (
          <div className="space-y-4 py-2 text-center">
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4">
              <p className="font-semibold text-emerald-400">Sign Up Successful!</p>
              <p className="mt-1 text-sm text-gray-200">
                Welcome, <span className="font-semibold">{submittedUser.name}</span> ({submittedUser.email})
              </p>
            </div>
            <button
              type="button"
              onClick={handleResetAndClose}
              className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-accent hover:text-accent-foreground"
            >
              Continue to CineStream
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-lg border border-red-500/40 bg-red-500/15 px-3 py-2 text-xs text-red-300">
                {error}
              </div>
            )}

            <div>
              <label className="mb-1 block text-xs font-medium text-foreground/90">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full rounded-lg border border-input bg-input px-3.5 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/40 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-gray-300">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full rounded-lg border border-white/15 bg-[#0c0e14] px-3.5 py-2 text-sm text-white placeholder-gray-500 focus:border-red-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-accent hover:text-accent-foreground"
              >
                Sign Up
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}