"use client";

import { useFormStore } from "../_store/form-store";
import { CompanyAddressForm } from "./company-address-form";
import { CompanyBasicForm } from "./company-basic-form";

export function CompanyForm() {
  const { step } = useFormStore();
  return (
    <div className="w-[90%] lg:w-[896px] bg-zinc-50 p-6 rounded-lg mt-5">
      <h1 className="text-xl text-blue-800 mb-5 text-center font-semibold">
        Nova empresa
      </h1>
      {step === "basic" && <CompanyBasicForm />}
      {step === "address" && <CompanyAddressForm />}
    </div>
  );
}
