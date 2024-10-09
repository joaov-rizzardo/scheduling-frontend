"use client";

import { useMutation } from "@tanstack/react-query";
import { AuthService } from "@/services/http/auth-service";
import { BadCredentials } from "@/errors/bad-credentials";
import * as AuthTokens from "@/common/auth-tokens";
import { useRouter } from "next/navigation";

export function useLogin() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      handleLogin(email, password),
    onSuccess: async ({ accessToken, refreshToken }) => {
      await Promise.all([
        AuthTokens.set("access", accessToken),
        AuthTokens.set("refresh", refreshToken),
      ]);
      router.push("/");
    },
  });

  async function handleLogin(email: string, password: string) {
    try {
      return await AuthService.login(email, password);
    } catch (error) {
      if (error instanceof BadCredentials) {
        throw new Error("Usuário e/ou senha incorretos.");
      }
      throw new Error(
        "Ocorreu um erro inesperado, tente novamente mais tarde."
      );
    }
  }

  return {
    login: mutation.mutate,
    error: mutation.error,
    isError: mutation.isError,
    loading: mutation.isPending,
  };
}
