-- Make analytics table policies more explicit and secure
-- Drop existing policy and recreate with explicit public denial
DROP POLICY IF EXISTS "Only authenticated users can view analytics" ON public.analytics;

-- Create explicit policies
CREATE POLICY "Public cannot read analytics" 
ON public.analytics 
FOR SELECT 
TO public
USING (false);

CREATE POLICY "Authenticated users can read analytics" 
ON public.analytics 
FOR SELECT 
TO authenticated
USING (true);