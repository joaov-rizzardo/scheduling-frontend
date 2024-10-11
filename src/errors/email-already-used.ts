import { CommonError } from "./common-error";

export class EmailAlreadyUsed extends Error implements CommonError {
  code = "email_already_used";
  constructor() {
    super("E-mail is already used");
  }
}
