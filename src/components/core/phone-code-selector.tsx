"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { COUNTRY_PHONE_CODES } from "@/common/country-phone-codes";
import { Icon } from "../icons/icon";

interface PhoneCodeSelectorProps {
  value: string;
  changeValue: (value: string) => void;
}

export function PhoneCodeSelector({
  value,
  changeValue,
}: PhoneCodeSelectorProps) {
  const [open, setOpen] = React.useState(false);

  const selected = COUNTRY_PHONE_CODES.get(value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[80px] items-center justify-between "
        >
          {selected && (
            <Image
              src={`/assets/flags/${selected.country_code.toLowerCase()}.svg`}
              alt=""
              width={0}
              height={0}
              className="w-5"
            />
          )}
          <Icon icon="chevron_down" size={12} color="rgb(161, 161, 170)" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0 relative left-10">
        <Command>
          <CommandInput placeholder="Procurar país..." />
          <CommandList>
            <CommandEmpty>Nenhum país encontrado...</CommandEmpty>
            <CommandGroup>
              {Array.from(COUNTRY_PHONE_CODES.values()).map((country) => (
                <CommandItem
                  key={country.country_en}
                  value={country.country_en}
                  className="flex items-center gap-2 px-2 py-3 active:bg-zinc-800"
                  onSelect={(currentValue) => {
                    changeValue(currentValue);
                    setOpen(false);
                  }}
                >
                  <Image
                    src={`/assets/flags/${country.country_code.toLowerCase()}.svg`}
                    alt=""
                    width={0}
                    height={0}
                    className="w-5"
                  />

                  {`${country.country_en} (+${country.phone_code})`}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
