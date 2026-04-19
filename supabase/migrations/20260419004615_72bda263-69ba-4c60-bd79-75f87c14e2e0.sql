CREATE TABLE public.tracking_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL CHECK (event_type IN ('view_content','add_to_cart','initiate_checkout','purchase')),
  event_id TEXT,
  source TEXT NOT NULL DEFAULT 'browser' CHECK (source IN ('browser','webhook')),
  session_id TEXT,
  customer_email TEXT,
  order_id TEXT,
  product_name TEXT,
  value NUMERIC(10,2),
  currency TEXT DEFAULT 'EUR',
  page_path TEXT,
  user_agent TEXT,
  ip_address TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_tracking_events_type_created ON public.tracking_events(event_type, created_at DESC);
CREATE INDEX idx_tracking_events_created ON public.tracking_events(created_at DESC);
CREATE INDEX idx_tracking_events_session ON public.tracking_events(session_id);
CREATE INDEX idx_tracking_events_order ON public.tracking_events(order_id);
CREATE UNIQUE INDEX idx_tracking_events_event_id ON public.tracking_events(event_id) WHERE event_id IS NOT NULL;

ALTER TABLE public.tracking_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can insert tracking events"
ON public.tracking_events
FOR INSERT
WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role can read tracking events"
ON public.tracking_events
FOR SELECT
USING (auth.role() = 'service_role');