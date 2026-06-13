"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { href: "/", label: "홈" },
  { href: "/examples/button", label: "Button" },
  { href: "/examples/card", label: "Card" },
  { href: "/examples/input", label: "Input" },
  { href: "/examples/badge", label: "Badge" },
  { href: "/examples/forms/login", label: "로그인 폼" },
  { href: "/register", label: "회원가입 데모" },
]

/** 전역 헤더 — 로고 + 네비게이션 */
export function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center gap-6 px-4">
        <Link href="/" className="font-semibold text-foreground">
          Starter Kit
        </Link>
        <nav className="flex items-center gap-1 overflow-x-auto">
          {NAV_ITEMS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm transition-colors whitespace-nowrap",
                pathname === href
                  ? "bg-muted font-medium text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
