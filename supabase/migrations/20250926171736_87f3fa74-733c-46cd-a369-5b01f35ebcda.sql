-- Fix critical security issues with RLS policies

-- 1. Add proper RLS policy for analytics table to restrict SELECT access
-- Only authenticated users should be able to view analytics data (for admin purposes)
CREATE POLICY "Only authenticated users can view analytics" 
ON public.analytics 
FOR SELECT 
TO authenticated
USING (true);

-- 2. Add comprehensive RLS policies for messages table
-- Enable RLS first
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert messages (for contact forms)
CREATE POLICY "Anyone can submit messages" 
ON public.messages 
FOR INSERT 
WITH CHECK (true);

-- Only authenticated users can view messages (for admin purposes)
CREATE POLICY "Only authenticated users can view messages" 
ON public.messages 
FOR SELECT 
TO authenticated
USING (true);

-- Only authenticated users can update message status
CREATE POLICY "Only authenticated users can update messages" 
ON public.messages 
FOR UPDATE 
TO authenticated
USING (true);

-- Only authenticated users can delete messages
CREATE POLICY "Only authenticated users can delete messages" 
ON public.messages 
FOR DELETE 
TO authenticated
USING (true);