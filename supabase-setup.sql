-- NFL Newsletter CMS Database Schema
-- Run this in Supabase SQL Editor

-- Create newsletters table
CREATE TABLE IF NOT EXISTS newsletters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for published newsletters (improves query performance)
CREATE INDEX IF NOT EXISTS idx_newsletters_published 
  ON newsletters(published, created_at DESC);

-- Create index for slug lookups (improves single post queries)
CREATE INDEX IF NOT EXISTS idx_newsletters_slug 
  ON newsletters(slug);

-- Enable Row Level Security
ALTER TABLE newsletters ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for clean reinstall)
DROP POLICY IF EXISTS "Public can read published newsletters" ON newsletters;
DROP POLICY IF EXISTS "Authenticated users can manage newsletters" ON newsletters;

-- Policy: Public can read published newsletters
CREATE POLICY "Public can read published newsletters" ON newsletters
  FOR SELECT USING (published = true);

-- Policy: Authenticated users can do everything (admin only in practice)
CREATE POLICY "Authenticated users can manage newsletters" ON newsletters
  FOR ALL USING (auth.role() = 'authenticated');

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop trigger if exists (for clean reinstall)
DROP TRIGGER IF EXISTS update_newsletters_updated_at ON newsletters;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_newsletters_updated_at
  BEFORE UPDATE ON newsletters
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Optional: Insert sample newsletter for testing
INSERT INTO newsletters (title, slug, content, excerpt, published)
VALUES (
  'Welcome to Gridiron Unfiltered',
  'welcome-to-gridiron-unfiltered',
  '<h2>This is where the real NFL talk happens</h2><p>Forget everything you know about corporate sports media. We''re here to give you the <strong>unfiltered truth</strong> about the NFL - no PR spin, no soft reporting, just raw football analysis.</p><p>Every week, we break down the games, the drama, and the BS that the mainstream media won''t touch. From questionable coaching decisions to front office disasters, nothing is off limits.</p><h3>What to Expect</h3><ul><li>Weekly game breakdowns with zero corporate influence</li><li>Hot takes that actually make sense</li><li>Player and coach analysis that goes beyond the highlights</li><li>The kind of profanity-laced commentary your friends would make</li></ul><p>Welcome to the revolution. Let''s talk some damn football.</p>',
  'Forget everything you know about corporate sports media. This is where the real NFL talk happens.',
  true
)
ON CONFLICT (slug) DO NOTHING;

-- Verify setup
SELECT 
  'Setup complete!' as status,
  COUNT(*) as newsletter_count 
FROM newsletters;
