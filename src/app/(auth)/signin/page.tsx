import Link from "next/link";
import { LoginForm } from "./_components/login-form";
import Image from "next/image";
import blackLogo from "@/../public/assets/images/black-logo.png";

export default function SignIn() {
  return (
    <div className="px-5 py-3 flex flex-col items-center justify-center h-full">
      <Image src={blackLogo} alt="Logo schedulix" className="w-56" />
      <p className="mb-9 text-zinc-700 text-lg">Seja bem vindo de volta</p>
      <LoginForm />
      <span className="mt-5 text-zinc-800">
        Não possui uma conta?{" "}
        <Link href={"/signup"} className=" text-blue-800 hover:text-blue-950">
          Cadastre-se
        </Link>
      </span>
    </div>
  );
}
