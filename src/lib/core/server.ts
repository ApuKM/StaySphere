import { getUserToken } from "./session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

if (!baseUrl) {
  throw new Error("NEXT_PUBLIC_BASE_URL is not defined");
}

export const AuthHeader = async (): Promise<Record<string, string>> => {
  const token = await getUserToken();
  if (token) return { Authorization: `Bearer ${token}` };
  return {};
};

export const serverFetch = async (path: string) => {
  const headers = {
    "Content-Type": "application/json",
    ...(await AuthHeader()),
  };
  const res = await fetch(`${baseUrl}${path}`, { headers });
  return res.json();
};

export const MutateData = async <T>(
  path: string,
  data?: T,
  method = "POST",
) => {
  const res = await fetch(`${baseUrl}${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      ...(await AuthHeader()),
    },
    body: JSON.stringify(data),
  });
  return res.json();
};
