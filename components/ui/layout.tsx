import Link from 'next/link'
import Header from './header'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <main className="container mx-auto p-4 test">
        {children}
      </main>
    </div>
  )
}