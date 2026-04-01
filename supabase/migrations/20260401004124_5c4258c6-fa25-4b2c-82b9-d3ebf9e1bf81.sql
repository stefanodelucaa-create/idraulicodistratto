
-- Create storage bucket for ebook PDFs
INSERT INTO storage.buckets (id, name, public)
VALUES ('ebooks', 'ebooks', false);

-- Allow public read access to ebook files (download via signed URLs from edge function)
CREATE POLICY "Allow public read access to ebooks"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'ebooks');

-- Create orders table to track purchases
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_session_id TEXT UNIQUE NOT NULL,
  stripe_payment_intent_id TEXT,
  customer_email TEXT NOT NULL,
  customer_name TEXT,
  amount_total INTEGER NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'eur',
  includes_lifetime BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'pending',
  download_token UUID DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS: orders are not publicly accessible, only via edge functions with service role
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
