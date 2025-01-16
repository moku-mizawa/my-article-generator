import Link from 'next/link'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header className="bg-gray-800 text-white p-4">
        <nav className="container mx-auto flex justify-between">
          <Link href="/apps/article-generator" legacyBehavior>
            <a className="text-lg font-semibold">Article Generator</a>
          </Link>
          <Link href="/apps/sentence-generator" legacyBehavior>
            <a className="text-lg font-semibold">Sentence Generator</a>
          </Link>
        </nav>
      </header>
      <main className="container mx-auto p-4">
        {children}
      </main>
    </div>
  )
}