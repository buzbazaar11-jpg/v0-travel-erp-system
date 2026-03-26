-- Auto-create profile trigger for new users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  default_company_id UUID;
BEGIN
  -- Get or create a default company if none exists in the system
  SELECT id INTO default_company_id FROM companies LIMIT 1;
  
  IF default_company_id IS NULL THEN
    INSERT INTO companies (name, email)
    VALUES (
      COALESCE(new.raw_user_meta_data ->> 'company_name', 'Default Company'),
      new.email
    )
    RETURNING id INTO default_company_id;
  END IF;

  INSERT INTO user_profiles (id, company_id, first_name, last_name, role)
  VALUES (
    new.id,
    default_company_id,
    COALESCE(new.raw_user_meta_data ->> 'first_name', ''),
    COALESCE(new.raw_user_meta_data ->> 'last_name', ''),
    COALESCE(new.raw_user_meta_data ->> 'role', 'user')
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN new;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
