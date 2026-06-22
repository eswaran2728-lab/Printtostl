import Link from 'next/link'
import { Layers } from 'lucide-react'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <Layers className="w-8 h-8 text-gold" />
            <span className="text-white font-bold text-2xl">
              PhotoToSTL <span className="text-gold">Pro</span>
            </span>
          </Link>
          <p className="text-gray-500 text-sm mt-2">Turn images into print-ready 3D sculptures</p>
        </div>
        <div className="card-glass rounded-2xl p-8">
          {children}
        </div>
        <p className="text-center text-gray-600 text-xs mt-8">
          Created by ESWARAN A/L Padmanathan | Eshan Creations | © 2024 PhotoToSTL Pro
        </p>
      </div>
    </div>
  )
}
