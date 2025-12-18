import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* About Section */}
          <div>
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-zinc-900 dark:text-zinc-50">
              <span className="text-2xl">🧀</span>
              Curd Your Enthusiasm
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Honest, fun restaurant reviews from around Madison, WI. 
              One new review every week.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-50">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-zinc-600 transition-colors hover:text-curd-600 dark:text-zinc-400 dark:hover:text-curd-400"
                >
                  All Reviews
                </Link>
              </li>
              <li>
                <Link
                  href="/top-100"
                  className="text-sm text-zinc-600 transition-colors hover:text-curd-600 dark:text-zinc-400 dark:hover:text-curd-400"
                >
                  Top 100
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-zinc-600 transition-colors hover:text-curd-600 dark:text-zinc-400 dark:hover:text-curd-400"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/neighborhoods/downtown"
                  className="text-sm text-zinc-600 transition-colors hover:text-curd-600 dark:text-zinc-400 dark:hover:text-curd-400"
                >
                  Browse by Neighborhood
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-50">
              Get in Touch
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:hello@curdyourenthusiasm.com"
                  className="text-sm text-zinc-600 transition-colors hover:text-curd-600 dark:text-zinc-400 dark:hover:text-curd-400"
                >
                  hello@curdyourenthusiasm.com
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/knudcb28/CurdYourEnthusiasm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-600 transition-colors hover:text-curd-600 dark:text-zinc-400 dark:hover:text-curd-400"
                >
                  GitHub
                </a>
              </li>
            </ul>
            <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-500">
              Have a restaurant suggestion?<br />
              Drop me a line!
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-zinc-200 pt-8 text-center dark:border-zinc-800">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            © {new Date().getFullYear()} Curd Your Enthusiasm. All rights reserved.
          </p>
          <p className="mt-2 text-xs text-zinc-500">
            🧀 Built with cheese curds in Madison, WI
          </p>
        </div>
      </div>
    </footer>
  );
}

