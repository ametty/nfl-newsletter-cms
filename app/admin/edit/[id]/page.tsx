'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter, useParams } from 'next/navigation';
import { createSlug, stripHtml, truncateText } from '@/lib/utils';
import RichTextEditor from '@/components/RichTextEditor';

export default function EditNewsletterPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const params = useParams();
  const supabase = createClient();
  const id = params.id as string;

  useEffect(() => {
    loadNewsletter();
  }, [id]);

  const loadNewsletter = async () => {
    const { data, error } = await supabase
      .from('newsletters')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      setError('Newsletter not found');
      setLoadingData(false);
      return;
    }

    if (data) {
      setTitle(data.title);
      setContent(data.content);
      setPublished(data.published);
    }

    setLoadingData(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!title.trim() || !content.trim()) {
      setError('Title and content are required');
      setLoading(false);
      return;
    }

    const slug = createSlug(title);
    const excerpt = truncateText(stripHtml(content), 150);

    const { error: updateError } = await supabase
      .from('newsletters')
      .update({
        title: title.trim(),
        slug,
        content,
        excerpt,
        published,
      })
      .eq('id', id);

    if (updateError) {
      setError(updateError.message);
      setLoading(false);
    } else {
      router.push('/admin/dashboard');
      router.refresh();
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this newsletter? This action cannot be undone.')) {
      return;
    }

    setLoading(true);
    const { error: deleteError } = await supabase
      .from('newsletters')
      .delete()
      .eq('id', id);

    if (deleteError) {
      setError(deleteError.message);
      setLoading(false);
    } else {
      router.push('/admin/dashboard');
      router.refresh();
    }
  };

  if (loadingData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-nfl-accent mx-auto mb-4"></div>
          <p className="text-gray-400">Loading newsletter...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-display text-white mb-2">EDIT POST</h1>
        <p className="text-gray-400">
          Update your unfiltered NFL take
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-3 bg-nfl-dark border border-gray-700 rounded-lg focus:outline-none focus:border-nfl-accent text-white text-lg"
            placeholder="Why [Team] is Actually Screwed This Season"
          />
          {title && (
            <p className="mt-2 text-sm text-gray-500">
              Slug: /{createSlug(title)}
            </p>
          )}
        </div>

        {/* Content */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-2">
            Content
          </label>
          <RichTextEditor value={content} onChange={setContent} />
        </div>

        {/* Published Toggle */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="published"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="w-5 h-5 rounded border-gray-700 bg-nfl-dark text-nfl-accent focus:ring-nfl-accent focus:ring-offset-0"
          />
          <label htmlFor="published" className="text-sm font-medium">
            Published
          </label>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-nfl-accent hover:bg-nfl-secondary disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors"
            >
              {loading ? 'Saving...' : 'SAVE CHANGES'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 bg-transparent border border-gray-700 hover:border-gray-600 text-gray-400 hover:text-white font-medium rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors"
          >
            DELETE POST
          </button>
        </div>
      </form>
    </div>
  );
}
