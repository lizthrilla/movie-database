const BASE_URL = "https://0kadddxyh3.execute-api.us-east-1.amazonaws.com"

let cachedToken: string | null = null;

async function fetchToken(): Promise<string> {
    const res = await fetch(`${BASE_URL}/auth/token`);

    if (!res.ok) {
        throw new Error(`Failed to fetch auth token: ${res.status}`)
    }

    const data = await res.json() as { token: string };
    return data.token;
}

async function getToken(): Promise<string> {
    if (cachedToken) return cachedToken;
    cachedToken = await fetchToken()
    return cachedToken
}

export async function apiGet<T = unknown>(
  path: string,
  params?: Record<string, string | number | undefined>
): Promise<T> {
  const token = await getToken();
  const url = new URL(path, BASE_URL);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        url.searchParams.set(key, String(value));
      }
    });
  }

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`API request failed: ${res.status}`);
  }

  return (await res.json()) as T;
}

export function __resetTokenForTests() {
  cachedToken = null;
}