import Link from "next/link";
import { RegisterForm } from "./_components/register-form";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function SignUp() {
  return (
    <ScrollArea className="h-full">
      <div className="px-5 py-3 flex flex-col items-center justify-center h-full">
        <h1 className="text-2xl lg:text-3xl mb-1 lg:mb-3 text-blue-800 font-semibold">Registrar</h1>
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
