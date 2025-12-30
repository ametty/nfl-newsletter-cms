export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-nfl-dark border-t border-gray-800 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-display text-nfl-accent mb-3">
              GRIDIRON UNFILTERED
            </h3>
            <p className="text-gray-400 text-sm">
              The realest NFL newsletter on the internet. We don't pull punches,
              we don't sugarcoat, and we sure as hell don't do corporate PR spin.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/" className="hover:text-nfl-secondary transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/newsletter" className="hover:text-nfl-secondary transition-colors">
                  Newsletter Archive
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-3">Disclaimer</h4>
            <p className="text-gray-400 text-sm">
              All opinions are our own. We're not affiliated with the NFL or any
              teams. Contains profanity and hot takes.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>© {currentYear} Gridiron Unfiltered. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
