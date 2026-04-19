ALTER TABLE public.meta_ads_stats
ADD COLUMN IF NOT EXISTS account_timezone_name text,
ADD COLUMN IF NOT EXISTS account_timezone_offset_hours_utc numeric,
ADD COLUMN IF NOT EXISTS link_clicks integer NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS link_ctr numeric NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS link_cpc numeric NOT NULL DEFAULT 0;