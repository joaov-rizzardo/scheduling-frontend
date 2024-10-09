"use client";

import { User } from "@/services/http/user-service";
import { useLayoutEffect, useRef } from "react";
import { useAuthStore } from "./auth-store";

interface AuthStoreInitializerProps {
  user: User;
}

export function AuthStoreInitializer({ user }: AuthStoreInitializerProps) {
  const initRef = useRef<boolean>(false);
  useLayoutEffect(() => {
    if (initRef.current === false) {
      useAuthStore.setState((state) => ({
        ...state,
        user,
      }));
    }
  }, [user]);
  return null;
}
