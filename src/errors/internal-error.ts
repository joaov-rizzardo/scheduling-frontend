import { CommonError } from "./common-error";

export class InternalError extends Error implements CommonError {
  code = "internal_error";
  constructor() {
    super("An internal error ocurred");
  }
}
