-- Remove tracking_events from the Realtime publication so customer PII
-- (emails, order IDs, IPs, user agents) is no longer broadcast to any subscriber.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime'
      AND schemaname = 'public'
      AND tablename = 'tracking_events'
  ) THEN
    EXECUTE 'ALTER PUBLICATION supabase_realtime DROP TABLE public.tracking_events';
  END IF;
END$$;