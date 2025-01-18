import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between">
        <Link href="/" legacyBehavior>
          <a className="text-lg font-semibold">Home</a>
        </Link>
        <Link href="/article-generator" legacyBehavior>
          <a className="text-lg font-semibold">Article Generator</a>
        </Link>
        <Link href="/sentence-generator" legacyBehavior>
          <a className="text-lg font-semibold">Sentence Generator</a>
        </Link>
        <Link href="/sentence-shuffle" legacyBehavior>
          <a className="text-lg font-semibold">Sentence Shuffle</a>
        </Link>
      </nav>
    </header>
  );
}