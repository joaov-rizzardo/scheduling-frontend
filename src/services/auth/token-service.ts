
interface RefreshTokenResponse {
  accessToken: string;
}

export class TokenService {
  static async refresh(token: string): Promise<RefreshTokenResponse> {
    const response = await backendApi("auth/refresh", {
      body: JSON.stringify({
        token,
      }),
    });
    return res;
  }
}
