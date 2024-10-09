import { CommonError } from "./common-error";

export class BadCredentials extends Error implements CommonError {
  code = "bad_credentials";
  constructor() {
    super("Bad credentials provided");
  }
}
