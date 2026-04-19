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
        session_id: getOrCreateSessionId(),
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

// ----- Internal-only events (not sent to Meta Pixel, only to tracking_events) -----
const SESSION_KEY = 'lov_session_id';
const SESSION_LAST_KEY = 'lov_session_last';
const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 min inactivity

export const getOrCreateSessionId = (): string => {
  if (typeof window === 'undefined') return '';
  try {
    const now = Date.now();
    const last = Number(sessionStorage.getItem(SESSION_LAST_KEY) || '0');
    let sid = sessionStorage.getItem(SESSION_KEY) || '';
    if (!sid || (last && now - last > SESSION_TIMEOUT_MS)) {
      sid = `s_${now}_${Math.random().toString(36).slice(2, 10)}`;
      sessionStorage.setItem(SESSION_KEY, sid);
      // Mark new session so caller can fire session_start
      sessionStorage.setItem('lov_session_new', '1');
    }
    sessionStorage.setItem(SESSION_LAST_KEY, String(now));
    return sid;
  } catch {
    return '';
  }
};

const sendInternalEvent = async (
  eventType: 'session_start' | 'page_view' | 'scroll_depth',
  metadata?: Record<string, unknown>,
) => {
  try {
    await fetch(`${SUPABASE_URL}/functions/v1/track-internal-event`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
      body: JSON.stringify({
        event_type: eventType,
        session_id: getOrCreateSessionId(),
        page_path: typeof window !== 'undefined' ? window.location.pathname + window.location.search : undefined,
        event_source_url: typeof window !== 'undefined' ? window.location.href : undefined,
        metadata,
      }),
    });
  } catch (err) {
    console.warn('internal event failed:', err);
  }
};

export const trackSessionStart = () => {
  if (typeof window === 'undefined') return;
  getOrCreateSessionId();
  if (sessionStorage.getItem('lov_session_new') === '1') {
    sessionStorage.removeItem('lov_session_new');
    void sendInternalEvent('session_start', {
      referrer: document.referrer || null,
      utm_source: new URLSearchParams(window.location.search).get('utm_source'),
      utm_medium: new URLSearchParams(window.location.search).get('utm_medium'),
      utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign'),
    });
  }
};

export const trackPageView = (path?: string) => {
  void sendInternalEvent('page_view', { path });
};

export const trackScrollDepth = (percent: 25 | 50 | 75 | 90) => {
  void sendInternalEvent('scroll_depth', { percent });
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
