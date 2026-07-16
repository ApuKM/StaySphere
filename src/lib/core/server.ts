import { getUserToken } from "./session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const AuthHeader = async (): Promise<Record<string, string>> => {
  const token = await getUserToken();
  if (token) return { Authorization: `Bearer ${token}` };
  return {};
};

export const serverFetch = async (path: string) => {
  const url = path.startsWith("http") ? path : `${baseUrl}${path}`;
  const headers = {
    "Content-Type": "application/json",
    ...(await AuthHeader()),
  };
  const res = await fetch(url, { headers });
  return res.json();
};

export const MutateData = async <T>(
  path: string,
  data?: T,
  method = "POST",
) => {
  const res = await fetch(path, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      ...(await AuthHeader()),
    },
    body: JSON.stringify(data),
  });
  return res.json();
};
