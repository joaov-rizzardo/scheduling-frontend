"use client";

import * as AuthTokens from "@/common/auth-tokens";
import { AuthService } from "@/services/http/auth-service";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BadCredentials } from "@/errors/bad-credentials";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin() {
    try {
      const { accessToken, refreshToken } = await AuthService.login(
        email,
        password
      );
      await Promise.all([
        AuthTokens.set("access", accessToken),
        AuthTokens.set("refresh", refreshToken),
      ]);
      router.push("/");
    } catch (error) {
      if (error instanceof BadCredentials) {
        return setError("Usuário e/ou senha incorretos");
      }
      return setError("Erro interno no servidor");
    }
  }
  return (
    <>
      <input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Entrar</button>
      <br />
      {error && <span className="text-red-600">{error}</span>}
    </>
  );
}
