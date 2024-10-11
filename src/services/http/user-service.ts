import { EmailAlreadyUsed } from "@/errors/email-already-used";
import { InternalError } from "@/errors/internal-error";
import { backendApi, ErrorResponse } from "@/providers/backend-api";

export interface User {
  id: string;
  name: string;
  lastName: string;
  role: "user" | "admin";
  email: string;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterArgs {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

export class UserService {
  static async getLoggedUser(): Promise<User> {
    const response = await backendApi("user/token", {
      method: "GET",
    });
    return (await response.json()) as User;
  }

  static async register({
    name,
    email,
    lastName,
    password,
  }: RegisterArgs): Promise<User> {
    const response = await backendApi("user/register", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        lastName,
        password,
      }),
    });
    if (response.status === 201) {
      return (await response.json()) as User;
    }
    const errorData = (await response.json()) as ErrorResponse;
    if (response.status === 409 && errorData.code === "user_email_already_used") {
      throw new EmailAlreadyUsed();
    }
    throw new InternalError();
  }
}
