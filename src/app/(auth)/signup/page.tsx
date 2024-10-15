import Link from "next/link";
import { RegisterForm } from "./_components/register-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import blackLogo from "@/../public/assets/images/black-logo.png";

export default function SignUp() {
  return (
    <ScrollArea className="h-full">
      <div className="px-5 py-3 flex flex-col items-center justify-center h-full">
        <Image src={blackLogo} alt="Logo schedulix" className="w-44 md:w-56 mb-3" />
        <RegisterForm />
        <span className="mt-5 text-zinc-700">
          Já possui uma conta?{" "}
          <Link href={"/signin"} className=" text-blue-800 hover:text-blue-950">
            Fazer login
          </Link>
        </span>
      </div>
    </ScrollArea>
  );
}
