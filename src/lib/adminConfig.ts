// Whitelist di email autorizzate alla dashboard analytics.
// Mantieni allineato con ADMIN_EMAILS in supabase/functions/analytics-data/index.ts
export const ADMIN_EMAILS = new Set([
  'idraulicodistratto@gmail.com',
]);

export const isAdminEmail = (email?: string | null): boolean =>
  !!email && ADMIN_EMAILS.has(email.toLowerCase());
