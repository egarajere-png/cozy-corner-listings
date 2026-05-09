ALTER TABLE public.properties REPLICA IDENTITY FULL;
ALTER TABLE public.inquiries REPLICA IDENTITY FULL;
DO $$ BEGIN
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.properties;
  EXCEPTION WHEN duplicate_object THEN NULL; END;
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.inquiries;
  EXCEPTION WHEN duplicate_object THEN NULL; END;
END $$;

-- Trigger to enforce inquiry validation on insert
DROP TRIGGER IF EXISTS validate_inquiry_trigger ON public.inquiries;
CREATE TRIGGER validate_inquiry_trigger
BEFORE INSERT ON public.inquiries
FOR EACH ROW EXECUTE FUNCTION public.validate_inquiry();