"use client";

import { generateLetterAvatar } from "@/common/generate-letter-avatar";
import { Icon } from "@/components/icons/icon";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const companies = ["Ifood", "Bradesco", "Santander"];

export function CompanySelector() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-zinc-200 flex  gap-3 items-center border-none outline-none">
        <span className=" text-md">Empresa</span>
        <Icon icon="chevron_down" size={12} color="rgb(228, 228, 231)" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60 bg-zinc-900 border border-zinc-800 text-zinc-200 translate-x-10">
        {companies.map((company) => (
          <DropdownMenuItem
            key={company}
            className="cursor-pointer py-3 focus:bg-zinc-700 focus:text-zinc-200 flex items-center gap-3"
          >
            <Avatar className="w-10 h-10 rounded-md">
              <AvatarImage src={generateLetterAvatar(company, 48)} />
            </Avatar>
            {company}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
