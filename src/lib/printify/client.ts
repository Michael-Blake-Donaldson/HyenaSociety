import type { PrintifyOrderPayload, PrintifyProduct } from "@/lib/printify/types";

const PRINTIFY_BASE = "https://api.printify.com/v1";

function getConfig() {
  const token = process.env.PRINTIFY_API_TOKEN;
  const shopId = process.env.PRINTIFY_SHOP_ID;

  if (!token || !shopId) {
    throw new Error("Printify credentials are not configured");
  }

  return { token, shopId };
}

async function printifyFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const { token } = getConfig();

  const response = await fetch(`${PRINTIFY_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Printify API error: ${response.status} ${message}`);
  }

  return (await response.json()) as T;
}

export async function fetchPrintifyProducts() {
  const { shopId } = getConfig();
  const data = await printifyFetch<{ data: PrintifyProduct[] }>(`/shops/${shopId}/products.json`);
  return data.data;
}

export async function createPrintifyOrder(payload: PrintifyOrderPayload) {
  const { shopId } = getConfig();
  return printifyFetch<{ id: string }>(`/shops/${shopId}/orders.json`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
