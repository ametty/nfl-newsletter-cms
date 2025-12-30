import { createClient } from '@/lib/supabase/server';
import NewsletterCard from '@/components/NewsletterCard';
import type { Newsletter } from '@/types/database.types';

export const revalidate = 0;

export default async function NewsletterArchivePage() {
  const supabase = await createClient();

  // Fetch all published newsletters
  const { data: newsletters } = await supabase
    .from('newsletters')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-5xl md:text-6xl font-display text-nfl-accent mb-4">
          NEWSLETTER ARCHIVE
        </h1>
        <p className="text-xl text-gray-400">
          Every unfiltered take, every controversial opinion, every truth bomb we've dropped.
        </p>
      </div>

      {newsletters && newsletters.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsletters.map((newsletter) => (
            <NewsletterCard key={newsletter.id} newsletter={newsletter} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-500 text-xl mb-4">
            No newsletters published yet.
          </p>
          <p className="text-gray-600">
            Check back soon for some unfiltered NFL takes.
          </p>
        </div>
      )}
    </div>
  );
}
