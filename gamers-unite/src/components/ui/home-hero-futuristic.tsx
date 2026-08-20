"use client"

import dynamic from "next/dynamic"

const HeroFuturistic = dynamic(
  () => import("@/components/ui/hero-futuristic"),
  {
    ssr: false,
    loading: () => (
      <div
        className="h-svh w-full bg-black"
        aria-label="Loading hero experience"
      />
    ),
  }
)

interface HomeHeroFuturisticProps {
  title?: string
  subtitle?: string
  className?: string
}

export default function HomeHeroFuturistic({
  title = "Find Your Session",
  subtitle = "Discover gaming cafes, compare setups, and read reviews from players like you.",
  className,
}: HomeHeroFuturisticProps) {
  return (
    <HeroFuturistic title={title} subtitle={subtitle} className={className} />
  )
}
