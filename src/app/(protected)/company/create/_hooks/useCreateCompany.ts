"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  CompanyService,
  CreateCompanyProps,
} from "@/services/http/company-service";
import { useToast } from "@/hooks/use-toast";

export function useCreateCompany() {
  const router = useRouter();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: handleCreate,
    onError: () => {
      toast({
        title: "Ops, parece que algo deu errado",
        description: "Tente novamente mais tarde",
        variant: "destructive",
      });
    },
  });

  async function handleCreate(args: CreateCompanyProps): Promise<void> {
    const company = await CompanyService.create(args);
    console.log(company);
    router.push("/");
  }

  return {
    create: mutation.mutate,
    loading: mutation.isPending,
  };
}
