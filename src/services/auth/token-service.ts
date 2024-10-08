import backendApi from "@/providers/backend-api";

interface RefreshTokenResponse {
  accessToken: string;
}

export class TokenService {
  static async refresh(token: string): Promise<RefreshTokenResponse> {
    const { data } = await backendApi.put<RefreshTokenResponse>(
      "auth/refresh",
      {
        token,
      }
    );
    return data;
  }
}
