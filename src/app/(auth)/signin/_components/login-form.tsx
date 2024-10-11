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
  email: z.string().email(),
  password: z.string().min(1),
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

  function onSubmit({ email, password }: z.infer<typeof FormSchema>) {
    loginHandler.login({
      email,
      password,
    });
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-3/4 space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
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
  );
}
