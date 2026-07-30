DROP POLICY IF EXISTS "Service role manages ebooks objects" ON storage.objects;
CREATE POLICY "Service role manages ebooks objects"
ON storage.objects
FOR ALL
TO service_role
USING (bucket_id = 'ebooks')
WITH CHECK (bucket_id = 'ebooks');