"use client"

import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

export type MiniNavbarItem = {
  label: string
  href: string
}

interface AnimatedNavLinkProps {
  href: string
  children: React.ReactNode
  onNavigate?: () => void
}

function AnimatedNavLink({
  href,
  children,
  onNavigate,
}: AnimatedNavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className="group relative inline-block h-5 overflow-hidden text-sm leading-5 whitespace-nowrap"
    >
      <div className="flex flex-col transition-transform duration-[400ms] ease-out transform group-hover:-translate-y-1/2">
        <span className="block h-5 leading-5 text-gray-300">{children}</span>
        <span className="block h-5 leading-5 text-white">{children}</span>
      </div>
    </Link>
  )
}

interface MiniNavbarProps extends React.ComponentProps<"header"> {
  brand?: string
  items?: MiniNavbarItem[]
  action?: MiniNavbarItem
  loginHref?: string
  signupHref?: string
}

const defaultItems: MiniNavbarItem[] = [
  { label: "Cafes", href: "/cafes" },
  { label: "Games", href: "/games" },
  { label: "Reviews", href: "/reviews" },
]

function MiniNavbarLogo() {
  return (
    <div className="relative flex h-5 w-5 items-center justify-center">
      <span className="absolute top-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-gray-200 opacity-80" />
      <span className="absolute top-1/2 left-0 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-gray-200 opacity-80" />
      <span className="absolute top-1/2 right-0 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-gray-200 opacity-80" />
      <span className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-gray-200 opacity-80" />
    </div>
  )
}

export function MiniNavbar({
  brand = "Gamers Unite",
  items = defaultItems,
  action = { label: "Search", href: "/search" },
  loginHref = "/login",
  signupHref = "/register",
  className,
  ...props
}: MiniNavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [headerShapeClass, setHeaderShapeClass] = useState("rounded-full")
  const shapeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const navLinks = [...items, action]

  const closeMenu = () => setIsOpen(false)

  const toggleMenu = () => setIsOpen((open) => !open)

  useEffect(() => {
    if (shapeTimeoutRef.current) {
      clearTimeout(shapeTimeoutRef.current)
    }

    if (isOpen) {
      setHeaderShapeClass("rounded-xl")
    } else {
      shapeTimeoutRef.current = setTimeout(() => {
        setHeaderShapeClass("rounded-full")
      }, 300)
    }

    return () => {
      if (shapeTimeoutRef.current) {
        clearTimeout(shapeTimeoutRef.current)
      }
    }
  }, [isOpen])

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <header
        data-slot="navbar"
        className={cn(
          "fixed top-6 left-1/2 z-40 flex w-[calc(100%-2rem)] -translate-x-1/2 flex-col items-center border border-[#333] bg-[#1f1f1f57] py-3 pl-6 pr-6 backdrop-blur-sm transition-[border-radius] duration-0 ease-in-out sm:w-auto",
          headerShapeClass,
          className
        )}
        {...props}
      >
        <div className="flex w-full items-center justify-between gap-x-6 sm:gap-x-8">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-md outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
            aria-label={`${brand} home`}
            onClick={closeMenu}
          >
            <MiniNavbarLogo />
            <span className="hidden text-sm font-semibold text-gray-200 sm:inline">
              {brand}
            </span>
          </Link>

          <nav
            className="hidden items-center space-x-4 text-sm sm:flex sm:space-x-6"
            aria-label="Primary"
          >
            {navLinks.map((link) => (
              <AnimatedNavLink key={link.href} href={link.href}>
                {link.label}
              </AnimatedNavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-2 sm:flex sm:gap-3">
            <Link
              href={loginHref}
              className="w-full rounded-full border border-[#333] bg-[rgba(31,31,31,0.62)] px-4 py-2 text-xs text-gray-300 transition-colors duration-200 hover:border-white/50 hover:text-white sm:w-auto sm:px-3 sm:text-sm"
            >
              Log in
            </Link>
            <div className="group relative w-full sm:w-auto">
              <div
                className="absolute inset-0 -m-2 hidden rounded-full bg-gray-100 opacity-40 blur-lg pointer-events-none transition-all duration-300 ease-out group-hover:-m-3 group-hover:opacity-60 group-hover:blur-xl sm:block"
                aria-hidden="true"
              />
              <Link
                href={signupHref}
                className="relative z-10 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-gray-300 px-4 py-2 text-xs font-semibold text-black transition-all duration-200 hover:from-gray-200 hover:to-gray-400 sm:w-auto sm:px-3 sm:text-sm"
              >
                Sign up
              </Link>
            </div>
          </div>

          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center text-gray-300 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 sm:hidden"
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? (
              <X aria-hidden="true" className="size-6" />
            ) : (
              <Menu aria-hidden="true" className="size-6" />
            )}
          </button>
        </div>

        <div
          className={cn(
            "flex w-full flex-col items-center overflow-hidden transition-all duration-300 ease-in-out sm:hidden",
            isOpen
              ? "max-h-[1000px] pt-4 opacity-100"
              : "pointer-events-none max-h-0 pt-0 opacity-0"
          )}
        >
          <nav
            className="flex w-full flex-col items-center space-y-4 text-base"
            aria-label="Mobile primary"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="w-full text-center text-gray-300 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex w-full flex-col items-center space-y-4">
            <Link
              href={loginHref}
              onClick={closeMenu}
              className="w-full rounded-full border border-[#333] bg-[rgba(31,31,31,0.62)] px-4 py-2 text-xs text-gray-300 transition-colors duration-200 hover:border-white/50 hover:text-white sm:text-sm"
            >
              Log in
            </Link>
            <div className="group relative w-full">
              <div
                className="absolute inset-0 -m-2 rounded-full bg-gray-100 opacity-40 blur-lg pointer-events-none transition-all duration-300 ease-out group-hover:-m-3 group-hover:opacity-60 group-hover:blur-xl"
                aria-hidden="true"
              />
              <Link
                href={signupHref}
                onClick={closeMenu}
                className="relative z-10 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-gray-300 px-4 py-2 text-xs font-semibold text-black transition-all duration-200 hover:from-gray-200 hover:to-gray-400 sm:text-sm"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default MiniNavbar
