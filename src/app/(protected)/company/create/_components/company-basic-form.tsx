"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { useFormStore } from "../_store/form-store";
import { useRouter } from "next/navigation";
import { PhoneCodeSelector } from "@/components/core/phone-code-selector";
import { useState } from "react";
import {
  CountryCode,
  parsePhoneNumberFromString,
  isValidPhoneNumber,
  getCountryCallingCode,
} from "libphonenumber-js";
import { COUNTRY_PHONE_CODES } from "@/common/country-phone-codes";

const FormSchema = z.object({
  name: z.string().min(1).max(50),
  email: z.string().email(),
  phone: z
    .string()
    .min(1)
    .refine((phone) => isValidPhoneNumber(phone)),
  color: z.string(),
});

function getCountryNameByPhone(phone: string) {
  const code = parsePhoneNumberFromString(phone)?.country;
  if (!code) return "";
  return (
    Array.from(COUNTRY_PHONE_CODES.values()).find(
      (item) => item.country_code === code
    )?.country_en || ""
  );
}

export function CompanyBasicForm() {
  const router = useRouter();
  const { basic, setBasic, next } = useFormStore();
  const [phoneCountry, setPhoneCountry] = useState<string>(
    !basic.phone ? "Brazil" : getCountryNameByPhone(basic.phone)
  );
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: basic.name,
      email: basic.email,
      phone: basic.phone,
      color: basic.color || "#000000",
    },
  });

  function onSubmit(args: z.infer<typeof FormSchema>) {
    setBasic(args);
    next();
  }

  function formatPhoneNumber(value: string, countryCode: CountryCode) {
    const phoneNumber = parsePhoneNumberFromString(value, countryCode);
    if (!phoneNumber) return value;
    if (phoneNumber.country !== countryCode) {
      phoneNumber.countryCallingCode = getCountryCallingCode(countryCode);
      phoneNumber.country = countryCode;
    }
    return phoneNumber?.formatInternational() ?? value;
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="flex gap-2">
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
            name="color"
            render={({ field }) => (
              <FormItem className="w-28">
                <FormLabel>Cor da marca</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="color"
                    className="border-none rounded-full p-0"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-6 md:flex-row md:gap-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Telefone</FormLabel>
                <div className="flex gap-1">
                  <PhoneCodeSelector
                    value={phoneCountry}
                    changeValue={(value: string) => {
                      setPhoneCountry(value);
                      const newValue = formatPhoneNumber(
                        form.getValues().phone,
                        (COUNTRY_PHONE_CODES.get(value)?.country_code ||
                          "") as CountryCode
                      );
                      form.setValue("phone", newValue);
                    }}
                  />
                  <FormControl>
                    <Input
                      type="tel"
                      {...field}
                      onChange={(e) => {
                        const formattedPhone = formatPhoneNumber(
                          e.target.value,
                          (COUNTRY_PHONE_CODES.get(phoneCountry)
                            ?.country_code || "") as CountryCode
                        );
                        field.onChange(formattedPhone);
                        form.setValue("phone", formattedPhone);
                      }}
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-3">
          <Button
            variant={"outline"}
            className="w-full md:flex-1"
            onClick={() => router.back()}
          >
            Cancelar
          </Button>
          <Button type="submit" className="w-full md:flex-1">
            Continuar
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
