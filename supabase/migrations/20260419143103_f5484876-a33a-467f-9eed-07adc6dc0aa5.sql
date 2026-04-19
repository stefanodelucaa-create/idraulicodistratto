
CREATE TABLE public.meta_ads_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL UNIQUE,
  spend NUMERIC NOT NULL DEFAULT 0,
  impressions INTEGER NOT NULL DEFAULT 0,
  clicks INTEGER NOT NULL DEFAULT 0,
  cpm NUMERIC NOT NULL DEFAULT 0,
  cpc NUMERIC NOT NULL DEFAULT 0,
  ctr NUMERIC NOT NULL DEFAULT 0,
  purchases INTEGER NOT NULL DEFAULT 0,
  purchase_value NUMERIC NOT NULL DEFAULT 0,
  raw JSONB,
  synced_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_meta_ads_stats_date ON public.meta_ads_stats(date DESC);

ALTER TABLE public.meta_ads_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can read meta ads stats"
  ON public.meta_ads_stats FOR SELECT
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role can insert meta ads stats"
  ON public.meta_ads_stats FOR INSERT
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role can update meta ads stats"
  ON public.meta_ads_stats FOR UPDATE
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
