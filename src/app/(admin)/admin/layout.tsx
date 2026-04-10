import type { ReactNode } from "react";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth/server";
import { SignOutButton } from "@/components/shared/sign-out-button";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  await requireAdmin();

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
          <p className="font-medium">GoSolo Admin</p>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/admin">Overview</Link>
            <Link href="/admin/reports">Reports</Link>
            <Link href="/admin/users">Users</Link>
            <Link href="/admin/rooms">Rooms</Link>
            <Link href="/admin/moderation-actions">Actions</Link>
            <SignOutButton />
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-4 py-10">{children}</main>
    </div>
  );
}
