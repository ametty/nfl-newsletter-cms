'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/admin/dashboard');
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-nfl-dark border border-gray-800 rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-display text-nfl-accent mb-2">
          ADMIN LOGIN
        </h1>
        <p className="text-gray-400 mb-6">
          Enter your credentials to access the dashboard.
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-nfl-darker border border-gray-700 rounded-lg focus:outline-none focus:border-nfl-accent text-white"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-nfl-darker border border-gray-700 rounded-lg focus:outline-none focus:border-nfl-accent text-white"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-nfl-accent hover:bg-nfl-secondary disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors"
          >
            {loading ? 'Logging in...' : 'LOGIN'}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-800">
          <a
            href="/"
            className="text-sm text-gray-400 hover:text-nfl-secondary transition-colors"
          >
            ← Back to site
          </a>
        </div>
      </div>
    </div>
  );
}
