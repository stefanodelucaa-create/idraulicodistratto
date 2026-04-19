ALTER TABLE public.tracking_events DROP CONSTRAINT IF EXISTS tracking_events_event_type_check;
ALTER TABLE public.tracking_events ADD CONSTRAINT tracking_events_event_type_check
  CHECK (event_type = ANY (ARRAY[
    'view_content','add_to_cart','initiate_checkout','purchase',
    'page_view','session_start','scroll_depth','lead'
  ]));