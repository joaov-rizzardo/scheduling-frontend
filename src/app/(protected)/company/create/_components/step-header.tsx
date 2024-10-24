"use client";

import { Icon } from "@/components/icons/icon";
import { useFormStore } from "../_store/form-store";
import { cn } from "@/lib/utils";

function getDisplayNameByStep(step: string) {
  switch (step) {
    case "basic":
      return "Informações básicas";
    case "address":
      return "Endereço";
    default:
      return "";
  }
}

function getCircleBg(index: number, currentIndex: number) {
  if (currentIndex >= index) {
    return "bg-gradient-to-r from-blue-500 to-blue-800";
  }
  return "bg-zinc-400";
}

export function StepHeader() {
  const { order, step } = useFormStore();
  const currentIndex = order.findIndex((i) => i === step);
  return (
    <div className="header flex gap-5">
      {order.map((item) => {
        const index = order.findIndex((i) => i === item);
        const isCompleted = currentIndex > index;
        return (
          <div className="flex items-center gap-3" key={item}>
            <div className="flex flex-col md:flex-row items-center gap-2">
              <div
                className={cn(
                  "w-8 h-8 rounded-full  text-zinc-100 text-lg flex justify-center items-center",
                  getCircleBg(index, currentIndex)
                )}
              >
                {isCompleted ? (
                  <Icon icon="check" size={16} color="rgb(244, 244, 245)" />
                ) : (
                  index + 1
                )}
              </div>
              <span className="text-sm md:text-md text-zinc-600 ">
                {getDisplayNameByStep(item)}
              </span>
            </div>

            {index < order.length - 1 && (
              <div className="h-[1px] bg-zinc-300 w-24" />
            )}
          </div>
        );
      })}
    </div>
  );
}
