import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-nfl-dark border-b border-gray-800 sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="group">
            <h1 className="text-3xl md:text-4xl font-display tracking-tight">
              <span className="text-nfl-accent group-hover:text-nfl-secondary transition-colors">
                GRIDIRON
              </span>{' '}
              <span className="text-white">UNFILTERED</span>
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Raw NFL takes. Zero corporate BS.
            </p>
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              href="/newsletter"
              className="text-gray-300 hover:text-nfl-accent transition-colors font-medium"
            >
              Archive
            </Link>
            <Link
              href="/admin/dashboard"
              className="text-gray-500 hover:text-gray-300 transition-colors text-sm"
            >
              Admin
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
