"use client"

import MarqueeAlongSvgPath from "@/components/ui/marquee-along-svg-path"
import { cn } from "@/lib/utils"

const path =
  "M1 209.434C58.5872 255.935 387.926 325.938 482.583 209.434C600.905 63.8051 525.516 -43.2211 427.332 19.9613C329.149 83.1436 352.902 242.723 515.041 267.302C644.752 286.966 943.56 181.94 995 156.5"

interface MarqueeImage {
  src: string
  alt: string
}

const images: MarqueeImage[] = [
  {
    src: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&h=280&fit=crop",
    alt: "Gaming setup with neon lights",
  },
  {
    src: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=200&h=280&fit=crop",
    alt: "Arcade controllers on a table",
  },
  {
    src: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=200&h=280&fit=crop",
    alt: "Person playing a video game",
  },
  {
    src: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=200&h=280&fit=crop",
    alt: "Gamepad close-up",
  },
  {
    src: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=200&h=280&fit=crop",
    alt: "RGB gaming PC tower",
  },
  {
    src: "https://images.unsplash.com/photo-1546443046-ed1ce6ffd1ab?w=200&h=280&fit=crop",
    alt: "Esports arena crowd",
  },
  {
    src: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=200&h=280&fit=crop",
    alt: "Mechanical keyboard with RGB",
  },
  {
    src: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=200&h=280&fit=crop",
    alt: "Console gaming controllers",
  },
  {
    src: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=200&h=280&fit=crop",
    alt: "Gaming headset on desk",
  },
  {
    src: "https://images.unsplash.com/photo-1580327344181-c959f9f6b1e9?w=200&h=280&fit=crop",
    alt: "Retro arcade cabinets",
  },
  {
    src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=200&h=280&fit=crop",
    alt: "Retro computer and gadgets",
  },
  {
    src: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=200&h=280&fit=crop",
    alt: "Handheld gaming device",
  },
  {
    src: "https://images.unsplash.com/photo-1616587894289-86480e533129?w=200&h=280&fit=crop",
    alt: "Streaming microphone setup",
  },
]

interface MarqueeAlongSvgPathDemoProps {
  className?: string
}

export default function MarqueeAlongSvgPathDemo({
  className,
}: MarqueeAlongSvgPathDemoProps) {
  return (
    <div
      className={cn(
        "relative h-full min-h-[280px] w-full overflow-hidden",
        className
      )}
      aria-label="Gaming moments along a path"
    >
      <MarqueeAlongSvgPath
        path={path}
        viewBox="0 0 996 330"
        baseVelocity={8}
        slowdownOnHover
        draggable
        repeat={2}
        dragSensitivity={0.1}
        className="h-full w-full"
        responsive
        grabCursor
      >
        {images.map((image) => (
          <div
            key={image.src}
            className="h-20 w-14 overflow-hidden rounded-md shadow-md duration-300 ease-in-out hover:scale-125"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="h-full w-full object-cover"
              draggable={false}
            />
          </div>
        ))}
      </MarqueeAlongSvgPath>
    </div>
  )
}
