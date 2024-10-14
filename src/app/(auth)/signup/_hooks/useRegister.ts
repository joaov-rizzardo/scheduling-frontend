"use client";

import { useMutation } from "@tanstack/react-query";
import { AuthService } from "@/services/http/auth-service";
import * as AuthTokens from "@/common/auth-tokens";
import { useRouter } from "next/navigation";
import { RegisterArgs, UserService } from "@/services/http/user-service";
import { EmailAlreadyUsed } from "@/errors/email-already-used";

export function useRegister() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: handleRegister,
  });

  async function handleRegister(args: RegisterArgs) {
    try {
      const user = await UserService.register(args);
      await new Promise(() => {
        AuthService.login(args.email, args.password)
          .then(async ({ accessToken, refreshToken }) => {
            await Promise.all([
              AuthTokens.set("access", accessToken),
              AuthTokens.set("refresh", refreshToken, {
                sameSite: "lax",
                httpOnly: true,
                secure: true,
              }),
            ]);
            router.push("/");
          })
          .catch(() => router.push("/signin"))
          .finally(() => Promise.resolve());
      });
      return user;
    } catch (error) {
      if (error instanceof EmailAlreadyUsed) {
        throw new Error("O e-mail informado já está em uso.");
      }
      throw new Error(
        "Ocorreu um erro inesperado, tente novamente mais tarde."
      );
    }
  }

  return {
    register: mutation.mutate,
    error: mutation.error,
    isError: mutation.isError,
    loading: mutation.isPending,
  };
}
