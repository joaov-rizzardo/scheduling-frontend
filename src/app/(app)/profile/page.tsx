import backendApi from "@/providers/backend-api";

export default async function Profile() {
  const data = await backendApi.get("user/token");
  return (
    <div>
      <h1>Perfil</h1>
    </div>
  );
}
