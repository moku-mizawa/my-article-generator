import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <h1>Welcome to My Article Generator</h1>
      <nav>
        <ul>
          <li>
            <Link href="/apps/article-generator">
              <a>Article Generator</a>
            </Link>
          </li>
          <li>
            <Link href="/apps/sentence-generator">
              <a>Sentence Generator</a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}