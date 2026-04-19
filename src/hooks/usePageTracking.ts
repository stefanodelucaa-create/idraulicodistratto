import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackSessionStart, trackPageView, trackScrollDepth } from './useMetaPixel';

const THRESHOLDS: Array<25 | 50 | 75 | 90> = [25, 50, 75, 90];

/**
 * Mount once at the app root. Tracks:
 *  - session_start on first visit / after 30min inactivity
 *  - page_view on every route change
 *  - scroll_depth at 25/50/75/90% (once per page)
 */
export const usePageTracking = () => {
  const location = useLocation();
  const firedRef = useRef<Set<number>>(new Set());

  // Session start once per app load
  useEffect(() => {
    trackSessionStart();
  }, []);

  // Page view on route change + reset scroll markers
  useEffect(() => {
    trackPageView(location.pathname + location.search);
    firedRef.current = new Set();
    // Refresh session activity timestamp
    trackSessionStart();
  }, [location.pathname, location.search]);

  // Scroll depth listener
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const pct = (scrollTop / docHeight) * 100;
      for (const t of THRESHOLDS) {
        if (pct >= t && !firedRef.current.has(t)) {
          firedRef.current.add(t);
          trackScrollDepth(t);
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname]);
};
