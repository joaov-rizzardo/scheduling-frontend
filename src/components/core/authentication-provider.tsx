import { ReactNode } from "react";
import { UserService } from "@/services/http/user-service";
import { AuthStoreInitializer } from "@/store/auth/auth-store-initializer";

interface AuthenticationProviderProps {
  children: ReactNode;
}

export async function AuthenticationProvider({
  children,
}: AuthenticationProviderProps) {
  const loggedUser = await UserService.getLoggedUser();
  return (
    <>
      <AuthStoreInitializer user={loggedUser} />
      {children}
    </>
  );
}
