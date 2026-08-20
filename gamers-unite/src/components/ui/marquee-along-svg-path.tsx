"use client"

import React, {
  RefObject,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
} from "react"
import {
  motion,
  SpringOptions,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from "motion/react"

import { cn } from "@/lib/utils"

const wrap = (min: number, max: number, value: number): number => {
  const range = max - min
  return ((((value - min) % range) + range) % range) + min
}

type PreserveAspectRatioAlign =
  | "none"
  | "xMinYMin"
  | "xMidYMin"
  | "xMaxYMin"
  | "xMinYMid"
  | "xMidYMid"
  | "xMaxYMid"
  | "xMinYMax"
  | "xMidYMax"
  | "xMaxYMax"

interface CSSVariableInterpolation {
  property: string
  from: number | string
  to: number | string
}

type PreserveAspectRatioMeetOrSlice = "meet" | "slice"

type PreserveAspectRatio =
  | PreserveAspectRatioAlign
  | `${Exclude<PreserveAspectRatioAlign, "none">} ${PreserveAspectRatioMeetOrSlice}`

interface MarqueeAlongSvgPathProps {
  children: React.ReactNode
  className?: string

  path: string
  pathId?: string
  preserveAspectRatio?: PreserveAspectRatio
  showPath?: boolean

  width?: string | number
  height?: string | number
  viewBox?: string

  baseVelocity?: number
  direction?: "normal" | "reverse"
  easing?: (value: number) => number
  slowdownOnHover?: boolean
  slowDownFactor?: number
  slowDownSpringConfig?: SpringOptions

  useScrollVelocity?: boolean
  scrollAwareDirection?: boolean
  scrollSpringConfig?: SpringOptions
  scrollContainer?: RefObject<HTMLElement | null> | HTMLElement | null

  repeat?: number

  draggable?: boolean
  dragSensitivity?: number
  dragVelocityDecay?: number
  dragAwareDirection?: boolean
  grabCursor?: boolean

  enableRollingZIndex?: boolean
  zIndexBase?: number
  zIndexRange?: number

  cssVariableInterpolation?: CSSVariableInterpolation[]

  responsive?: boolean
}

interface MarqueePathItemProps {
  child: React.ReactNode
  itemKey: string
  itemIndex: number
  itemsLength: number
  repeatIndex: number
  path: string
  baseOffset: MotionValue<number>
  easing?: (value: number) => number
  draggable: boolean
  grabCursor: boolean
  enableRollingZIndex: boolean
  calculateZIndex: (offsetDistance: number) => number | undefined
  cssVariableInterpolation: CSSVariableInterpolation[]
  onHoverChange: (hovered: boolean) => void
  registerItemRef: (key: string, element: HTMLDivElement | null) => void
}

function MarqueePathItem({
  child,
  itemKey,
  itemIndex,
  itemsLength,
  repeatIndex,
  path,
  baseOffset,
  easing,
  draggable,
  grabCursor,
  enableRollingZIndex,
  calculateZIndex,
  cssVariableInterpolation,
  onHoverChange,
  registerItemRef,
}: MarqueePathItemProps) {
  const itemOffset = useTransform(baseOffset, (value) => {
    const position = (itemIndex * 100) / itemsLength
    const wrappedValue = wrap(0, 100, value + position)
    return `${easing ? easing(wrappedValue / 100) * 100 : wrappedValue}%`
  })

  const currentOffsetDistance = useMotionValue(0)

  const zIndex = useTransform(currentOffsetDistance, (value) =>
    calculateZIndex(value)
  )

  const itemElementRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const unsubscribe = itemOffset.on("change", (value: string) => {
      const match = value.match(/^([\d.]+)%$/)
      if (match?.[1]) {
        currentOffsetDistance.set(parseFloat(match[1]))
      }
    })
    return unsubscribe
  }, [itemOffset, currentOffsetDistance])

  useEffect(() => {
    if (cssVariableInterpolation.length === 0) return

    const unsubscribe = currentOffsetDistance.on("change", (distance) => {
      const element = itemElementRef.current
      if (!element) return

      for (const { property, from, to } of cssVariableInterpolation) {
        const progress = distance / 100
        if (typeof from === "number" && typeof to === "number") {
          element.style.setProperty(
            property,
            String(from + (to - from) * progress)
          )
          continue
        }
        element.style.setProperty(
          property,
          progress < 0.5 ? String(from) : String(to)
        )
      }
    })

    return unsubscribe
  }, [cssVariableInterpolation, currentOffsetDistance])

  return (
    <motion.div
      ref={(element) => {
        itemElementRef.current = element
        registerItemRef(itemKey, element)
      }}
      className={cn(
        "absolute top-0 left-0",
        draggable && grabCursor && "cursor-grab"
      )}
      style={{
        offsetPath: `path('${path}')`,
        offsetDistance: itemOffset,
        zIndex: enableRollingZIndex ? zIndex : undefined,
        willChange: "offset-distance",
        backfaceVisibility: "hidden",
      }}
      aria-hidden={repeatIndex > 0}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
    >
      {child}
    </motion.div>
  )
}

const MarqueeAlongSvgPath = ({
  children,
  className,

  path,
  pathId,
  preserveAspectRatio = "xMidYMid meet",
  showPath = false,

  width = "100%",
  height = "100%",
  viewBox = "0 0 100 100",

  baseVelocity = 5,
  direction = "normal",
  easing,
  slowdownOnHover = false,
  slowDownFactor = 0.3,
  slowDownSpringConfig = { damping: 50, stiffness: 400 },

  useScrollVelocity = false,
  scrollAwareDirection = false,
  scrollSpringConfig = { damping: 50, stiffness: 400 },
  scrollContainer,

  repeat = 3,

  draggable = false,
  dragSensitivity = 0.2,
  dragVelocityDecay = 0.96,
  dragAwareDirection = false,
  grabCursor = false,

  enableRollingZIndex = true,
  zIndexBase = 1,
  zIndexRange = 10,

  cssVariableInterpolation = [],

  responsive = false,
}: MarqueeAlongSvgPathProps) => {
  const container = useRef<HTMLDivElement>(null)
  const marqueeContainerRef = useRef<HTMLDivElement>(null)
  const baseOffset = useMotionValue(0)
  const pathRef = useRef<SVGPathElement>(null)
  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map())
  const generatedPathId = useId()

  useEffect(() => {
    if (!responsive) return

    const [, , vbWidth, vbHeight] = viewBox.split(" ").map(Number)
    const originalWidth = vbWidth || 100
    const originalHeight = vbHeight || 100

    const updateScale = () => {
      const wrapper = container.current
      const marqueeContainer = marqueeContainerRef.current
      if (!wrapper || !marqueeContainer) return

      const wrapperWidth = wrapper.clientWidth
      const wrapperHeight = wrapper.clientHeight

      const scaleX = wrapperWidth / originalWidth
      const scaleY = wrapperHeight / originalHeight
      const scale = Math.min(scaleX, scaleY)

      const scaledWidth = originalWidth * scale
      const scaledHeight = originalHeight * scale

      const offsetX = (wrapperWidth - scaledWidth) / 2
      const offsetY = (wrapperHeight - scaledHeight) / 2

      marqueeContainer.style.width = `${originalWidth}px`
      marqueeContainer.style.height = `${originalHeight}px`
      marqueeContainer.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`
      marqueeContainer.style.transformOrigin = "top left"
    }

    updateScale()
    window.addEventListener("resize", updateScale)
    return () => window.removeEventListener("resize", updateScale)
  }, [responsive, viewBox])

  const items = useMemo(() => {
    const childrenArray = React.Children.toArray(children)

    return childrenArray.flatMap((child, childIndex) =>
      Array.from({ length: repeat }, (_, repeatIndex) => {
        const itemIndex = repeatIndex * childrenArray.length + childIndex
        const key = `${childIndex}-${repeatIndex}`
        return {
          child,
          childIndex,
          repeatIndex,
          itemIndex,
          key,
        }
      })
    )
  }, [children, repeat])

  const calculateZIndex = useCallback(
    (offsetDistance: number) => {
      if (!enableRollingZIndex) {
        return undefined
      }

      const normalizedDistance = offsetDistance / 100
      return Math.floor(zIndexBase + normalizedDistance * zIndexRange)
    },
    [enableRollingZIndex, zIndexBase, zIndexRange]
  )

  const id = pathId || `marquee-path-${generatedPathId}`

  const { scrollY } = useScroll({
    container:
      (scrollContainer as RefObject<HTMLDivElement | null>) || container,
  })

  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, scrollSpringConfig)

  const isHovered = useRef(false)
  const isDragging = useRef(false)
  const dragVelocity = useRef(0)
  const directionFactor = useRef(direction === "normal" ? 1 : -1)

  const hoverFactorValue = useMotionValue(1)
  const defaultVelocity = useMotionValue(1)
  const smoothHoverFactor = useSpring(hoverFactorValue, slowDownSpringConfig)

  const velocityFactor = useTransform(
    useScrollVelocity ? smoothVelocity : defaultVelocity,
    [0, 1000],
    [0, 5],
    { clamp: false }
  )

  useAnimationFrame((_, delta) => {
    if (isDragging.current && draggable) {
      baseOffset.set(baseOffset.get() + dragVelocity.current)

      dragVelocity.current *= 0.9

      if (Math.abs(dragVelocity.current) < 0.01) {
        dragVelocity.current = 0
      }

      return
    }

    if (isHovered.current) {
      hoverFactorValue.set(slowdownOnHover ? slowDownFactor : 1)
    } else {
      hoverFactorValue.set(1)
    }

    let moveBy =
      directionFactor.current *
      baseVelocity *
      (delta / 1000) *
      smoothHoverFactor.get()

    if (scrollAwareDirection && !isDragging.current) {
      if (velocityFactor.get() < 0) {
        directionFactor.current = -1
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1
      }
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get()

    if (draggable) {
      moveBy += dragVelocity.current

      if (dragAwareDirection && Math.abs(dragVelocity.current) > 0.1) {
        directionFactor.current = Math.sign(dragVelocity.current)
      }

      if (!isDragging.current && Math.abs(dragVelocity.current) > 0.01) {
        dragVelocity.current *= dragVelocityDecay
      } else if (!isDragging.current) {
        dragVelocity.current = 0
      }
    }

    baseOffset.set(baseOffset.get() + moveBy)
  })

  const lastPointerPosition = useRef({ x: 0, y: 0 })

  const handlePointerDown = (event: React.PointerEvent) => {
    if (!draggable) return
    ;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)

    if (grabCursor) {
      ;(event.currentTarget as HTMLElement).style.cursor = "grabbing"
    }

    isDragging.current = true
    lastPointerPosition.current = { x: event.clientX, y: event.clientY }
    dragVelocity.current = 0
  }

  const handlePointerMove = (event: React.PointerEvent) => {
    if (!draggable || !isDragging.current) return

    const currentPosition = { x: event.clientX, y: event.clientY }
    const deltaX = currentPosition.x - lastPointerPosition.current.x
    const deltaY = currentPosition.y - lastPointerPosition.current.y
    const delta = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
    const projectedDelta = deltaX > 0 ? delta : -delta

    dragVelocity.current = projectedDelta * dragSensitivity
    lastPointerPosition.current = currentPosition
  }

  const handlePointerUp = (event: React.PointerEvent) => {
    if (!draggable) return
    ;(event.currentTarget as HTMLElement).releasePointerCapture(event.pointerId)
    isDragging.current = false

    if (grabCursor) {
      ;(event.currentTarget as HTMLElement).style.cursor = "grab"
    }
  }

  const registerItemRef = useCallback(
    (key: string, element: HTMLDivElement | null) => {
      if (element) {
        itemRefs.current.set(key, element)
        return
      }
      itemRefs.current.delete(key)
    },
    []
  )

  return (
    <div
      ref={container}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={cn("relative", className)}
    >
      <div
        ref={marqueeContainerRef}
        className="relative"
        style={{ contain: "layout style" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          viewBox={viewBox}
          preserveAspectRatio={preserveAspectRatio}
          className="h-full w-full"
        >
          <path
            id={id}
            d={path}
            stroke={showPath ? "currentColor" : "none"}
            fill="none"
            ref={pathRef}
          />
        </svg>

        {items.map(({ child, repeatIndex, itemIndex, key }) => (
          <MarqueePathItem
            key={key}
            child={child}
            itemKey={key}
            itemIndex={itemIndex}
            itemsLength={items.length}
            repeatIndex={repeatIndex}
            path={path}
            baseOffset={baseOffset}
            easing={easing}
            draggable={draggable}
            grabCursor={grabCursor}
            enableRollingZIndex={enableRollingZIndex}
            calculateZIndex={calculateZIndex}
            cssVariableInterpolation={cssVariableInterpolation}
            onHoverChange={(hovered) => {
              isHovered.current = hovered
            }}
            registerItemRef={registerItemRef}
          />
        ))}
      </div>
    </div>
  )
}

export default MarqueeAlongSvgPath
