import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function MarketingHomePage() {
  return (
    <section className="space-y-6 rounded-xl border bg-background p-8">
      <p className="text-sm font-medium text-muted-foreground">
        Trust-first solo travel platform for India
      </p>
      <h1 className="text-3xl font-semibold tracking-tight">
        Discover compatible co-travelers and plan together.
      </h1>
      <p className="max-w-2xl text-muted-foreground">
        GoSolo helps solo travelers connect safely and collaborate in shared planning
        rooms. This is a planning platform, not a travel package organizer.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link className={buttonVariants()} href="/signup">
          Create account
        </Link>
        <Link className={buttonVariants({ variant: "outline" })} href="/login">
          Log in
        </Link>
      </div>
    </section>
  );
}
