# Features & Customization Guide

## ✅ Included Features

### Public Site
- ✅ Dark mode design with NFL-inspired colors
- ✅ Responsive layout (mobile, tablet, desktop)
- ✅ Homepage with hero section
- ✅ Email signup form (placeholder)
- ✅ Newsletter archive page
- ✅ Individual newsletter posts
- ✅ Rich text content rendering
- ✅ Social sharing buttons
- ✅ SEO-friendly URLs (slug-based)

### Admin Dashboard
- ✅ Secure email/password authentication
- ✅ Protected admin routes
- ✅ Dashboard with statistics
- ✅ Create new posts
- ✅ Edit existing posts
- ✅ Delete posts
- ✅ Publish/draft toggle
- ✅ Rich text editor (WYSIWYG)
- ✅ Auto-generated slugs
- ✅ Auto-generated excerpts
- ✅ Real-time preview

### Technical Features
- ✅ Next.js 14 App Router
- ✅ TypeScript for type safety
- ✅ Tailwind CSS for styling
- ✅ Supabase authentication
- ✅ Supabase database with RLS
- ✅ Server-side rendering
- ✅ API route protection
- ✅ Middleware-based auth
- ✅ Optimized for Vercel deployment

## 🎨 Customization Guide

### Change Brand Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  nfl: {
    dark: '#0a0e1a',      // Main dark background
    darker: '#050810',    // Darker sections
    accent: '#ff3366',    // Primary accent (pink/red)
    secondary: '#00d9ff', // Secondary accent (cyan)
    muted: '#6b7280',     // Muted text
  },
},
```

### Change Fonts

Update `app/globals.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Your+Font&display=swap');

:root {
  --font-inter: 'Your Font', sans-serif;
  --font-bebas: 'Your Display Font', cursive;
}
```

### Change Site Name/Title

Update in multiple files:

1. **Homepage** (`app/(public)/page.tsx`):
```typescript
<h1>YOUR SITE NAME</h1>
```

2. **Header** (`components/Header.tsx`):
```typescript
<h1>YOUR SITE NAME</h1>
```

3. **Footer** (`components/Footer.tsx`):
```typescript
<h3>YOUR SITE NAME</h3>
```

4. **Metadata** (`app/layout.tsx`):
```typescript
export const metadata: Metadata = {
  title: "Your Site - NFL Newsletter",
  description: "Your description",
};
```

### Customize Email Signup

Replace placeholder in `components/EmailSignup.tsx`:

**Mailchimp Integration**:
```typescript
const response = await fetch('/api/mailchimp', {
  method: 'POST',
  body: JSON.stringify({ email }),
});
```

**ConvertKit Integration**:
```typescript
const response = await fetch('/api/convertkit', {
  method: 'POST',
  body: JSON.stringify({ email }),
});
```

**Save to Supabase**:
```typescript
const { error } = await supabase
  .from('subscribers')
  .insert({ email });
```

### Add Analytics

**Google Analytics** - Add to `app/layout.tsx`:
```typescript
<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
  `}
</Script>
```

**Plausible Analytics** - Add to `app/layout.tsx`:
```typescript
<Script
  defer
  data-domain="yourdomain.com"
  src="https://plausible.io/js/script.js"
/>
```

### Add More Pages

Create new page in `app/(public)/about/page.tsx`:
```typescript
export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1>About Us</h1>
      {/* Your content */}
    </div>
  );
}
```

Add to navigation in `components/Header.tsx`:
```typescript
<Link href="/about">About</Link>
```

### Customize Rich Text Editor

Modify `components/RichTextEditor.tsx`:

```typescript
const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image', 'video'], // Add video
    [{ color: [] }, { background: [] }], // Add colors
    ['clean'],
  ],
};
```

### Add Comment System

**Disqus**:
```typescript
<div id="disqus_thread"></div>
<Script>
  {`
    var disqus_config = function () {
      this.page.url = window.location.href;
      this.page.identifier = '${newsletter.slug}';
    };
    (function() {
      var d = document, s = d.createElement('script');
      s.src = 'https://YOUR-SITE.disqus.com/embed.js';
      s.setAttribute('data-timestamp', +new Date());
      (d.head || d.body).appendChild(s);
    })();
  `}
</Script>
```

### Add Image Uploads

1. Enable Supabase Storage
2. Create bucket called `newsletter-images`
3. Add upload functionality to editor:

```typescript
const handleImageUpload = async (file: File) => {
  const { data, error } = await supabase.storage
    .from('newsletter-images')
    .upload(`${Date.now()}_${file.name}`, file);
  
  if (data) {
    const url = supabase.storage
      .from('newsletter-images')
      .getPublicUrl(data.path).data.publicUrl;
    return url;
  }
};
```

### Add RSS Feed

Create `app/rss.xml/route.ts`:
```typescript
export async function GET() {
  const supabase = await createClient();
  const { data: newsletters } = await supabase
    .from('newsletters')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
      <channel>
        <title>Your Newsletter</title>
        <link>https://yoursite.com</link>
        ${newsletters?.map(n => `
          <item>
            <title>${n.title}</title>
            <link>https://yoursite.com/newsletter/${n.slug}</link>
            <pubDate>${new Date(n.created_at).toUTCString()}</pubDate>
          </item>
        `).join('')}
      </channel>
    </rss>`;

  return new Response(rss, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
```

### Add Search Functionality

Create `components/Search.tsx`:
```typescript
'use client';
import { useState } from 'react';

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (q: string) => {
    // Implement search using Supabase
    const { data } = await supabase
      .from('newsletters')
      .select('*')
      .textSearch('title', q)
      .eq('published', true);
    setResults(data);
  };

  return (/* Search UI */);
}
```

## 🚀 Advanced Features to Add

### Authentication Enhancements
- Magic link login
- Password reset flow
- Multiple admin users
- Role-based permissions

### Content Features
- Categories/tags
- Featured posts
- Related posts
- Content scheduling
- Auto-save drafts

### SEO Optimization
- Open Graph tags
- Twitter cards
- Sitemap.xml
- robots.txt
- Schema markup

### Performance
- Image optimization
- Lazy loading
- Caching strategy
- CDN integration

### Marketing
- Email automation
- Newsletter templates
- A/B testing
- Conversion tracking

## 📊 Database Extensions

Add new tables for additional features:

### Categories Table
```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL
);

ALTER TABLE newsletters ADD COLUMN category_id UUID REFERENCES categories(id);
```

### Subscribers Table
```sql
CREATE TABLE subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  confirmed BOOLEAN DEFAULT false
);
```

### Comments Table
```sql
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  newsletter_id UUID REFERENCES newsletters(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  author_email TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  approved BOOLEAN DEFAULT false
);
```

## 💡 Best Practices

1. **Always backup your database** before major changes
2. **Test locally** before deploying to production
3. **Use environment variables** for sensitive data
4. **Keep dependencies updated** for security
5. **Monitor performance** with Vercel Analytics
6. **Implement proper error handling** in all forms
7. **Add loading states** for better UX
8. **Write descriptive commit messages**
9. **Use TypeScript strictly** for type safety
10. **Follow accessibility guidelines** (WCAG)

## 🐛 Common Modifications

### Change Posts Per Page
```typescript
// In archive page
.limit(10) // Change to desired number
```

### Add Reading Time
```typescript
function calculateReadingTime(content: string) {
  const words = stripHtml(content).split(/\s+/).length;
  return Math.ceil(words / 200); // 200 words per minute
}
```

### Add View Count
```typescript
// Add column to newsletters table
ALTER TABLE newsletters ADD COLUMN views INTEGER DEFAULT 0;

// Increment on page view
await supabase.rpc('increment_views', { newsletter_id: id });
```

## 📞 Support

Need help with customization?
- Check Next.js docs: https://nextjs.org/docs
- Check Supabase docs: https://supabase.com/docs
- Check Tailwind docs: https://tailwindcss.com/docs

Happy customizing! 🏈
