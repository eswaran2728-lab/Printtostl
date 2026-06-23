'use client'
import Link from 'next/link'
import { Button } from './ui/Button'
import { Layers } from 'lucide-react'

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Layers className="w-7 h-7 text-gold" />
            <span className="text-white font-bold text-lg">PhotoToSTL <span className="text-gold">Pro</span></span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/#features" className="text-gray-400 hover:text-white text-sm transition-colors">Features</Link>
            <Link href="/#how-it-works" className="text-gray-400 hover:text-white text-sm transition-colors">How It Works</Link>
            <Link href="/pricing" className="text-gray-400 hover:text-white text-sm transition-colors">Pricing</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard"><Button size="sm">Start Creating</Button></Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
