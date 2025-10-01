-- Add SELECT policy to contacts table to restrict access to authenticated users only
-- This prevents potential exposure of customer contact information to public access
CREATE POLICY "Only authenticated users can view contacts" 
ON public.contacts 
FOR SELECT 
TO authenticated
USING (true);