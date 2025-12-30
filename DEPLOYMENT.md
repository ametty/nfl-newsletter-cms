# Deployment Guide - NFL Newsletter CMS

## Prerequisites

- Node.js 18+ installed
- Git installed
- GitHub account
- Supabase account (free tier works)
- Vercel account (free tier works)

## Step 1: Supabase Setup

### 1.1 Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - Name: `nfl-newsletter-cms`
   - Database Password: (save this securely)
   - Region: Choose closest to your users
5. Click "Create new project"
6. Wait for project to be ready (~2 minutes)

### 1.2 Run Database Schema

1. In your Supabase project, go to **SQL Editor**
2. Click "New Query"
3. Copy the contents of `supabase-setup.sql`
4. Paste into the SQL editor
5. Click "Run" or press `Ctrl+Enter`
6. Verify success message appears

### 1.3 Get API Keys

1. Go to **Project Settings** > **API**
2. Copy these values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)
3. Save these for later

### 1.4 Create Admin User

1. Go to **Authentication** > **Users**
2. Click "Add user" > "Create new user"
3. Enter:
   - Email: Your admin email
   - Password: Strong password (save it!)
   - Auto Confirm User: Enable this
4. Click "Create user"

## Step 2: Local Development Setup

### 2.1 Clone Repository

```bash
# If you have the code in a GitHub repo:
git clone https://github.com/yourusername/nfl-newsletter-cms.git
cd nfl-newsletter-cms

# Or if starting fresh, copy all the files to a new directory:
mkdir nfl-newsletter-cms
cd nfl-newsletter-cms
# Copy all provided files here
```

### 2.2 Install Dependencies

```bash
npm install
```

### 2.3 Configure Environment Variables

Create `.env.local` file:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 2.4 Test Locally

```bash
npm run dev
```

Visit `http://localhost:3000`:
- Homepage should load
- Try `/admin/login` with your admin credentials
- Create a test post
- Verify it appears on the homepage

## Step 3: Deploy to Vercel

### 3.1 Push to GitHub

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: NFL Newsletter CMS"

# Create repo on GitHub, then:
git remote add origin https://github.com/yourusername/nfl-newsletter-cms.git
git branch -M main
git push -u origin main
```

### 3.2 Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" > "Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (leave as is)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

5. Add Environment Variables:
   - Click "Environment Variables"
   - Add each variable:
     ```
     NEXT_PUBLIC_SUPABASE_URL = https://xxxxx.supabase.co
     NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI...
     ```
   - Apply to: Production, Preview, and Development

6. Click "Deploy"
7. Wait for deployment (~2-3 minutes)
8. Your site is live!

### 3.3 Configure Custom Domain (Optional)

1. In Vercel project settings, go to "Domains"
2. Add your custom domain (e.g., `gridironunfiltered.com`)
3. Follow Vercel's DNS configuration instructions
4. Update DNS records at your domain registrar
5. Wait for DNS propagation (~5-60 minutes)

## Step 4: Post-Deployment Setup

### 4.1 Update Supabase Auth Settings

1. Go to Supabase **Authentication** > **URL Configuration**
2. Add your Vercel URLs to "Site URL" and "Redirect URLs":
   ```
   https://your-project.vercel.app
   https://your-project.vercel.app/api/auth/callback
   ```

### 4.2 Test Production Site

1. Visit your deployed URL
2. Test public pages:
   - Homepage
   - Newsletter archive
   - Individual newsletter post
3. Test admin:
   - Login at `/admin/login`
   - Create a new post
   - Edit existing post
   - Toggle publish/draft
   - Delete a test post
4. Test on mobile device

### 4.3 Email Integration (Optional)

The EmailSignup component is a placeholder. To collect emails:

**Option 1: Mailchimp**
```javascript
// In EmailSignup.tsx handleSubmit:
const response = await fetch('/api/subscribe', {
  method: 'POST',
  body: JSON.stringify({ email }),
});
```

**Option 2: ConvertKit**
```javascript
const response = await fetch('https://api.convertkit.com/v3/forms/YOUR_FORM_ID/subscribe', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    api_key: process.env.CONVERTKIT_API_KEY,
    email: email,
  }),
});
```

**Option 3: Store in Supabase**
Create a `subscribers` table and save emails there.

## Step 5: Ongoing Maintenance

### Update Content
- Login at `/admin/login`
- Create posts at `/admin/create`
- Manage posts at `/admin/dashboard`

### Monitor Performance
- Check Vercel Analytics dashboard
- Monitor Supabase database usage
- Review error logs in Vercel

### Backup Database
```bash
# In Supabase dashboard:
# Settings > Database > Connection string
# Use pg_dump or Supabase backups feature
```

### Update Dependencies
```bash
npm update
npm audit fix
git add package.json package-lock.json
git commit -m "Update dependencies"
git push
```

## Troubleshooting

### "Authentication error" on login
- Verify environment variables are set correctly in Vercel
- Check Supabase Auth URL configuration includes your domain
- Ensure admin user is created and confirmed

### Posts not appearing on homepage
- Check if posts are marked as `published = true`
- Verify RLS policies in Supabase
- Check browser console for errors

### Rich text editor not loading
- Ensure `react-quill` is installed
- Check for JavaScript errors in browser console
- Verify Next.js dynamic import is working

### Build fails on Vercel
- Check all TypeScript errors are resolved
- Verify all dependencies are in package.json
- Review Vercel build logs for specific errors

### Styles not loading
- Ensure `globals.css` is imported in `app/layout.tsx`
- Check Tailwind config includes all content paths
- Verify PostCSS is configured correctly

## Security Best Practices

1. **Never commit `.env.local`** to git
2. **Use strong passwords** for admin accounts
3. **Enable MFA** in Supabase if available
4. **Regularly update dependencies** for security patches
5. **Monitor Supabase logs** for suspicious activity
6. **Use environment-specific variables** for production

## Support Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **Tailwind CSS**: https://tailwindcss.com/docs

## Next Steps

1. Customize the design and branding
2. Add analytics (Google Analytics, Plausible)
3. Set up email marketing integration
4. Add social sharing features
5. Implement SEO optimization
6. Create RSS feed
7. Add comment system (optional)

Your NFL newsletter site is now live and ready to drop some unfiltered takes!
