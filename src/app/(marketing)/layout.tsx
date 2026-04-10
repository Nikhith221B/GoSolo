import Link from "next/link";
import type { ReactNode } from "react";
import { buttonVariants } from "@/components/ui/button";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
          <Link className="text-xl font-semibold" href="/">
            GoSolo
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/about">About</Link>
            <Link href="/safety">Safety</Link>
            <Link href="/privacy">Privacy</Link>
            <Link className={buttonVariants({ size: "sm" })} href="/signup">
              Get started
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-4 py-10">{children}</main>
      <footer className="border-t bg-background">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-4 text-sm text-muted-foreground">
          <p>India-only launch. 18+ only.</p>
          <div className="flex items-center gap-3">
            <Link href="/terms">Terms</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
