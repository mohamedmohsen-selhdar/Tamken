-- SQL Migration: Add Arabic Content Columns
-- Run this in your Supabase SQL Editor

-- 1. Updates for Articles
ALTER TABLE articles ADD COLUMN IF NOT EXISTS title_ar TEXT;
ALTER TABLE articles ADD COLUMN IF NOT EXISTS content_ar TEXT;
ALTER TABLE articles ADD COLUMN IF NOT EXISTS category_ar TEXT;

-- 2. Updates for Case Studies
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS client_ar TEXT;
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS challenge_ar TEXT;
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS solution_ar TEXT;
ALTER TABLE case_studies ADD COLUMN IF NOT EXISTS impact_ar TEXT;
