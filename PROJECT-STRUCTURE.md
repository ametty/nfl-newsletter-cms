# Project Structure

```
nfl-newsletter-cms/
│
├── app/                                  # Next.js App Router
│   ├── (public)/                        # Public routes group
│   │   ├── layout.tsx                   # Public layout with header/footer
│   │   ├── page.tsx                     # Homepage with hero & featured posts
│   │   └── newsletter/
│   │       ├── page.tsx                 # Newsletter archive
│   │       └── [slug]/
│   │           └── page.tsx             # Individual newsletter post
│   │
│   ├── admin/                           # Admin routes (protected)
│   │   ├── layout.tsx                   # Admin layout with nav
│   │   ├── login/
│   │   │   └── page.tsx                 # Admin login page
│   │   ├── dashboard/
│   │   │   └── page.tsx                 # Admin dashboard
│   │   ├── create/
│   │   │   └── page.tsx                 # Create new post
│   │   ├── edit/
│   │   │   └── [id]/
│   │   │       └── page.tsx             # Edit post by ID
│   │   └── logout/
│   │       └── route.ts                 # Logout API route
│   │
│   ├── api/
│   │   └── auth/
│   │       └── callback/
│   │           └── route.ts             # OAuth callback handler
│   │
│   ├── layout.tsx                       # Root layout
│   └── globals.css                      # Global styles & Tailwind
│
├── components/                          # Reusable React components
│   ├── Header.tsx                       # Site header/navigation
│   ├── Footer.tsx                       # Site footer
│   ├── NewsletterCard.tsx               # Newsletter preview card
│   ├── EmailSignup.tsx                  # Email subscription form
│   └── RichTextEditor.tsx               # WYSIWYG editor (React Quill)
│
├── lib/                                 # Utility functions
│   ├── supabase/
│   │   ├── client.ts                    # Browser Supabase client
│   │   ├── server.ts                    # Server Supabase client
│   │   └── middleware.ts                # Middleware Supabase client
│   └── utils.ts                         # Helper functions (slug, date, etc.)
│
├── types/
│   └── database.types.ts                # TypeScript database types
│
├── middleware.ts                        # Next.js middleware for auth
│
├── package.json                         # Dependencies & scripts
├── tsconfig.json                        # TypeScript configuration
├── tailwind.config.ts                   # Tailwind CSS configuration
├── postcss.config.js                    # PostCSS configuration
├── next.config.js                       # Next.js configuration
│
├── .env.local.example                   # Environment variables template
├── .gitignore                           # Git ignore rules
│
├── supabase-setup.sql                   # Database schema SQL
│
├── README.md                            # Project overview & setup
├── QUICKSTART.md                        # 10-minute setup guide
├── DEPLOYMENT.md                        # Detailed deployment guide
└── CUSTOMIZATION.md                     # Features & customization guide
```

## File Descriptions

### App Routes

**Public Routes** (`app/(public)/`):
- `page.tsx` - Homepage with hero, featured posts, email signup
- `newsletter/page.tsx` - Archive of all published newsletters
- `newsletter/[slug]/page.tsx` - Individual newsletter with full content

**Admin Routes** (`app/admin/`):
- `login/page.tsx` - Email/password login form
- `dashboard/page.tsx` - List all posts with stats
- `create/page.tsx` - Create new newsletter post
- `edit/[id]/page.tsx` - Edit existing post by ID
- `logout/route.ts` - Sign out and redirect

### Components

- `Header.tsx` - Site branding, navigation, admin link
- `Footer.tsx` - Footer content, disclaimer, links
- `NewsletterCard.tsx` - Preview card for newsletter posts
- `EmailSignup.tsx` - Email subscription form (placeholder)
- `RichTextEditor.tsx` - Rich text editor with React Quill

### Library Functions

**Supabase Clients**:
- `client.ts` - Browser-side client for client components
- `server.ts` - Server-side client for server components
- `middleware.ts` - Middleware client for route protection

**Utils**:
- `createSlug()` - Generate URL-safe slugs
- `formatDate()` - Format dates for display
- `truncateText()` - Create excerpts
- `stripHtml()` - Remove HTML tags

### Configuration Files

- `package.json` - All npm dependencies and scripts
- `tsconfig.json` - TypeScript compiler options
- `tailwind.config.ts` - Custom colors, fonts, theme
- `next.config.js` - Next.js configuration
- `middleware.ts` - Route protection logic

### Documentation

- `README.md` - Project overview, features, basic setup
- `QUICKSTART.md` - 10-minute quick start guide
- `DEPLOYMENT.md` - Step-by-step deployment instructions
- `CUSTOMIZATION.md` - Customization guide and advanced features

## Key Technologies

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Supabase** - Backend (auth + database)
- **React Quill** - Rich text editor
- **Vercel** - Deployment platform

## Database Schema

**newsletters** table:
- `id` - UUID primary key
- `title` - Post title
- `slug` - URL-friendly slug
- `content` - Rich text HTML content
- `excerpt` - Short preview (auto-generated)
- `published` - Boolean for draft/published
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

## Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## NPM Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Routes Map

**Public**:
- `/` - Homepage
- `/newsletter` - Archive
- `/newsletter/[slug]` - Individual post

**Admin** (Protected):
- `/admin/login` - Login page
- `/admin/dashboard` - Dashboard
- `/admin/create` - Create post
- `/admin/edit/[id]` - Edit post

## Security Features

- Row Level Security (RLS) on database
- Middleware-based route protection
- Authenticated-only admin access
- Environment variable protection
- SQL injection prevention (Supabase)
- XSS protection (React)

## Production Ready

✅ TypeScript type safety
✅ Server-side rendering
✅ Protected API routes
✅ Responsive design
✅ SEO-friendly URLs
✅ Error handling
✅ Loading states
✅ Database indexes
✅ Optimized queries
✅ Clean code structure
