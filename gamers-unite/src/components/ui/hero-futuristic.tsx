"use client"

import { Canvas, extend, useFrame, useThree, type Catalogue } from "@react-three/fiber"
import { useAspect, useTexture } from "@react-three/drei"
import { useEffect, useMemo, useRef, useState } from "react"
import { MapPin, Search } from "lucide-react"
import type { Mesh } from "three"
import * as THREE from "three/webgpu"
import { bloom } from "three/examples/jsm/tsl/display/BloomNode.js"
import {
  abs,
  add,
  blendScreen,
  float,
  mix,
  mod,
  mx_cell_noise_float,
  oneMinus,
  pass,
  smoothstep,
  texture,
  uniform,
  uv,
  vec2,
  vec3,
} from "three/tsl"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import "./hero-futuristic.css"

const TEXTUREMAP = { src: "https://i.postimg.cc/XYwvXN8D/img-4.png" }
const DEPTHMAP = { src: "https://i.postimg.cc/2SHKQh2q/raw-4.webp" }

// R3F needs Three namespace registration for WebGPU materials/nodes.
extend(THREE as unknown as Catalogue)

interface PostProcessingProps {
  strength?: number
  threshold?: number
  fullScreenEffect?: boolean
}

interface ScanProgressUniform {
  value: number
}

interface SceneUniforms {
  uPointer: { value: THREE.Vector2 }
  uProgress: { value: number }
}

interface HeroFuturisticProps {
  className?: string
  title?: string
  subtitle?: string
}

const PostProcessing = ({
  strength = 1,
  threshold = 1,
  fullScreenEffect = true,
}: PostProcessingProps) => {
  const { gl, scene, camera } = useThree()
  const progressRef = useRef<ScanProgressUniform>({ value: 0 })

  const { postProcessing, scanProgress } = useMemo(() => {
    const nextPostProcessing = new THREE.PostProcessing(
      gl as unknown as ConstructorParameters<typeof THREE.PostProcessing>[0]
    )
    const scenePass = pass(scene, camera)
    const scenePassColor = scenePass.getTextureNode("output")
    const bloomPass = bloom(scenePassColor, strength, 0.5, threshold)

    const uScanProgress = uniform(0)

    const scanPos = float(uScanProgress.value)
    const uvY = uv().y
    const scanWidth = float(0.05)
    const scanLine = smoothstep(0, scanWidth, abs(uvY.sub(scanPos)))
    const redOverlay = vec3(1, 0, 0).mul(oneMinus(scanLine)).mul(0.4)

    const withScanEffect = mix(
      scenePassColor,
      add(scenePassColor, redOverlay),
      fullScreenEffect ? smoothstep(0.9, 1.0, oneMinus(scanLine)) : 1.0
    )

    const final = withScanEffect.add(bloomPass)
    nextPostProcessing.outputNode = final

    return {
      postProcessing: nextPostProcessing,
      scanProgress: uScanProgress,
    }
  }, [camera, gl, scene, strength, threshold, fullScreenEffect])

  useEffect(() => {
    progressRef.current = scanProgress
  }, [scanProgress])

  useFrame(({ clock }) => {
    progressRef.current.value = Math.sin(clock.getElapsedTime() * 0.5) * 0.5 + 0.5
    void postProcessing.renderAsync()
  }, 1)

  return null
}

const WIDTH = 300
const HEIGHT = 300

const Scene = () => {
  const [rawMap, depthMap] = useTexture([TEXTUREMAP.src, DEPTHMAP.src])
  const meshRef = useRef<Mesh>(null)
  const uniformsRef = useRef<SceneUniforms | null>(null)
  const visible = Boolean(rawMap && depthMap)

  const materialAndUniforms = useMemo(() => {
    const uPointer = uniform(new THREE.Vector2(0))
    const uProgress = uniform(0)
    const strength = 0.01
    const tDepthMap = texture(depthMap)

    const tMap = texture(
      rawMap,
      uv().add(tDepthMap.r.mul(uPointer).mul(strength))
    )

    const aspect = float(WIDTH).div(HEIGHT)
    const tUv = vec2(uv().x.mul(aspect), uv().y)
    const tiling = vec2(120.0)
    const tiledUv = mod(tUv.mul(tiling), 2.0).sub(1.0)
    const brightness = mx_cell_noise_float(tUv.mul(tiling).div(2))
    const dist = float(tiledUv.length())
    const dot = float(smoothstep(0.5, 0.49, dist)).mul(brightness)
    const depth = tDepthMap
    const flow = oneMinus(smoothstep(0, 0.02, abs(depth.sub(uProgress))))
    const mask = dot.mul(flow).mul(vec3(10, 0, 0))
    const final = blendScreen(tMap, mask)

    const meshMaterial = new THREE.MeshBasicNodeMaterial({
      colorNode: final,
      transparent: true,
      opacity: 0,
    })

    return {
      material: meshMaterial,
      uniforms: {
        uPointer,
        uProgress,
      } satisfies SceneUniforms,
    }
  }, [rawMap, depthMap])

  useEffect(() => {
    uniformsRef.current = materialAndUniforms.uniforms
  }, [materialAndUniforms.uniforms])

  const [w, h] = useAspect(WIDTH, HEIGHT)

  useFrame(({ clock, pointer }) => {
    const uniforms = uniformsRef.current
    if (!uniforms) return

    uniforms.uProgress.value = Math.sin(clock.getElapsedTime() * 0.5) * 0.5 + 0.5
    uniforms.uPointer.value = pointer

    const currentMaterial = meshRef.current?.material
    if (
      currentMaterial &&
      !Array.isArray(currentMaterial) &&
      "opacity" in currentMaterial
    ) {
      currentMaterial.opacity = THREE.MathUtils.lerp(
        currentMaterial.opacity,
        visible ? 1 : 0,
        0.07
      )
    }
  })

  const scaleFactor = 0.4

  return (
    <mesh
      ref={meshRef}
      scale={[w * scaleFactor, h * scaleFactor, 1]}
      material={materialAndUniforms.material}
    >
      <planeGeometry />
    </mesh>
  )
}

export function HeroFuturistic({
  className,
  title = "Build Your Dreams",
  subtitle = "AI-powered creativity for the next generation.",
}: HeroFuturisticProps) {
  const titleWords = useMemo(() => title.split(" "), [title])
  const [visibleWords, setVisibleWords] = useState(0)
  const [subtitleVisible, setSubtitleVisible] = useState(false)

  // Deterministic delays avoid hydration drift while keeping staggered glitch timing.
  const delays = useMemo(
    () => titleWords.map((_, index) => ((index * 17) % 7) * 0.01),
    [titleWords]
  )
  const subtitleDelay = useMemo(
    () => ((titleWords.length * 13) % 10) * 0.01,
    [titleWords.length]
  )

  useEffect(() => {
    if (visibleWords < titleWords.length) {
      const timeout = setTimeout(() => {
        setVisibleWords((current) => current + 1)
      }, 600)
      return () => clearTimeout(timeout)
    }

    const timeout = setTimeout(() => setSubtitleVisible(true), 800)
    return () => clearTimeout(timeout)
  }, [visibleWords, titleWords.length])

  return (
    <div className={cn("hero-futuristic-root relative h-svh bg-black", className)}>
      <div className="pointer-events-none absolute z-60 flex h-svh w-full flex-col items-center justify-center px-10 uppercase">
        <div className="text-3xl font-extrabold md:text-5xl xl:text-6xl 2xl:text-7xl">
          <div className="flex space-x-2 overflow-hidden text-white lg:space-x-6">
            {titleWords.map((word, index) => (
              <div
                key={`${word}-${index}`}
                className={index < visibleWords ? "fade-in" : undefined}
                style={{
                  animationDelay: `${index * 0.13 + (delays[index] || 0)}s`,
                  opacity: index < visibleWords ? undefined : 0,
                }}
              >
                {word}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-2 overflow-hidden text-xs font-bold text-white md:text-xl xl:text-2xl 2xl:text-3xl">
          <div
            className={subtitleVisible ? "fade-in-subtitle" : undefined}
            style={{
              animationDelay: `${titleWords.length * 0.13 + 0.2 + subtitleDelay}s`,
              opacity: subtitleVisible ? undefined : 0,
            }}
          >
            {subtitle}
          </div>
        </div>
      </div>

      <form
        action="/search"
        role="search"
        className="hero-search-form animate-enter grid w-[min(56rem,calc(100%-2rem))] gap-3 rounded-lg border bg-background p-3 shadow-sm md:grid-cols-[1fr_1fr_auto]"
        style={{ animationDelay: "2.2s" }}
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

      <Canvas
        flat
        className="h-full w-full"
        gl={async (props) => {
          const renderer = new THREE.WebGPURenderer(
            props as ConstructorParameters<typeof THREE.WebGPURenderer>[0]
          )
          await renderer.init()
          return renderer
        }}
      >
        <PostProcessing fullScreenEffect />
        <Scene />
      </Canvas>
    </div>
  )
}

/** @deprecated Prefer `HeroFuturistic` named export */
export const Html = HeroFuturistic

export default HeroFuturistic
