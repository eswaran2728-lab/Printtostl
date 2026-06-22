-- PhotoToSTL Pro - Supabase Schema
-- Run this in your Supabase SQL Editor

-- Users table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  name TEXT,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'creator', 'business', 'studio')),
  credits_used INTEGER DEFAULT 0,
  credits_total INTEGER DEFAULT 3,
  storage_used_mb BIGINT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects table
CREATE TABLE public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  model_type TEXT NOT NULL,
  output_format TEXT DEFAULT 'stl' CHECK (output_format IN ('stl', 'obj', 'glb')),
  print_type TEXT DEFAULT 'fdm',
  printer_profile TEXT DEFAULT 'generic_fdm',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  settings JSONB DEFAULT '{}',
  size_settings JSONB DEFAULT '{}',
  optimization_flags JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Uploaded images
CREATE TABLE public.uploaded_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  image_role TEXT NOT NULL CHECK (image_role IN ('front', 'side', 'back', 'detail')),
  original_url TEXT,
  processed_url TEXT,
  background_removed BOOLEAN DEFAULT FALSE,
  enhanced BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Generated models
CREATE TABLE public.generated_models (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  model_url TEXT,
  file_format TEXT,
  file_size_mb NUMERIC,
  generation_api TEXT, -- 'meshy', 'tripo', 'hunyuan3d', 'triposr'
  api_job_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Printability reports
CREATE TABLE public.printability_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  score INTEGER CHECK (score >= 0 AND score <= 100),
  is_manifold BOOLEAN,
  wall_thickness_status TEXT,
  has_floating_parts BOOLEAN,
  supports_needed BOOLEAN,
  fragile_parts_count INTEGER DEFAULT 0,
  file_size_mb NUMERIC,
  estimated_print_time TEXT,
  estimated_filament_grams NUMERIC,
  recommended_printer TEXT,
  recommended_nozzle TEXT,
  layer_height TEXT,
  warnings JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Generation logs (pipeline steps)
CREATE TABLE public.generation_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  step_number INTEGER,
  step_name TEXT,
  status TEXT CHECK (status IN ('pending', 'processing', 'done', 'failed')),
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subscriptions
CREATE TABLE public.subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  plan TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  billing_cycle TEXT DEFAULT 'monthly',
  amount_rm NUMERIC,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.uploaded_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generated_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.printability_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generation_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can view own projects" ON public.projects FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own projects" ON public.projects FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own projects" ON public.projects FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own projects" ON public.projects FOR DELETE USING (auth.uid() = user_id);
