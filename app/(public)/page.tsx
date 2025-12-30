import { createClient } from '@/lib/supabase/server';
import NewsletterCard from '@/components/NewsletterCard';
import EmailSignup from '@/components/EmailSignup';
import type { Newsletter } from '@/types/database.types';

export const revalidate = 0; // Disable caching for real-time updates

export default async function HomePage() {
  const supabase = await createClient();

  // Fetch latest published newsletters
  const { data: newsletters } = await supabase
    .from('newsletters')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-nfl-dark via-nfl-darker to-black py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-display mb-6 animate-fadeIn">
            <span className="text-nfl-accent">UNFILTERED</span>{' '}
            <span className="text-white">NFL TAKES</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            No corporate BS. No sugar-coating. Just raw, real football analysis
            that'll make you rethink everything you know about the league.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/newsletter"
              className="px-8 py-4 bg-nfl-accent hover:bg-nfl-secondary text-white font-bold rounded-lg transition-colors text-lg"
            >
              READ THE ARCHIVE
            </a>
            <a
              href="#signup"
              className="px-8 py-4 bg-transparent border-2 border-white hover:bg-white hover:text-black text-white font-bold rounded-lg transition-all text-lg"
            >
              SUBSCRIBE NOW
            </a>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-display text-nfl-secondary mb-8">
          LATEST DROPS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsletters && newsletters.length > 0 ? (
            newsletters.map((newsletter) => (
              <NewsletterCard key={newsletter.id} newsletter={newsletter} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">
                No newsletters yet. Check back soon for some unfiltered takes.
              </p>
            </div>
          )}
        </div>
        {newsletters && newsletters.length > 0 && (
          <div className="text-center mt-8">
            <a
              href="/newsletter"
              className="inline-flex items-center text-nfl-accent hover:text-nfl-secondary transition-colors font-bold text-lg"
            >
              View All Newsletters
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
          </div>
        )}
      </section>

      {/* Email Signup */}
      <section id="signup" className="container mx-auto px-4 py-16">
        <EmailSignup />
      </section>

      {/* Why Subscribe Section */}
      <section className="bg-nfl-dark py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-display text-center mb-12 text-nfl-accent">
            WHY WE'RE DIFFERENT
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-6xl mb-4">🔥</div>
              <h3 className="text-2xl font-display mb-3 text-nfl-secondary">
                NO FILTER
              </h3>
              <p className="text-gray-400">
                We say what everyone's thinking but too scared to type. Profanity
                included, feelings optional.
              </p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">🏈</div>
              <h3 className="text-2xl font-display mb-3 text-nfl-secondary">
                REAL ANALYSIS
              </h3>
              <p className="text-gray-400">
                Deep dives into the game beyond the highlight reels. We watch the
                tape so you don't have to.
              </p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">💀</div>
              <h3 className="text-2xl font-display mb-3 text-nfl-secondary">
                ZERO CORPORATE BS
              </h3>
              <p className="text-gray-400">
                Not sponsored, not influenced, not holding back. Just pure,
                unfiltered football truth bombs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
