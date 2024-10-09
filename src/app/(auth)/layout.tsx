import { ReactNode } from "react";
import * as AuthTokens from "@/common/auth-tokens";
import { redirect } from "next/navigation";

interface AuthLayoutProps {
  children: ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const token = await AuthTokens.get("access");
  if (token) redirect("/");
  return <>{children}</>;
}
