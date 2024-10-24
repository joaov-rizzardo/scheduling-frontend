import { AuthenticationProvider } from "@/components/core/authentication-provider";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { Header } from "./_components/header";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const accessToken = cookies().get("access-token");
  if (!accessToken) {
    redirect("/signin");
  }
  return (
    <AuthenticationProvider>
      <div className="w-dvw h-dvh overflow-y-hidden bg-zinc-100">
        <Header />
        <div
          style={{
            height: "calc(100dvh - 64px)",
          }}
        >
          {children}
        </div>
      </div>
    </AuthenticationProvider>
  );
}
