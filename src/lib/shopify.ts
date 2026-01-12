import { toast } from "sonner";

const SHOPIFY_API_VERSION = '2025-07';
const SHOPIFY_STORE_PERMANENT_DOMAIN = 'lovable-project-so83y.myshopify.com';
const SHOPIFY_CUSTOM_DOMAIN = 'idraulicodistratto.com';
const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
const SHOPIFY_STOREFRONT_TOKEN = '1eaf820b143855d53db6c1dc7b05b749';

export interface ShopifyProduct {
  node: {
    id: string;
    title: string;
    description: string;
    handle: string;
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    images: {
      edges: Array<{
        node: {
          url: string;
          altText: string | null;
        };
      }>;
    };
    variants: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          price: {
            amount: string;
            currencyCode: string;
          };
          availableForSale: boolean;
          selectedOptions: Array<{
            name: string;
            value: string;
          }>;
        };
      }>;
    };
    options: Array<{
      name: string;
      values: string[];
    }>;
  };
}

const STOREFRONT_QUERY = `
  query GetProducts($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          title
          description
          handle
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                availableForSale
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          options {
            name
            values
          }
        }
      }
    }
  }
`;

export async function storefrontApiRequest(query: string, variables: Record<string, unknown> = {}) {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (response.status === 402) {
    toast.error("Shopify: Payment required", {
      description: "Shopify API access requires an active Shopify billing plan.",
    });
    return null;
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  
  if (data.errors) {
    throw new Error(`Error calling Shopify: ${data.errors.map((e: { message: string }) => e.message).join(', ')}`);
  }

  return data;
}

export async function fetchProducts(first: number = 10, query?: string): Promise<ShopifyProduct[]> {
  try {
    const data = await storefrontApiRequest(STOREFRONT_QUERY, { first, query });
    if (!data) return [];
    return data.data.products.edges;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export interface CartItem {
  product: ShopifyProduct;
  variantId: string;
  variantTitle: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  quantity: number;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
}

// Extract numeric variant ID from GraphQL ID
function extractVariantId(graphqlId: string): string {
  // gid://shopify/ProductVariant/56459385897304 -> 56459385897304
  const match = graphqlId.match(/ProductVariant\/(\d+)/);
  return match ? match[1] : graphqlId;
}

// Allowed domains for checkout URL validation
const ALLOWED_CHECKOUT_DOMAINS = [
  `www.${SHOPIFY_CUSTOM_DOMAIN}`,
  SHOPIFY_CUSTOM_DOMAIN,
  SHOPIFY_STORE_PERMANENT_DOMAIN,
];

// Validate checkout URL to prevent open redirect attacks
function validateCheckoutUrl(url: URL): void {
  // Ensure protocol is HTTPS
  if (url.protocol !== 'https:') {
    throw new Error('Invalid checkout URL: must use HTTPS');
  }
  
  // Validate hostname against allowed domains
  const hostname = url.hostname.toLowerCase();
  const isAllowedDomain = ALLOWED_CHECKOUT_DOMAINS.some(
    domain => hostname === domain.toLowerCase() || hostname.endsWith(`.${domain.toLowerCase()}`)
  );
  
  if (!isAllowedDomain) {
    throw new Error('Invalid checkout URL: unauthorized domain');
  }
  
  // Ensure pathname looks like a valid Shopify checkout path
  const validPaths = ['/checkouts/', '/cart/c/', '/cart/'];
  const hasValidPath = validPaths.some(path => url.pathname.startsWith(path));
  
  if (!hasValidPath) {
    throw new Error('Invalid checkout URL: unexpected path');
  }
}

export async function createStorefrontCheckout(items: CartItem[]): Promise<string> {
  const CART_CREATE_MUTATION = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const lines = items.map((item) => ({
    quantity: item.quantity,
    merchandiseId: item.variantId,
  }));

  const cartData = await storefrontApiRequest(CART_CREATE_MUTATION, {
    input: { lines },
  });

  if (!cartData) {
    throw new Error("Failed to create cart");
  }

  const userErrors = cartData.data?.cartCreate?.userErrors ?? [];
  if (userErrors.length > 0) {
    throw new Error(userErrors.map((e: { message: string }) => e.message).join(", "));
  }

  const checkoutUrl: string | undefined = cartData.data?.cartCreate?.cart?.checkoutUrl;
  if (!checkoutUrl) {
    throw new Error("No checkout URL returned from Shopify");
  }

  // Parse and validate the URL from Shopify API
  let url: URL;
  try {
    url = new URL(checkoutUrl);
  } catch {
    throw new Error("Invalid checkout URL format from Shopify");
  }

  // Some Shopify setups return a cart permalink (e.g. /cart/c/...) instead of a /checkouts/... URL.
  // In that case, force direct checkout by appending /checkout.
  if (url.pathname.startsWith("/cart/c/") && !url.pathname.endsWith("/checkout")) {
    url.pathname = `${url.pathname.replace(/\/+$/, "")}/checkout`;
  }

  // Use custom domain with www prefix
  url.protocol = "https:";
  url.hostname = `www.${SHOPIFY_CUSTOM_DOMAIN}`;

  // Validate the final URL before returning
  validateCheckoutUrl(url);

  // Some cart permalinks include a `key` query param that is tied to the custom domain.
  // Removing it prevents Shopify from redirecting back to the custom domain in some setups.
  if (url.searchParams.has("key")) {
    url.searchParams.delete("key");
  }

  url.searchParams.set("channel", "online_store");
  return url.toString();
}

