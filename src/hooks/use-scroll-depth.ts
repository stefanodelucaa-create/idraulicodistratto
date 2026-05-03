import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    Tinybird?: { trackEvent: (event: string, payload: Record<string, unknown>) => void };
  }
}

export function useScrollDepth(pagePath = '/adv-1') {
  const fired = useRef({ 25: false, 50: false });

  useEffect(() => {
    const check = () => {
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
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
    check();
    return () => window.removeEventListener('scroll', check);
  }, [pagePath]);
}

function fireDepthEvent(depth: 25 | 50, pagePath: string) {
  const payload = { scroll_percent: depth, page: pagePath };
  window.fbq?.('trackCustom', `ScrollDepth${depth}`, payload);
  window.Tinybird?.trackEvent(`scroll_depth_${depth}`, payload);
}
