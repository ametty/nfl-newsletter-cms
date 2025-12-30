import Link from 'next/link';
import { formatDate, stripHtml, truncateText } from '@/lib/utils';
import type { Newsletter } from '@/types/database.types';

interface NewsletterCardProps {
  newsletter: Newsletter;
}

export default function NewsletterCard({ newsletter }: NewsletterCardProps) {
  const excerpt = newsletter.excerpt || truncateText(stripHtml(newsletter.content), 150);

  return (
    <article className="bg-nfl-dark border border-gray-800 rounded-lg p-6 hover:border-nfl-accent transition-all group">
      <div className="flex items-start justify-between mb-3">
        <time className="text-sm text-nfl-secondary font-medium">
          {formatDate(newsletter.created_at)}
        </time>
        {!newsletter.published && (
          <span className="text-xs bg-yellow-500 text-black px-2 py-1 rounded font-bold">
            DRAFT
          </span>
        )}
      </div>

      <Link href={`/newsletter/${newsletter.slug}`}>
        <h3 className="text-2xl font-display text-white mb-3 group-hover:text-nfl-accent transition-colors">
          {newsletter.title}
        </h3>
      </Link>

      <p className="text-gray-400 mb-4 line-clamp-3">{excerpt}</p>

      <Link
        href={`/newsletter/${newsletter.slug}`}
        className="inline-flex items-center text-nfl-secondary hover:text-nfl-accent transition-colors font-medium"
      >
        Read More
        <svg
          className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </Link>
    </article>
  );
}
