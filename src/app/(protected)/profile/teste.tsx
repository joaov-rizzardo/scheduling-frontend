"use server";

import { UserService } from "@/services/http/user-service";

export async function teste() {
  try {
    await UserService.getLoggedUser();
    console.log(Date.now());
  } catch {}
}
