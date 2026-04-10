export default function PrivacyPage() {
  return (
    <section className="space-y-4 rounded-xl border bg-background p-8">
      <h1 className="text-2xl font-semibold">Privacy</h1>
      <p className="text-muted-foreground">
        Public profiles expose only intended public fields. Private onboarding details
        remain owner-only through Supabase RLS.
      </p>
    </section>
  );
}
