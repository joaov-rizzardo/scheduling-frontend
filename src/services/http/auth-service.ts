import { BadCredentials } from "@/errors/bad-credentials";
import { InternalError } from "@/errors/internal-error";
import { InvalidRefreshToken } from "@/errors/invalid-refresh-token";
import { backendApi, ErrorResponse } from "@/providers/backend-api";

interface RefreshTokenResponse {
  accessToken: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export class AuthService {
  static async refresh(token: string): Promise<RefreshTokenResponse> {
    const response = await backendApi("auth/refresh", {
      body: JSON.stringify({
        token,
      }),
      method: "PUT",
    });
    if (response.status === 200) {
      return (await response.json()) as RefreshTokenResponse;
    }
    const errorData = (await response.json()) as ErrorResponse;
    if (response.status === 401 && errorData.code === "invalid_refresh_token") {
      throw new InvalidRefreshToken();
    }
    throw new InternalError();
  }

  static async login(email: string, password: string): Promise<LoginResponse> {
    const response = await backendApi("auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    if (response.status === 200) {
      return (await response.json()) as LoginResponse;
    }
    const errorData = (await response.json()) as ErrorResponse;
    if (response.status === 401 && errorData.code === "bad_credentials") {
      throw new BadCredentials();
    }
    throw new InternalError();
  }
}
