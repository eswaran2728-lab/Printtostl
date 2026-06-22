import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PhotoToSTL Pro – Turn Images into Print-Ready 3D Sculptures',
  description: 'Upload a photo, generate a 3D model, repair print issues, preview it, and export STL-ready files for FDM or resin printing.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
