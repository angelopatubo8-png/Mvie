"use client";

import React, { useEffect, useRef, useState } from "react";
import MoviePlayer from "@/components/MoviePlayer";
import TopBarControls from "@/components/TopBarControls";

export default function Home() {
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    email: string;
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const playerWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("cinestream_user");
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("cinestream_user");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("cinestream_user");
    setCurrentUser(null);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);

    const innerInput = playerWrapperRef.current?.querySelector(
      'input[placeholder*="Search" i]'
    ) as HTMLInputElement | null;

    if (innerInput) {
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value"
      )?.set;
      nativeInputValueSetter?.call(innerInput, value);
      innerInput.dispatchEvent(new Event("input", { bubbles: true }));
    }
  };

  return (
  <div className="min-h-screen flex flex-col bg-background text-foreground">
      <TopBarControls
        currentUser={currentUser}
        onAuthSuccess={(user) => setCurrentUser(user)}
        onLogout={handleLogout}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />

      <main ref={playerWrapperRef} className="flex-1">
        <MoviePlayer />
      </main>
    </div>
  );
}