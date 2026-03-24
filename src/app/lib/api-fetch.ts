import { getSession, signOut } from "next-auth/react";

/**
 * Authenticated fetch wrapper.
 * Injects Authorization: Bearer <token> from the NextAuth session.
 * Handles 401/403 globally by signing out and redirecting to /login.
 * Skips auth injection for login endpoints.
 */
export async function fetchWithAuth(
  url: string,
  options?: RequestInit
): Promise<Response> {
  const isLoginEndpoint =
    url.includes("auth/login") || url.includes("auth/loginMobile");

  let headers: Record<string, string> = {};

  if (!isLoginEndpoint) {
    const session = await getSession();
    const token = (session?.user as any)?.token;
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const mergedOptions: RequestInit = {
    ...options,
    headers: {
      ...headers,
      ...(options?.headers ?? {}),
    },
  };

  const response = await fetch(url, mergedOptions);

  if (response.status === 401 || response.status === 403) {
    await signOut({ redirect: false });
    window.location.href = "/login";
  }

  return response;
}
