// Meta Pixel tracking utilities
declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
  }
}

export const trackEvent = (eventName: string, params?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, params);
  }
};

export const trackAddToCart = (value?: string, currency = 'EUR') => {
  trackEvent('AddToCart', { value, currency });
};

export const trackInitiateCheckout = (value?: string, currency = 'EUR') => {
  trackEvent('InitiateCheckout', { value, currency });
};

export const trackLead = () => {
  trackEvent('Lead');
};

export const trackViewContent = (contentName?: string, value?: string, currency = 'EUR') => {
  trackEvent('ViewContent', { content_name: contentName, value, currency });
};

export const trackPurchase = (value: string, currency = 'EUR', contentName?: string) => {
  trackEvent('Purchase', { value, currency, content_name: contentName });
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
      
      if (eventName && window.fbq) {
        const params: Record<string, unknown> = {};
        if (eventValue) params.value = eventValue;
        if (eventCurrency) params.currency = eventCurrency;
        
        window.fbq('track', eventName, Object.keys(params).length > 0 ? params : undefined);
      }
    }
  });
};
