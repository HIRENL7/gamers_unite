import { env } from "@/config/env";

export const siteConfig = {
  name: "Gamers Unite",
  shortName: "GameHub",
  description:
    "Discover gaming cafes, compare prices, browse games, and read trusted player reviews.",
  tagline: "Find your next place to play.",
  locale: "en_IN",
  keywords: [
    "gaming cafes",
    "esports lounges",
    "gaming PCs",
    "player reviews",
    "Bengaluru gaming",
    "LAN cafes",
    "console gaming",
  ],
  url: env.siteUrl,
  twitterHandle: "@gamersunite",
} as const;

export const publicRoutes = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/cafes", changeFrequency: "daily", priority: 0.9 },
  { path: "/search", changeFrequency: "daily", priority: 0.9 },
  { path: "/reviews", changeFrequency: "daily", priority: 0.8 },
  { path: "/games", changeFrequency: "weekly", priority: 0.7 },
  { path: "/membership", changeFrequency: "monthly", priority: 0.6 },
] as const;
