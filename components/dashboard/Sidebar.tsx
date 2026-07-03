'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Plus, FolderOpen, Eye, Tablet, CreditCard, Settings, LogOut, Layers } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/new-project', label: 'New Project', icon: Plus },
  { href: '/dashboard/projects', label: 'My Projects', icon: FolderOpen },
  { href: '/dashboard/preview/demo', label: '3D Preview', icon: Eye },
  { href: '/dashboard/nomad', label: 'Nomad Sculpt', icon: Tablet },
  { href: '/pricing', label: 'Pricing', icon: CreditCard },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  return (
    <aside className="w-64 min-h-screen bg-navy border-r border-white/5 flex flex-col">
      <div className="p-6 border-b border-white/5">
        <Link href="/" className="flex items-center gap-2">
          <Layers className="w-6 h-6 text-gold" />
          <span className="font-bold text-white text-sm">PhotoToSTL <span className="text-gold">Pro</span></span>
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors',
            pathname === href ? 'bg-gold/10 text-gold border border-gold/20' : 'text-gray-400 hover:text-white hover:bg-white/5'
          )}>
            <Icon className="w-4 h-4" />
            {label}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold text-sm font-bold">D</div>
          <div>
            <p className="text-white text-xs font-medium">Demo User</p>
            <p className="text-gray-500 text-xs">Creator Plan</p>
          </div>
        </div>
        <button className="flex items-center gap-2 text-gray-400 hover:text-white text-xs transition-colors">
          <LogOut className="w-3 h-3" />
          Sign out
        </button>
      </div>
    </aside>
  )
}
