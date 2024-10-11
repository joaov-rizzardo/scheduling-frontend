import Link from "next/link";
import { LoginForm } from "./_components/login-form";

export default function SignIn() {
  return (
    <div className="px-5 py-3 flex flex-col items-center justify-center h-full">
      <h1 className="text-3xl mb-1 text-blue-800 font-semibold text-center">Login</h1>
      <p className="mb-5 text-zinc-700 text-lg">Seja bem vindo de volta</p>
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
