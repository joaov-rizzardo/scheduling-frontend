"use client";

import { Icon } from "@/components/icons/icon";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/store/auth/auth-store";
import { AvatarImage } from "@radix-ui/react-avatar";

export function UserMenu() {
  const { user } = useAuthStore();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-zinc-200 flex  gap-3 items-center border-none outline-none">
        <Avatar className="w-8 h-8">
          <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQffxhnJCYQpJ1hB4jvYu_uSmauGe0_xTXFfA&s" />
        </Avatar>
        <span className="hidden md:block text-md">{user.name}</span>
        <Icon icon="chevron_down" size={12} color="rgb(228, 228, 231)" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44 bg-zinc-900 border border-zinc-800 text-zinc-200 -translate-x-3">
        <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-zinc-700" />
        <DropdownMenuItem className="cursor-pointer focus:bg-zinc-700 focus:text-zinc-200 flex items-center gap-3">
          <Icon icon="user" size={12} color="rgb(228, 228, 231)" />
          Perfil
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer focus:bg-zinc-700 focus:text-zinc-200 flex items-center gap-3">
          <Icon icon="lock" size={12} color="rgb(228, 228, 231)" />
          Alterar senha
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer focus:bg-zinc-700 focus:text-zinc-200 flex items-center gap-3">
          <Icon icon="config" size={12} color="rgb(228, 228, 231)" />
          Configurações
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-zinc-700" />
        <DropdownMenuItem className="cursor-pointer focus:bg-zinc-700 focus:text-zinc-200 flex items-center gap-3">
          <Icon icon="logout" size={12} color="rgb(228, 228, 231)" />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
