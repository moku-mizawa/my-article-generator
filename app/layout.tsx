import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <div>
          <header className="bg-gray-800 text-white p-4">
            <nav className="container mx-auto flex justify-between">
              <Link href="/article-generator" legacyBehavior>
                <a className="text-lg font-semibold">Article Generator</a>
              </Link>
              <Link href="/sentence-generator" legacyBehavior>
                <a className="text-lg font-semibold">Sentence Generator</a>
              </Link>
            </nav>
          </header>
          <main className="container mx-auto p-4">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}