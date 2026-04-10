import { redirect } from "next/navigation";
import { OnboardingForm } from "@/features/onboarding/onboarding-form";
import { requireUser } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

export default async function OnboardingPage() {
  const { supabase, user } = await requireUser();
  const { data: profile } = await supabase
    .from("profiles")
    .select("onboarding_completed")
    .eq("id", user.id)
    .single();

  if (profile?.onboarding_completed) {
    redirect("/dashboard");
  }

  return <OnboardingForm />;
}
