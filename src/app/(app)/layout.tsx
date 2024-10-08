import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const accessToken = cookies().get("access-token");

  if (!accessToken) {
    redirect("/signin");
  }

  return children;
}
