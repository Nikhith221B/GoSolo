"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import {
  onboardingSchema,
  type OnboardingInput,
} from "@/lib/validation/onboarding";

function parseInterests(input: string): string[] {
  return input
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean)
    .slice(0, 12);
}

export function OnboardingForm() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const form = useForm<OnboardingInput>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      username: "",
      displayName: "",
      homeCity: "",
      travelStyle: "",
      interestsCsv: "",
      is18PlusConfirmed: false,
      dateOfBirth: "",
    },
  });

  async function onSubmit(values: OnboardingInput) {
    setError(null);
    const supabase = createSupabaseBrowserClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setError("Your session has expired. Please log in again.");
      router.replace("/login");
      return;
    }

    const interests = parseInterests(values.interestsCsv);
    const profileCompletionPercent = interests.length ? 100 : 80;

    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        username: values.username,
        display_name: values.displayName,
        home_city: values.homeCity,
        travel_style: values.travelStyle,
        interests,
        onboarding_completed: true,
        profile_completion_percent: profileCompletionPercent,
      })
      .eq("id", user.id);

    if (profileError) {
      setError(profileError.message);
      return;
    }

    const { error: privateError } = await supabase
      .from("user_private")
      .update({
        is_18_plus_confirmed: values.is18PlusConfirmed,
        date_of_birth: values.dateOfBirth ? values.dateOfBirth : null,
      })
      .eq("user_id", user.id);

    if (privateError) {
      setError(privateError.message);
      return;
    }

    router.replace("/dashboard");
    router.refresh();
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Complete your onboarding</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4 md:grid-cols-2" onSubmit={form.handleSubmit(onSubmit)}>
          {error ? (
            <Alert className="md:col-span-2" variant="destructive">
              <AlertTitle>Unable to save onboarding</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : null}
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" placeholder="e.g. solo_rider" {...form.register("username")} />
            <p className="text-xs text-destructive">{form.formState.errors.username?.message}</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="displayName">Display name</Label>
            <Input id="displayName" placeholder="Your name" {...form.register("displayName")} />
            <p className="text-xs text-destructive">
              {form.formState.errors.displayName?.message}
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="homeCity">Home city</Label>
            <Input id="homeCity" placeholder="Mumbai" {...form.register("homeCity")} />
            <p className="text-xs text-destructive">{form.formState.errors.homeCity?.message}</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="travelStyle">Travel style</Label>
            <Input id="travelStyle" placeholder="Balanced, slow, backpacking..." {...form.register("travelStyle")} />
            <p className="text-xs text-destructive">
              {form.formState.errors.travelStyle?.message}
            </p>
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="interests">Interests (comma separated)</Label>
            <Input
              id="interests"
              placeholder="hiking, photography, food trails"
              {...form.register("interestsCsv")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Date of birth (optional)</Label>
            <Input id="dateOfBirth" type="date" {...form.register("dateOfBirth")} />
          </div>
          <div className="flex items-center gap-2 pt-7">
            <input
              id="is18PlusConfirmed"
              type="checkbox"
              className="size-4 rounded border border-input"
              {...form.register("is18PlusConfirmed")}
            />
            <Label htmlFor="is18PlusConfirmed">I confirm I am 18 years or older.</Label>
          </div>
          <p className="text-xs text-destructive md:col-span-2">
            {form.formState.errors.is18PlusConfirmed?.message}
          </p>
          <Button className="md:col-span-2" type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Saving..." : "Finish onboarding"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}