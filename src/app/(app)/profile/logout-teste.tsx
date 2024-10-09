"use client";

import { UserService } from "@/services/http/user-service";

export function LogoutTeste() {
  return <button onClick={() => UserService.getLoggedUser()}>Deslogar</button>;
}
