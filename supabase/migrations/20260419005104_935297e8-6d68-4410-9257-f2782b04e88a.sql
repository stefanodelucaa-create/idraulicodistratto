ALTER TABLE public.tracking_events REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.tracking_events;