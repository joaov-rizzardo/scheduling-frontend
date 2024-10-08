"use client";

import * as AuthTokens from "@/common/auth-tokens";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function TESTE() {
    await AuthTokens.set("access", email + password);
    await AuthTokens.set("refresh", email + password, {
      sameSite: "lax",
      httpOnly: true,
    });
    router.push("/profile");
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
      <button onClick={TESTE}>Entrar</button>
    </>
  );
}
