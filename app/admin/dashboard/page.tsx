import { createClient } from '@/lib/supabase/server';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

export const revalidate = 0;

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Fetch all newsletters (published and drafts)
  const { data: newsletters } = await supabase
    .from('newsletters')
    .select('*')
    .order('created_at', { ascending: false });

  const publishedCount = newsletters?.filter((n) => n.published).length || 0;
  const draftCount = newsletters?.filter((n) => !n.published).length || 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-display text-white mb-2">DASHBOARD</h1>
          <p className="text-gray-400">
            Manage your unfiltered NFL newsletter content
          </p>
        </div>
        <Link
          href="/admin/create"
          className="px-6 py-3 bg-nfl-accent hover:bg-nfl-secondary text-white font-bold rounded-lg transition-colors"
        >
          + CREATE NEW POST
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-nfl-dark border border-gray-800 rounded-lg p-6">
          <p className="text-gray-400 mb-2">Total Posts</p>
          <p className="text-4xl font-display text-nfl-accent">
            {newsletters?.length || 0}
          </p>
        </div>
        <div className="bg-nfl-dark border border-gray-800 rounded-lg p-6">
          <p className="text-gray-400 mb-2">Published</p>
          <p className="text-4xl font-display text-nfl-secondary">
            {publishedCount}
          </p>
        </div>
        <div className="bg-nfl-dark border border-gray-800 rounded-lg p-6">
          <p className="text-gray-400 mb-2">Drafts</p>
          <p className="text-4xl font-display text-yellow-500">{draftCount}</p>
        </div>
      </div>

      {/* Newsletter List */}
      <div className="bg-nfl-dark border border-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-nfl-darker">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-400 uppercase">
                  Title
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-400 uppercase">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-400 uppercase">
                  Created
                </th>
                <th className="px-6 py-4 text-right text-sm font-bold text-gray-400 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {newsletters && newsletters.length > 0 ? (
                newsletters.map((newsletter) => (
                  <tr key={newsletter.id} className="hover:bg-nfl-darker/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="font-medium text-white">
                            {newsletter.title}
                          </p>
                          <p className="text-sm text-gray-500">
                            /{newsletter.slug}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {newsletter.published ? (
                        <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-sm font-medium">
                          Published
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-yellow-500/10 text-yellow-500 rounded-full text-sm font-medium">
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-sm">
                      {formatDate(newsletter.created_at)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {newsletter.published && (
                          <Link
                            href={`/newsletter/${newsletter.slug}`}
                            target="_blank"
                            className="px-3 py-2 text-sm text-nfl-secondary hover:text-nfl-accent transition-colors"
                          >
                            View
                          </Link>
                        )}
                        <Link
                          href={`/admin/edit/${newsletter.id}`}
                          className="px-3 py-2 text-sm bg-nfl-accent hover:bg-nfl-secondary text-white rounded-lg transition-colors"
                        >
                          Edit
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                    No newsletters yet. Create your first post!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
