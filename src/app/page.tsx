import { redirect } from "next/navigation";
import * as AuthTokens from "@/common/auth-tokens";
import { UserService } from "@/services/http/user-service";

export default async function Home() {
  const accessToken = await AuthTokens.get("access");
  if (!accessToken) redirect("/signin");
  const loggedUser = await UserService.getLoggedUser();
  if (loggedUser.role === "user") redirect("/profile");
  return null;
}
