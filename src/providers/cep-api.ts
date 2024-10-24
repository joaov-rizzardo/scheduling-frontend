export async function cepAPI(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  const baseURL = process.env.NEXT_PUBLIC_CEP_API_URL;
  const response = await fetch(`${baseURL}/${input}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });
  return response;
}
