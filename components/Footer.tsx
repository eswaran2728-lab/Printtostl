import { Layers } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 bg-navy/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Layers className="w-6 h-6 text-gold" />
            <span className="font-bold text-white">PhotoToSTL <span className="text-gold">Pro</span></span>
          </div>
          <div className="flex gap-6 text-sm text-gray-400">
            <Link href="/pricing" className="hover:text-white">Pricing</Link>
            <Link href="/#faq" className="hover:text-white">FAQ</Link>
            <Link href="/login" className="hover:text-white">Login</Link>
          </div>
          <p className="text-sm text-gray-500">Created by ESWARAN A/L Padmanathan | Eshan Creations | © 2024 PhotoToSTL Pro</p>
        </div>
      </div>
    </footer>
  )
}
