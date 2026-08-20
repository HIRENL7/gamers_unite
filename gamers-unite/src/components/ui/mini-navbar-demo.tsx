"use client"

import { MiniNavbar } from "@/components/ui/mini-navbar"

export default function MiniNavbarDemo() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a0a] font-sans text-white">
      <div className="absolute inset-0">
        <img
          className="h-full w-full object-cover grayscale"
          src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1920&h=1080&fit=crop"
          alt="Starry night sky background"
        />
      </div>

      <MiniNavbar />

      <main className="relative z-10 flex h-screen flex-col items-center justify-center px-4 pt-24 text-center">
        <h1 className="mb-4 text-6xl font-bold tracking-tight text-white drop-shadow-xl md:text-8xl">
          Mini Navbar
        </h1>
        <p className="max-w-xl text-lg text-gray-300">
          Floating glass navigation for GameHub — cafes, games, reviews, and
          search.
        </p>
      </main>
    </div>
  )
}
