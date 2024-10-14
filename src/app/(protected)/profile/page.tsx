import { LogoutTeste } from "./logout-teste";

export default async function Profile() {
  // const data = await backendApi.get("user/token");
  return (
    <div>
      <h1>Perfil</h1>
      <LogoutTeste />
    </div>
  );
}
