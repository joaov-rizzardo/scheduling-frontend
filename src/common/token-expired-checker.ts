import { jwtDecode } from "jwt-decode";

const ONE_MINUTE_IN_SECONDS = 60;

export class TokenExpiredChecker {
  static isNearingExpiration(token: string) {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      if (!decoded.exp) return false;
      return decoded.exp - currentTime <= ONE_MINUTE_IN_SECONDS;
    } catch {
      return true;
    }
  }
}
