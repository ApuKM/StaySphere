const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

if (!baseUrl) {
  throw new Error("NEXT_PUBLIC_BASE_URL is not defined");
}


export const serverFetch = async (path: string) => {
  const res = await fetch(`${baseUrl}${path}`);
  return res.json();
};

export const MutateData = async <T>(path: string, data: T, method = "POST") => {
  const res = await fetch(`${baseUrl}${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};
