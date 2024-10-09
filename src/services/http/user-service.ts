import { backendApi } from "@/providers/backend-api";

export interface User {
  id: string;
  name: string;
  lastName: string;
  role: "user" | "admin";
  email: string;
  phone: string;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export class UserService {
  static async getLoggedUser(): Promise<User> {
    const response = await backendApi("user/token", {
      method: "GET",
    });
    return (await response.json()) as User;
  }
}
