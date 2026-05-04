import { useEffect, useRef } from 'react';
import { getOrCreateSessionId } from './useMetaPixel';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    Tinybird?: { trackEvent: (event: string, payload: Record<string, unknown>) => void };
  }
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const CAPI_ENDPOINT = `${SUPABASE_URL}/functions/v1/meta-capi-event`;

const getCookie = (name: string): string | undefined => {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : undefined;
};

export function useScrollDepth(pagePath = '/adv-1') {
  const fired = useRef({ 25: false, 50: false });

  useEffect(() => {
    const check = () => {
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      if (total <= window.innerHeight) return;
      const pct = Math.round((scrolled / total) * 100);

      if (!fired.current[25] && pct >= 25) {
        fired.current[25] = true;
        fireDepthEvent(25, pagePath);
      }
      if (!fired.current[50] && pct >= 50) {
        fired.current[50] = true;
        fireDepthEvent(50, pagePath);
      }
    };

    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, [pagePath]);
}

function fireDepthEvent(depth: 25 | 50, pagePath: string) {
  const eventId = `scroll_${depth}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  const eventName = `ScrollDepth${depth}`;
  const customData = { scroll_percent: depth, page: pagePath };

  // Browser pixel
  window.fbq?.('trackCustom', eventName, customData, { eventID: eventId });

  // Lovable / Tinybird
  window.Tinybird?.trackEvent(`scroll_depth_${depth}`, customData);

  // Meta Conversions API — server-side, non bloccabile
  void fetch(CAPI_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    keepalive: true,
    body: JSON.stringify({
      event_name: eventName,
      event_id: eventId,
      event_source_url: window.location.href,
      session_id: getOrCreateSessionId(),
      user_data: {
        fbp: getCookie('_fbp'),
        fbc: getCookie('_fbc'),
      },
      custom_data: customData,
    }),
  }).catch(() => {});
}
