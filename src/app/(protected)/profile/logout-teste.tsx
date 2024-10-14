"use client";

import { Button } from "@/components/ui/button";
import { UserService } from "@/services/http/user-service";
import { teste } from "./teste";

export function LogoutTeste() {
  return (
    <>
      <button onClick={async () => await UserService.getLoggedUser()}>
        Deslogar
      </button>
      <Button onClick={() => teste()}>Testar</Button>
    </>
  );
}
