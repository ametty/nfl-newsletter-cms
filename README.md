# NFL Newsletter Website with Admin CMS

A production-ready NFL newsletter platform with full admin dashboard. Edgy, profanity-allowed, humorous tone.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Supabase** (Auth + Database)
- **React Quill** (Rich Text Editor)
- **Vercel** (Deployment)

## Project Structure

```
nfl-newsletter-cms/
├── app/
│   ├── (public)/
│   │   ├── page.tsx                    # Homepage
│   │   ├── newsletter/
│   │   │   ├── page.tsx                # Archive page
│   │   │   └── [slug]/
│   │   │       └── page.tsx            # Individual post
│   │   └── layout.tsx
│   ├── admin/
│   │   ├── login/
│   │   │   └── page.tsx                # Admin login
│   │   ├── dashboard/
│   │   │   └── page.tsx                # Admin dashboard
│   │   ├── create/
│   │   │   └── page.tsx                # Create post
│   │   ├── edit/
│   │   │   └── [id]/
│   │   │       └── page.tsx            # Edit post
│   │   └── layout.tsx
│   ├── api/
│   │   └── auth/
│   │       └── callback/
│   │           └── route.ts            # Auth callback
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── NewsletterCard.tsx
│   ├── EmailSignup.tsx
│   └── RichTextEditor.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── middleware.ts
│   └── utils.ts
├── middleware.ts
├── types/
│   └── database.types.ts
└── package.json
```

## Setup Instructions

### 1. Clone and Install

```bash
npm install
```

### 2. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the schema (see below)
3. Get your API keys from Project Settings > API

### 3. SQL Schema

Run this in Supabase SQL Editor:

```sql
-- Create newsletters table
CREATE TABLE newsletters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for published newsletters
CREATE INDEX idx_newsletters_published ON newsletters(published, created_at DESC);

-- Create index for slug lookups
CREATE INDEX idx_newsletters_slug ON newsletters(slug);

-- Enable Row Level Security
ALTER TABLE newsletters ENABLE ROW LEVEL SECURITY;

-- Public can read published newsletters
CREATE POLICY "Public can read published newsletters" ON newsletters
  FOR SELECT USING (published = true);

-- Authenticated users can do everything (admin only in practice)
CREATE POLICY "Authenticated users can manage newsletters" ON newsletters
  FOR ALL USING (auth.role() = 'authenticated');

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_newsletters_updated_at
  BEFORE UPDATE ON newsletters
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

### 4. Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5. Create Admin User

1. Go to Supabase Authentication > Users
2. Add a new user with email/password
3. This user will be your admin

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deployment (Vercel)

1. Push code to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy

```bash
# Install Vercel CLI (optional)
npm i -g vercel

# Deploy
vercel
```

## Features

### Public Pages
- **Homepage**: Hero section with email signup and featured posts
- **Newsletter Archive**: List of all published newsletters
- **Individual Posts**: Full newsletter content with rich formatting

### Admin Dashboard
- **Login**: Email/password authentication
- **Dashboard**: View all posts (published and drafts)
- **Create**: Rich text editor for new posts
- **Edit**: Update existing posts
- **Delete**: Remove posts
- **Publish/Draft Toggle**: Control visibility

### Design
- Dark mode with bold typography
- NFL-inspired color scheme (no logos)
- Edgy, meme-friendly layout
- Mobile responsive
- Fast page loads

## Admin Routes

All admin routes are protected by middleware:

- `/admin/login` - Public login page
- `/admin/dashboard` - View all posts
- `/admin/create` - Create new post
- `/admin/edit/[id]` - Edit existing post

## Security

- Row Level Security (RLS) enabled on Supabase
- Protected admin routes via middleware
- Authentication required for all admin operations
- Environment variables for sensitive keys

## Content Guidelines

- NFL-only content
- Edgy, profanity-allowed tone
- Humorous, no corporate sports media vibe
- Rich text formatting supported
- Images and embeds allowed

## Support

For issues or questions, check:
- Supabase docs: https://supabase.com/docs
- Next.js docs: https://nextjs.org/docs
- Tailwind CSS docs: https://tailwindcss.com/docs
