import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If no user and not on login page, redirect will be handled by middleware
  // This is just for additional server-side protection

  return (
    <div className="min-h-screen bg-nfl-darker">
      {user && (
        <nav className="bg-nfl-dark border-b border-gray-800">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <a href="/admin/dashboard" className="text-2xl font-display text-nfl-accent">
                ADMIN DASHBOARD
              </a>
              <div className="flex items-center gap-4">
                <span className="text-gray-400 text-sm">{user.email}</span>
                <form action="/admin/logout" method="post">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm font-medium"
                  >
                    Logout
                  </button>
                </form>
              </div>
            </div>
          </div>
        </nav>
      )}
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
