import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function Homecomponent() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Welcome to My English Applications</h1>
      <nav className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Article Generator</CardTitle>
          </CardHeader>
          <CardContent>
            <Link href="/article-generator" className="text-blue-500 hover:underline">
              Go to Article Generator
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Sentence Generator</CardTitle>
          </CardHeader>
          <CardContent>
            <Link href="/sentence-generator" className="text-blue-500 hover:underline">
              Go to Sentence Generator
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Sentence Shuffle</CardTitle>
          </CardHeader>
          <CardContent>
            <Link href="/sentence-shuffle" className="text-blue-500 hover:underline">
              Go to Sentence Shuffle
            </Link>
          </CardContent>
        </Card>
      </nav>
    </div>
  );
}