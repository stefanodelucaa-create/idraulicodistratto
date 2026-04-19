CREATE POLICY "Service role can delete tracking events"
ON public.tracking_events
FOR DELETE
USING (auth.role() = 'service_role');