"use server";

import { cookies } from "next/headers";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

type TokenType = "access" | "refresh";

export async function get(type: TokenType): Promise<string | undefined> {
  return cookies().get(`${type}-token`)?.value;
}

export async function set(
  type: TokenType,
  value: string,
  options?: Partial<ResponseCookie>
) {
  cookies().set(`${type}-token`, value, { path: "/", ...options });
}

export async function del(type: TokenType) {
  cookies().delete(`${type}-token`);
}
