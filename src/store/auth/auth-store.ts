import { User } from "@/services/http/user-service";
import { create } from "zustand";

interface AuthStoreProps {
  user: User;
}

export const useAuthStore = create<AuthStoreProps>(() => ({
  user: {} as User,
}));
