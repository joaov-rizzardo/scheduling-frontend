import { cepAPI } from "@/providers/cep-api";

export interface CEPResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  unidade: string;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;
  regiao: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export class CepService {
  static async findCEP(cep: string): Promise<CEPResponse | null> {
    const response = await cepAPI(`ws/${cep}/json`, {
      method: "GET",
    });
    if (response.status !== 200) return null;
    return (await response.json()) as CEPResponse;
  }
}
