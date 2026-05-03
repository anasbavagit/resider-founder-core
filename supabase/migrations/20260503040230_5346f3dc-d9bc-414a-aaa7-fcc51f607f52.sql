
-- 1. Add columns to expert_submissions
ALTER TABLE public.expert_submissions
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'waitlist',
  ADD COLUMN IF NOT EXISTS auth_user_id uuid,
  ADD COLUMN IF NOT EXISTS id_document_url text,
  ADD COLUMN IF NOT EXISTS credential_document_url text,
  ADD COLUMN IF NOT EXISTS admin_notes text,
  ADD COLUMN IF NOT EXISTS reviewed_at timestamptz;

CREATE INDEX IF NOT EXISTS idx_expert_submissions_auth_user_id ON public.expert_submissions(auth_user_id);
CREATE INDEX IF NOT EXISTS idx_expert_submissions_status ON public.expert_submissions(status);

-- 2. App role enum + user_roles table
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin', 'expert', 'user');
EXCEPTION WHEN duplicate_object THEN null; END $$;

CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 3. has_role security definer function
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- 4. RLS for user_roles
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
CREATE POLICY "Admins can view all roles"
ON public.user_roles FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;
CREATE POLICY "Admins can manage roles"
ON public.user_roles FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 5. Expanded RLS for expert_submissions
DROP POLICY IF EXISTS "Experts can view own submission" ON public.expert_submissions;
CREATE POLICY "Experts can view own submission"
ON public.expert_submissions FOR SELECT TO authenticated
USING (auth.uid() = auth_user_id);

DROP POLICY IF EXISTS "Experts can update own submission" ON public.expert_submissions;
CREATE POLICY "Experts can update own submission"
ON public.expert_submissions FOR UPDATE TO authenticated
USING (auth.uid() = auth_user_id)
WITH CHECK (auth.uid() = auth_user_id);

DROP POLICY IF EXISTS "Admins can view all submissions" ON public.expert_submissions;
CREATE POLICY "Admins can view all submissions"
ON public.expert_submissions FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can update all submissions" ON public.expert_submissions;
CREATE POLICY "Admins can update all submissions"
ON public.expert_submissions FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 6. Storage bucket for expert documents (private)
INSERT INTO storage.buckets (id, name, public)
VALUES ('expert-documents', 'expert-documents', false)
ON CONFLICT (id) DO NOTHING;

-- 7. Storage RLS: experts in their own folder, admins read all
DROP POLICY IF EXISTS "Experts can upload own documents" ON storage.objects;
CREATE POLICY "Experts can upload own documents"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'expert-documents'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

DROP POLICY IF EXISTS "Experts can read own documents" ON storage.objects;
CREATE POLICY "Experts can read own documents"
ON storage.objects FOR SELECT TO authenticated
USING (
  bucket_id = 'expert-documents'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

DROP POLICY IF EXISTS "Experts can update own documents" ON storage.objects;
CREATE POLICY "Experts can update own documents"
ON storage.objects FOR UPDATE TO authenticated
USING (
  bucket_id = 'expert-documents'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

DROP POLICY IF EXISTS "Admins can read all expert documents" ON storage.objects;
CREATE POLICY "Admins can read all expert documents"
ON storage.objects FOR SELECT TO authenticated
USING (
  bucket_id = 'expert-documents'
  AND public.has_role(auth.uid(), 'admin')
);
