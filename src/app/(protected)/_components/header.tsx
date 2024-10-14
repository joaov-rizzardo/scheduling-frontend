import { Icon } from "@/components/icons/icon";
import Image from "next/image";
import Link from "next/link";
import SimpleLogo from "@/../public/assets/images/simple-logo.png";

export function Header() {
  return (
    <div className="px-6 w-full h-16 bg-zinc-900 flex items-center gap-16">
      <Link href={"/"}>
        <Image src={SimpleLogo} alt="Logo schedulix" className="w-16 h-16"/>
      </Link>
      <div className="flex-1">
        <span className="text-zinc-50 text-lg">Companhia selecionada</span>
      </div>
      <div>
        <Icon icon="logout" size={34} color="red" />
        <span className="text-zinc-50 text-lg">Usuário logado</span>
      </div>
    </div>
  );
}
