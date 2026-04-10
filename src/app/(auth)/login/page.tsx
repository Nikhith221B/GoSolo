import { LoginForm } from "@/features/auth/login-form";
import { getSafeNextPath } from "@/lib/auth/redirect";

type LoginPageProps = {
  searchParams: Promise<{ next?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { next } = await searchParams;
  const safeNextPath = getSafeNextPath(next);
  return <LoginForm nextPath={safeNextPath} />;
}
