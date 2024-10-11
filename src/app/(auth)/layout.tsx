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
    <div className="flex flex-col lg:flex-row w-screen h-dvh bg-zinc-100">
      <div
        className="flex-1 bg-[url('/assets/images/auth-bg.jpg')] bg-zinc-900  hidden lg:block"
        style={{ clipPath: "polygon(0 0, 100% 0%, 75% 100%, 0% 100%)" }}
      />
      {/* <div className="bg-[url('/assets/images/auth-bg.jpg')] rounded-b-[25%] w-full h-full lg:hidden" /> */}
      <div className="flex-1 rouded-t-lg">{children}</div>
    </div>
  );
}
