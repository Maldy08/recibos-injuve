import axios from "axios";
import { getSession, signOut } from "next-auth/react";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: inject Authorization header (skip login endpoints)
api.interceptors.request.use(async (config) => {
  const url = config.url ?? "";
  const isLoginEndpoint =
    url.includes("auth/login") || url.includes("auth/loginMobile");

  if (!isLoginEndpoint) {
    const session = await getSession();
    const token = (session?.user as any)?.token;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  }

  return config;
});

// Response interceptor: handle 401/403 globally
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    if (status === 401 || status === 403) {
      await signOut({ redirect: false });
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
