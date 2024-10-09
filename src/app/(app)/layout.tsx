import { AuthenticationProvider } from "@/components/core/authentication-provider";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const accessToken = cookies().get("access-token");
  if (!accessToken) {
    redirect("/signin");
  }
  return <AuthenticationProvider>{children}</AuthenticationProvider>;
}
