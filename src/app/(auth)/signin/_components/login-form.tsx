"use client";

import * as AuthTokens from "@/common/auth-tokens";
import { AuthService } from "@/services/http/auth-service";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BadCredentials } from "@/errors/bad-credentials";
import { Input } from "@/components/ui/input";
import { Form, FormProvider, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useLogin } from "../_hooks/useLogin";

const FormSchema = z.object({
  email: z.string().email({
    message: "Informe um e-mail válido",
  }),
  password: z.string().min(1, {
    message: "Informe sua senha",
  }),
});

export function LoginForm() {
  const loginHandler = useLogin();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();

  function onSubmit({ email, password }: z.infer<typeof FormSchema>) {
    loginHandler.login({
      email,
      password,
    });
  }

  return (
    <div className="px-5 py-3 flex flex-col gap-5 items-center justify-center h-full">
      <h1 className="text-3xl font-semibold">Login</h1>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full"
            disabled={loginHandler.loading}
          >
            {loginHandler.loading ? "Entrando..." : "Entrar"}
          </Button>
          {loginHandler.isError && (
            <FormMessage className="relative -top-3">
              {loginHandler.error?.message}
            </FormMessage>
          )}
        </form>
      </FormProvider>
    </div>
  );
}
