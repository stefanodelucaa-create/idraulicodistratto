import { fetchProducts } from "@/lib/shopify";

let cache: Promise<any[]> | null = null;

/**
 * Fetches landing page products, caching the promise so the request happens
 * only once per session. Triggered early (e.g. on page mount or sidebar open)
 * so checkout button is instant.
 */
export const getLandingProducts = (): Promise<any[]> => {
  if (!cache) {
    cache = fetchProducts(10, 'vendor:"Protocollo del Piacere"').catch((err) => {
      cache = null; // allow retry on failure
      throw err;
    });
  }
  return cache;
};

/** Fire-and-forget warmup. */
export const prefetchLandingProducts = () => {
  getLandingProducts().catch(() => {});
};
