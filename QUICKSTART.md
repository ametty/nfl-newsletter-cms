# Quick Start Guide

Get your NFL newsletter site running in 10 minutes.

## 1. Install Dependencies (2 min)

```bash
cd nfl-newsletter-cms
npm install
```

## 2. Setup Supabase (3 min)

1. Create account at [supabase.com](https://supabase.com)
2. New project → wait for setup
3. SQL Editor → paste `supabase-setup.sql` → Run
4. Authentication → Add user (your admin email/password)
5. Settings → API → Copy:
   - Project URL
   - anon public key

## 3. Configure Environment (1 min)

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## 4. Run Locally (1 min)

```bash
npm run dev
```

Visit http://localhost:3000

## 5. Deploy to Vercel (3 min)

1. Push code to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

Done! 🏈

## Test Your Site

- **Public**: `yoursite.vercel.app`
- **Admin**: `yoursite.vercel.app/admin/login`

## Need Help?

See `DEPLOYMENT.md` for detailed instructions.
