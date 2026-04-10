import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { SignOutButton } from "@/components/shared/sign-out-button";
import { requireUser } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

export default async function AppLayout({ children }: { children: ReactNode }) {
  const { supabase, user } = await requireUser();
  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name, onboarding_completed")
    .eq("id", user.id)
    .single();

  if (!profile?.onboarding_completed) {
    redirect("/onboarding");
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <p className="text-sm text-muted-foreground">GoSolo App</p>
            <p className="font-medium">
              {profile.display_name ? `Welcome, ${profile.display_name}` : "Welcome"}
            </p>
          </div>
          <nav className="flex items-center gap-3">
            <Link className="text-sm underline" href="/dashboard">
              Dashboard
            </Link>
            <Link className="text-sm underline" href="/admin">
              Admin
            </Link>
            <SignOutButton />
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-4 py-10">{children}</main>
    </div>
  );
}
