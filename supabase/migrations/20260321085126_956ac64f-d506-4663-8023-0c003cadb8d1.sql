
-- Founder submissions table
CREATE TABLE public.founder_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  stage text,
  industry text,
  in_uae text,
  support_needed text[],
  description text,
  contact_method text
);

ALTER TABLE public.founder_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts" ON public.founder_submissions
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Expert submissions table
CREATE TABLE public.expert_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  linkedin text,
  role text,
  expertise text,
  industry text,
  years_experience integer,
  expert_type text,
  advises_founders text,
  summary text,
  why_join text
);

ALTER TABLE public.expert_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts" ON public.expert_submissions
  FOR INSERT TO anon, authenticated WITH CHECK (true);
