import * as AuthTokens from "@/common/auth-tokens";
import { InvalidRefreshToken } from "@/errors/invalid-refresh-token";
import { AuthService } from "@/services/http/auth-service";
import { redirect } from "next/navigation";

export interface ErrorResponse {
  message?: string;
  code?: string;
}

export async function backendApi(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  const baseURL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  const token = await AuthTokens.get("access");
  const response = await fetch(`${baseURL}/${input}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });
  if (response.status !== 401) {
    return response;
  }
  const errorResponse = (await response.clone().json()) as ErrorResponse;
  if (errorResponse.code !== "invalid_access_token") {
    return response;
  }
  try {
    const refreshToken = await AuthTokens.get("refresh");
    if (!refreshToken) throw new InvalidRefreshToken();
    const { accessToken } = await AuthService.refresh(refreshToken);
    await AuthTokens.set("access", accessToken);
    return backendApi(input, init);
  } catch {
    const isFromServer = typeof window === "undefined";
    await Promise.all([AuthTokens.del("access"), AuthTokens.del("refresh")]);
    if (isFromServer) redirect("/signin");
    return response;
  }
}
