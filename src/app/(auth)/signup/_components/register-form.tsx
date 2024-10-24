"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { PasswordValidator } from "../../signin/_components/password-validator";
import {
  hasAnyLowerCase,
  hasAnyNumber,
  hasAnySymbol,
  hasAnyUpperCase,
  isGreatherOrEqualThanEight,
} from "@/common/password-validations";
import { useRegister } from "../_hooks/useRegister";

const FormSchema = z
  .object({
    name: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    email: z.string().email(),
    password: z
      .string()
      .min(1)
      .refine(
        (password) =>
          hasAnyUpperCase(password) &&
          hasAnyLowerCase(password) &&
          hasAnySymbol(password) &&
          hasAnyNumber(password) &&
          isGreatherOrEqualThanEight(password)
      ),
    confirmPassword: z.string().min(1),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
  });

export function RegisterForm() {
  const handler = useRegister();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(args: z.infer<typeof FormSchema>) {
    handler.register({
      name: args.name,
      lastName: args.lastName,
      email: args.email,
      password: args.password,
    });
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-3/4 space-y-4">
        <div className="block space-y-4 lg:space-y-0 lg:flex lg:gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Sobrenome</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input {...field} type="email" />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="block space-y-4 lg:space-y-0 lg:flex lg:gap-2">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Confirmar senha</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <PasswordValidator password={form.watch().password} />

        <Button type="submit" className="w-full" disabled={handler.loading}>
          {handler.loading ? "Cadastrando..." : "Registrar"}
        </Button>
        {handler.isError && (
          <FormMessage className="relative -top-3">
            {handler.error?.message}
          </FormMessage>
        )}
      </form>
    </FormProvider>
  );
}
