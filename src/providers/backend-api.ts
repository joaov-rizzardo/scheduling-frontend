import * as AuthTokens from "@/common/auth-tokens";
import { TokenService } from "@/services/auth/token-service";
import axios, { AxiosError, AxiosInstance } from "axios";

interface ErrorResponse {
  message?: string;
  code?: string;
}

const backendApi: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

backendApi.interceptors.request.use(async (config) => {
  const token = await AuthTokens.get("access");
  console.log({ token });
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

backendApi.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    const response = error.response;
    const data = response?.data as ErrorResponse;
    if (!originalRequest || !data) throw error;
    if (response?.status !== 401 || data.code !== "invalid_access_token") {
      throw error;
    }
    try {
      const refreshToken = await AuthTokens.get("refresh");
      if (!refreshToken) throw error;
      const { accessToken } = await TokenService.refresh(refreshToken);
      await AuthTokens.set("access", accessToken);
      originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
      return backendApi(originalRequest);
    } catch (refreshError) {
      await AuthTokens.del("access");
      await AuthTokens.del("refresh");
      window.location.href = "/signin";
      throw refreshError;
    }
  }
);

export default backendApi;
