import { ReactNode } from "react";
import * as AuthTokens from "@/common/auth-tokens";
import { redirect } from "next/navigation";

interface AuthLayoutProps {
  children: ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const token = await AuthTokens.get("access");
  if (token) redirect("/");
  return (
    <div className="flex w-screen h-screen">
      <div
        className="flex-1 bg-zinc-900 rounded-r-3xl hidden lg:block"
      ></div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
