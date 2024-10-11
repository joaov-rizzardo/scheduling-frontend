"use client";

import {
  hasAnyLowerCase,
  hasAnyNumber,
  hasAnySymbol,
  hasAnyUpperCase,
  isGreatherOrEqualThanEight,
} from "@/common/password-validations";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface PasswordValidatorProps {
  password: string;
}

export function PasswordValidator({ password }: PasswordValidatorProps) {
  const validations = [
    hasAnyUpperCase,
    hasAnyLowerCase,
    hasAnySymbol,
    hasAnyNumber,
    isGreatherOrEqualThanEight,
  ];
  const validationsOkay = validations.filter((method) =>
    method(password)
  ).length;
  const percent = (validationsOkay / validations.length) * 100;

  function getColor() {
    if (percent < 25) {
      return "bg-red-500";
    }
    if (percent >= 25 && percent < 50) {
      return "bg-orange-500";
    }
    if (percent >= 50 && percent < 100) {
      return "bg-lime-500";
    }
    return "bg-green-500";
  }

  return (
    <>
      {password.length > 0 && (
        <Progress value={percent} indicatorClassName={getColor()} />
      )}
      <ul className="text-xs lg:text:md text-zinc-700 grid md:grid-cols-2 gap-2 justify-between">
        <li className={hasAnyUpperCase(password) ? "text-green-700" : ""}>
          Ao menos 1 letra maiúscula
        </li>
        <li className={hasAnyLowerCase(password) ? "text-green-700" : ""}>
          Ao menos 1 letras minúscula
        </li>
        <li className={hasAnySymbol(password) ? "text-green-700" : ""}>
          Ao menos 1 símbolo
        </li>
        <li className={hasAnyNumber(password) ? "text-green-700" : ""}>
          Ao menos 1 número
        </li>
        <li
          className={
            isGreatherOrEqualThanEight(password) ? "text-green-700" : ""
          }
        >
          Ao menos 8 caracteres
        </li>
      </ul>
    </>
  );
}
