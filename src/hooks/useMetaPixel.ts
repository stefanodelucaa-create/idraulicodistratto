// Meta Pixel + Conversions API tracking utilities
declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
  }
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const CAPI_ENDPOINT = `${SUPABASE_URL}/functions/v1/meta-capi-event`;

const generateEventId = () =>
  `${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;

const getCookie = (name: string): string | undefined => {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : undefined;
};

interface UserData {
  email?: string;
  phone?: string;
}

const sendToCAPI = async (
  eventName: string,
  eventId: string,
  customData?: Record<string, unknown>,
  userData?: UserData,
) => {
  try {
    await fetch(CAPI_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
      body: JSON.stringify({
        event_name: eventName,
        event_id: eventId,
        event_source_url: typeof window !== 'undefined' ? window.location.href : undefined,
        user_data: {
          ...userData,
          fbp: getCookie('_fbp'),
          fbc: getCookie('_fbc'),
        },
        custom_data: customData,
      }),
    });
  } catch (err) {
    console.warn('CAPI send failed:', err);
  }
};

export const trackEvent = (
  eventName: string,
  params?: Record<string, unknown>,
  userData?: UserData,
) => {
  const eventId = generateEventId();
  if (typeof window !== 'undefined' && window.fbq) {
    // eventID enables deduplication with the server-side event
    window.fbq('track', eventName, params, { eventID: eventId });
  }
  // Fire-and-forget server-side
  void sendToCAPI(eventName, eventId, params, userData);
};

export const trackAddToCart = (value?: string, currency = 'EUR') => {
  trackEvent('AddToCart', { value, currency });
};

export const trackInitiateCheckout = (value?: string, currency = 'EUR') => {
  trackEvent('InitiateCheckout', { value, currency });
};

export const trackLead = (userData?: UserData) => {
  trackEvent('Lead', undefined, userData);
};

export const trackViewContent = (contentName?: string, value?: string, currency = 'EUR') => {
  trackEvent('ViewContent', { content_name: contentName, value, currency });
};

export const trackPurchase = (
  value: string,
  currency = 'EUR',
  contentName?: string,
  orderId?: string,
  userData?: UserData,
) => {
  // Use deterministic event_id for Purchase so it deduplicates with the Shopify webhook
  const eventId = orderId ? `purchase_${orderId}` : generateEventId();
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq(
      'track',
      'Purchase',
      { value, currency, content_name: contentName },
      { eventID: eventId },
    );
  }
  void sendToCAPI(
    'Purchase',
    eventId,
    { value: parseFloat(value), currency, content_name: contentName, order_id: orderId },
    userData,
  );
};

// Initialize click tracking via data attributes
export const initClickTracking = () => {
  if (typeof window === 'undefined') return;

  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const trackableElement = target.closest('[data-fb-event]');

    if (trackableElement) {
      const eventName = trackableElement.getAttribute('data-fb-event');
      const eventValue = trackableElement.getAttribute('data-fb-value');
      const eventCurrency = trackableElement.getAttribute('data-fb-currency') || 'EUR';

      if (eventName) {
        const params: Record<string, unknown> = {};
        if (eventValue) params.value = eventValue;
        if (eventCurrency) params.currency = eventCurrency;
        trackEvent(eventName, Object.keys(params).length > 0 ? params : undefined);
      }
    }
  });
};
