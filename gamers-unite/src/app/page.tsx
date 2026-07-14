import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Gamepad2,
  MapPin,
  Search,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

import { Container, Section } from "@/components/layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Find Gaming Cafes, Games, and Reviews",
  description:
    "Discover gaming cafes, browse popular games, read trusted community reviews, and find your next place to play.",
  openGraph: {
    title: "Gamers Unite",
    description:
      "Find gaming cafes, popular games, and community reviews in one place.",
    siteName: "Gamers Unite",
    type: "website",
  },
};

const featuredCafes = [
  {
    name: "Pixel Forge Arena",
    location: "Koramangala",
    rating: "4.9",
    detail: "High-refresh PCs, console pods, and weekly squad nights.",
    accent: "bg-emerald-500",
  },
  {
    name: "Checkpoint Social",
    location: "Indiranagar",
    rating: "4.8",
    detail: "Co-op tables, board-game shelves, and late-night tournaments.",
    accent: "bg-sky-500",
  },
  {
    name: "Respawn Lounge",
    location: "HSR Layout",
    rating: "4.7",
    detail: "Private rooms, streamer booths, and cafe-style seating.",
    accent: "bg-rose-500",
  },
];

const popularGames = [
  { title: "Valorant", players: "2.4k local players", genre: "Tactical FPS" },
  { title: "EA FC 26", players: "1.8k local players", genre: "Sports" },
  { title: "Tekken 8", players: "960 local players", genre: "Fighting" },
  { title: "Minecraft", players: "1.2k local players", genre: "Sandbox" },
];

const topReviews = [
  {
    quote:
      "Booked a five-stack setup in minutes and the cafe already knew our preferred machines.",
    author: "Anika R.",
    context: "Pixel Forge Arena",
  },
  {
    quote:
      "The reviews helped us avoid guesswork. We found a quieter console lounge for our weekend run.",
    author: "Dev M.",
    context: "Checkpoint Social",
  },
  {
    quote:
      "Clear ratings for equipment, food, and crowd level made choosing a place ridiculously easy.",
    author: "Nikhil S.",
    context: "Respawn Lounge",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <HeroSection />
      <SearchSection />
      <FeaturedCafesSection />
      <PopularGamesSection />
      <TopReviewsSection />
      <MembershipBanner />
      <CtaSection />
    </div>
  );
}

function HeroSection() {
  return (
    <Section className="overflow-hidden border-b bg-[linear-gradient(135deg,#ecfdf5_0%,var(--background)_45%,#fff1f2_100%)] dark:bg-[linear-gradient(135deg,#052e2b_0%,var(--background)_45%,#3b0712_100%)]">
      <Container className="grid min-h-[calc(100svh-8rem)] items-center gap-10 py-10 lg:grid-cols-[1fr_0.9fr]">
        <div className="animate-enter max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1 text-sm font-medium text-muted-foreground shadow-sm">
            <Sparkles aria-hidden="true" className="size-4 text-emerald-600" />
            Community-powered gaming discovery
          </p>
          <h1 className="mt-6 max-w-4xl text-heading-1 font-semibold text-foreground">
            Find the right place to play before the lobby fills.
          </h1>
          <p className="mt-5 max-w-2xl text-body-lg text-muted-foreground">
            Browse gaming cafes, compare crowd energy, discover popular games,
            and read reviews from players who care about the same setup you do.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/cafes">
                Explore cafes
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/games">Browse games</Link>
            </Button>
          </div>
        </div>

        <div
          className="animate-fade-in rounded-lg border bg-background/80 p-3 shadow-sm backdrop-blur"
          aria-label="Gaming cafe activity preview"
        >
          <div className="grid gap-3">
            <div className="rounded-lg bg-zinc-950 p-4 text-zinc-50 dark:bg-zinc-900">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-zinc-300">Live cafe match</p>
                  <p className="mt-1 text-2xl font-semibold">5 seats open</p>
                </div>
                <Gamepad2
                  aria-hidden="true"
                  className="size-8 text-emerald-300"
                />
              </div>
              <div className="mt-6 grid grid-cols-5 gap-2" aria-hidden="true">
                <span className="h-16 rounded-md bg-emerald-400" />
                <span className="h-16 rounded-md bg-emerald-400" />
                <span className="h-16 rounded-md bg-sky-400" />
                <span className="h-16 rounded-md bg-zinc-700" />
                <span className="h-16 rounded-md bg-rose-400" />
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["128", "cafes"],
                ["42k", "reviews"],
                ["320", "games"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-lg border bg-card p-4">
                  <p className="text-2xl font-semibold">{value}</p>
                  <p className="text-sm text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function SearchSection() {
  return (
    <Section spacing="sm" className="border-b bg-muted/30">
      <Container>
        <form
          action="/search"
          className="animate-enter grid gap-3 rounded-lg border bg-background p-3 shadow-sm md:grid-cols-[1fr_1fr_auto]"
          role="search"
        >
          <label className="grid gap-1">
            <span className="text-sm font-medium">Search cafes or games</span>
            <span className="flex h-11 items-center gap-2 rounded-md border bg-background px-3">
              <Search
                aria-hidden="true"
                className="size-4 text-muted-foreground"
              />
              <input
                name="q"
                type="search"
                placeholder="Try Valorant, console lounge, Koramangala"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </span>
          </label>
          <label className="grid gap-1">
            <span className="text-sm font-medium">Location</span>
            <span className="flex h-11 items-center gap-2 rounded-md border bg-background px-3">
              <MapPin
                aria-hidden="true"
                className="size-4 text-muted-foreground"
              />
              <input
                name="location"
                type="search"
                placeholder="Neighborhood or city"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </span>
          </label>
          <Button className="self-end" size="lg" type="submit">
            Search
          </Button>
        </form>
      </Container>
    </Section>
  );
}

function FeaturedCafesSection() {
  return (
    <Section>
      <Container>
        <SectionHeader
          eyebrow="Featured cafes"
          title="Places built for better sessions"
          description="Scan reliable cafe picks with the details players check first."
          href="/cafes"
          action="View all cafes"
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {featuredCafes.map((cafe) => (
            <Card key={cafe.name} className="animate-fade-in rounded-lg">
              <div className={`${cafe.accent} h-2`} />
              <CardHeader>
                <CardTitle>{cafe.name}</CardTitle>
                <CardDescription>{cafe.location}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{cafe.detail}</p>
              </CardContent>
              <CardFooter className="justify-between">
                <span className="inline-flex items-center gap-1 font-medium">
                  <Star aria-hidden="true" className="size-4 fill-current" />
                  {cafe.rating}
                </span>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/cafes">Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function PopularGamesSection() {
  return (
    <Section className="bg-muted/30">
      <Container>
        <SectionHeader
          eyebrow="Popular games"
          title="What players are queueing up"
          description="Track the games shaping cafe nights, tournaments, and pickup sessions."
          href="/games"
          action="Browse games"
        />
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {popularGames.map((game) => (
            <Card
              key={game.title}
              className="animate-fade-in rounded-lg"
              size="sm"
            >
              <CardHeader>
                <div className="mb-3 flex size-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <Gamepad2 aria-hidden="true" className="size-5" />
                </div>
                <CardTitle>{game.title}</CardTitle>
                <CardDescription>{game.genre}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{game.players}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function TopReviewsSection() {
  return (
    <Section>
      <Container>
        <SectionHeader
          eyebrow="Top reviews"
          title="Real notes from real sessions"
          description="Community reviews surface setup quality, staff helpfulness, food, and crowd fit."
          href="/reviews"
          action="Read reviews"
        />
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {topReviews.map((review) => (
            <Card key={review.author} className="animate-fade-in rounded-lg">
              <CardContent className="pt-(--card-spacing)">
                <div
                  className="flex gap-1 text-amber-500"
                  aria-label="Five star review"
                >
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      aria-hidden="true"
                      className="size-4 fill-current"
                    />
                  ))}
                </div>
                <blockquote className="mt-4 text-base leading-7">
                  &ldquo;{review.quote}&rdquo;
                </blockquote>
                <p className="mt-5 font-medium">{review.author}</p>
                <p className="text-sm text-muted-foreground">{review.context}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function MembershipBanner() {
  return (
    <Section spacing="sm">
      <Container>
        <div className="animate-enter grid gap-6 rounded-lg border bg-zinc-950 p-6 text-zinc-50 shadow-sm md:grid-cols-[1fr_auto] md:items-center md:p-8 dark:bg-zinc-900">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-medium text-emerald-300">
              <Users aria-hidden="true" className="size-4" />
              Membership
            </p>
            <h2 className="mt-3 text-heading-3 font-semibold">
              Join a community that knows where the good setups are.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-300">
              Save favorite cafes, follow game nights, and get early visibility
              into tournaments and member-only sessions.
            </p>
          </div>
          <Button variant="secondary" size="lg" asChild>
            <Link href="/membership">Become a member</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}

function CtaSection() {
  return (
    <Section>
      <Container className="text-center">
        <div className="mx-auto max-w-2xl">
          <CalendarDays
            aria-hidden="true"
            className="mx-auto size-10 text-rose-500"
          />
          <h2 className="mt-4 text-heading-2 font-semibold">
            Ready for the next session?
          </h2>
          <p className="mt-4 text-body text-muted-foreground">
            Start with a cafe, a game, or a review. Gamers Unite keeps the path
            from plan to play short.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/search">Start searching</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/reviews">See top reviews</Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function SectionHeader({
  action,
  description,
  eyebrow,
  href,
  title,
}: {
  action: string;
  description: string;
  eyebrow: string;
  href: string;
  title: string;
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <p className="text-sm font-medium text-muted-foreground">{eyebrow}</p>
        <h2 className="mt-2 text-heading-2 font-semibold">{title}</h2>
        <p className="mt-3 text-body text-muted-foreground">{description}</p>
      </div>
      <Button variant="outline" asChild>
        <Link href={href}>
          {action}
          <ArrowRight aria-hidden="true" />
        </Link>
      </Button>
    </div>
  );
}
