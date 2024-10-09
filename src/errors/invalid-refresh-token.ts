import { CommonError } from "./common-error";

export class InvalidRefreshToken extends Error implements CommonError {
  code = "invalid_refresh_token";
  constructor() {
    super("The refresh token is invalid");
  }
}
