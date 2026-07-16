import { auth } from "@/utils/auth";
import { cookies, headers } from "next/headers";

// Prefer reading the token cookie set by middleware when available
export const getUserToken = async () => {
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get("ss_token");
    if (tokenCookie?.value) return tokenCookie.value;
  } catch (e) {
    // ignore and fallback to session API
  }

  const session = await auth.api.getSession({ headers: await headers() });
  return session?.session?.token || null;
};

export const getUserSession = async () => {
  // Attempt to resolve user from session API (requires headers/cookie)
  const session = await auth.api.getSession({ headers: await headers() });
  return session?.user || null;
};
