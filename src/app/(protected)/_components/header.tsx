import { Icon } from "@/components/icons/icon";
import Image from "next/image";
import Link from "next/link";
import simpleLogo from "@/../public/assets/images/simple-white-logo.png";
import logo from "@/../public/assets/images/white-logo.png";
import { UserMenu } from "./user-menu";
import { CompanySelector } from "./company-selector";

export function Header() {
  return (
    <div className="px-5 lg:px-10 w-full h-16  bg-zinc-900 flex items-center gap-8 lg:gap-16">
      <Link href={"/"} className="text-zinc-200">
        <Image
          src={simpleLogo}
          alt="Logo schedulix"
          className="block md:hidden w-12 h-12"
        />
        <Image
          src={logo}
          alt="Logo schedulix"
          className="w-32 hidden md:block"
        />
      </Link>
      <div className="flex-1">
        <CompanySelector />
      </div>
      <div className="flex items-center gap-4 md:gap-8">
        <Icon icon="notification" size={24} color="rgb(113, 113, 122)" />
        <UserMenu />
      </div>
    </div>
  );
}
