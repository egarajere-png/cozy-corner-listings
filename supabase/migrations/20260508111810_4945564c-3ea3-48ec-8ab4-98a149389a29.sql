
-- Fix function search_path
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

-- Revoke direct execute on SECURITY DEFINER helper from public roles (still callable inside RLS policies)
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;

-- Add length validation to inquiries (safer than USING(true) alone)
CREATE OR REPLACE FUNCTION public.validate_inquiry()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  IF length(NEW.name) = 0 OR length(NEW.name) > 120 THEN RAISE EXCEPTION 'Invalid name'; END IF;
  IF length(NEW.email) = 0 OR length(NEW.email) > 255 THEN RAISE EXCEPTION 'Invalid email'; END IF;
  IF length(NEW.message) = 0 OR length(NEW.message) > 4000 THEN RAISE EXCEPTION 'Invalid message'; END IF;
  IF NEW.phone IS NOT NULL AND length(NEW.phone) > 40 THEN RAISE EXCEPTION 'Invalid phone'; END IF;
  IF NEW.subject IS NOT NULL AND length(NEW.subject) > 200 THEN RAISE EXCEPTION 'Invalid subject'; END IF;
  -- Force safe defaults regardless of client input
  NEW.status := 'new';
  RETURN NEW;
END;
$$;

CREATE TRIGGER inquiries_validate
  BEFORE INSERT ON public.inquiries
  FOR EACH ROW EXECUTE FUNCTION public.validate_inquiry();
