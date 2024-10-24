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
import { FormProvider, useForm } from "react-hook-form";
import { useFormStore } from "../_store/form-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BRAZILIAN_STATES } from "@/common/brazilian-states";
import { CepService } from "@/services/http/cep-service";
import { useToast } from "@/hooks/use-toast";
import { useCreateCompany } from "../_hooks/useCreateCompany";

const FormSchema = z.object({
  street: z.string().min(1).max(50),
  city: z.string().min(1).max(50),
  country: z.string().min(1).max(50),
  state: z.string().length(2),
  postalCode: z.string().length(9),
  number: z.string().min(1).max(5),
  neighborhood: z.string().min(1).max(50),
  additionalInformation: z.string().optional(),
});

export function CompanyAddressForm() {
  const { toast } = useToast();
  const { create, loading } = useCreateCompany();
  const { basic, address, setAddress, previous } = useFormStore();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      city: address.city,
      country: address.country || "Brasil",
      neighborhood: address.neighborhood,
      number: address.number,
      postalCode: address.postalCode,
      state: address.state,
      street: address.street,
      additionalInformation: address.additionalInformation,
    },
  });

  function formatCEP(value: string) {
    value = value.replace(/\D/g, "");
    if (value.length > 5) {
      value = value.replace(/^(\d{5})(\d)/, "$1-$2");
    }
    return value;
  }

  async function searchCep() {
    const cep = form.getValues().postalCode.replace(/\D/g, "");
    if (cep.length < 8) return;
    const result = await CepService.findCEP(cep);
    if (!result) return null;
    form.setValue("neighborhood", result.bairro ?? "");
    form.setValue("additionalInformation", result.complemento ?? "");
    form.setValue("state", result.uf ?? "");
    form.setValue("city", result.localidade ?? "");
    form.setValue("street", result.logradouro ?? "");
  }

  function saveState() {
    setAddress(form.getValues());
  }

  function onSubmit(args: z.infer<typeof FormSchema>) {
    setAddress({
      ...args,
    });
    create({
      ...basic,
      brandColor: basic.color,
      address: {
        ...address,
        postalCode: address.postalCode.replace(/\D/g, ""),
      },
    });
  }
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex-1 flex gap-2">
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Logradouro</FormLabel>
                  <FormControl>
                    <Input {...field} maxLength={50} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem className="w-24">
                  <FormLabel>Número</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        form.setValue("number", value);
                      }}
                      maxLength={6}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Cidade</FormLabel>
                <FormControl>
                  <Input {...field} maxLength={50} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="neighborhood"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Bairro</FormLabel>
                <FormControl>
                  <Input {...field} maxLength={50} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="additionalInformation"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Complemento</FormLabel>
                <FormControl>
                  <Input {...field} maxLength={50} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-6 md:flex-row md:gap-2">
          <div className="flex-1 flex gap-2">
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>CEP</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      maxLength={9}
                      onChange={async (e) => {
                        const formatted = formatCEP(e.target.value);
                        form.setValue("postalCode", formatted);
                        await searchCep();
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem className="w-24">
                  <FormLabel>Estado</FormLabel>
                  <Select
                    value={form.getValues().state}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Array.from(BRAZILIAN_STATES.keys()).map((uf) => (
                        <SelectItem value={uf} key={uf}>
                          {uf}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>País</FormLabel>
                <FormControl>
                  <Input {...field} maxLength={50} readOnly />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-3">
          <Button
            type="button"
            variant={"outline"}
            className="w-full md:flex-1"
            onClick={() => {
              saveState();
              previous();
            }}
          >
            Voltar
          </Button>
          <Button type="submit" className="w-full md:flex-1" disabled={loading}>
            Finalizar
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
