import { createClient } from '@/lib/supabase/server';
import { formatDate } from '@/lib/utils';
import { notFound } from 'next/navigation';
import EmailSignup from '@/components/EmailSignup';

export const revalidate = 0;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function NewsletterPage({ params }: PageProps) {
  const resolvedParams = await params;
  const supabase = await createClient();

  // Fetch newsletter by slug
  const { data: newsletter } = await supabase
    .from('newsletters')
    .select('*')
    .eq('slug', resolvedParams.slug)
    .eq('published', true)
    .single();

  if (!newsletter) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-nfl-dark via-nfl-darker to-black py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <time className="text-nfl-secondary font-medium mb-4 block">
            {formatDate(newsletter.created_at)}
          </time>
          <h1 className="text-4xl md:text-6xl font-display text-white mb-6">
            {newsletter.title}
          </h1>
          {newsletter.excerpt && (
            <p className="text-xl text-gray-400">{newsletter.excerpt}</p>
          )}
        </div>
      </div>

      {/* Content */}
      <article className="container mx-auto px-4 py-12 max-w-4xl">
        <div
          className="newsletter-content"
          dangerouslySetInnerHTML={{ __html: newsletter.content }}
        />
      </article>

      {/* Share Section */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="border-t border-b border-gray-800 py-8">
          <p className="text-gray-400 text-center mb-4">
            Enjoyed this unfiltered take? Share it with your football-obsessed friends.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(newsletter.title)}&url=${encodeURIComponent(`https://yourdomain.com/newsletter/${newsletter.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-nfl-accent hover:bg-nfl-secondary text-white font-bold rounded-lg transition-colors"
            >
              Share on Twitter
            </a>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
              }}
              className="px-6 py-3 bg-nfl-dark hover:bg-gray-800 text-white font-bold rounded-lg transition-colors"
            >
              Copy Link
            </button>
          </div>
        </div>
      </div>

      {/* Email Signup */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <EmailSignup />
      </div>

      {/* Back to Archive */}
      <div className="container mx-auto px-4 pb-12 max-w-4xl">
        <a
          href="/newsletter"
          className="inline-flex items-center text-nfl-secondary hover:text-nfl-accent transition-colors font-medium"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Archive
        </a>
      </div>
    </div>
  );
}
