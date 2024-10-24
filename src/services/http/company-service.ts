import { InternalError } from "@/errors/internal-error";
import { backendApi } from "@/providers/backend-api";

export interface CreateCompanyProps {
  name: string;
  email: string;
  phone: string;
  brandColor: string;
  address: {
    street: string;
    city: string;
    country: string;
    state: string;
    postalCode: string;
    neighborhood: string;
    number: string;
    additionalInformation?: string;
  };
}

export interface Company {
  id: string;
  name: string;
  brandColor: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export class CompanyService {
  static async create(args: CreateCompanyProps): Promise<Company> {
    const response = await backendApi("company/create", {
      method: "POST",
      body: JSON.stringify(args),
    });
    if (response.status !== 201) throw new InternalError();
    return (await response.json()) as Company;
  }
}
