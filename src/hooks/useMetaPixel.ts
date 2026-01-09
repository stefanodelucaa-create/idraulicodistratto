// Meta Pixel tracking hook
declare global {
  interface Window {
    fbq: (...args: any[]) => void;
  }
}

export const trackAddToCart = (price: string = "37", currency: string = "EUR") => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'AddToCart', {
      content_name: 'Manuale dell\'Idraulico Distratto',
      content_category: 'Ebook',
      value: parseFloat(price),
      currency: currency,
    });
  }
};

export const trackInitiateCheckout = (price: string = "37", currency: string = "EUR") => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'InitiateCheckout', {
      content_name: 'Manuale dell\'Idraulico Distratto',
      value: parseFloat(price),
      currency: currency,
    });
  }
};

export const trackViewContent = (contentName: string) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'ViewContent', {
      content_name: contentName,
    });
  }
};
