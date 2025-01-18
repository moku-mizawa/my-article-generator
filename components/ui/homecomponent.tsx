import Link from 'next/link';

export default function Homecomponent() {
  return (
    <div>
      <h1>Welcome to My Article Generator</h1>
      <nav>
        <ul>
          <li>
            <Link href="/article-generator">Article Generator</Link>
          </li>
          <li>
            <Link href="/sentence-generator">Sentence Generator</Link>
          </li>
          <li>
            <Link href="/sentence-shuffle">Sentence Shuffle</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}