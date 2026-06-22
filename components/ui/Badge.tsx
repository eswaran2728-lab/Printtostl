import { cn } from '@/lib/utils'

interface BadgeProps { label: string; variant?: 'gold' | 'green' | 'yellow' | 'red' | 'blue' | 'gray'; className?: string }

export function Badge({ label, variant = 'gray', className }: BadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
      variant === 'gold' && 'bg-gold/20 text-gold border border-gold/30',
      variant === 'green' && 'bg-green-500/10 text-green-400 border border-green-500/30',
      variant === 'yellow' && 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30',
      variant === 'red' && 'bg-red-500/10 text-red-400 border border-red-500/30',
      variant === 'blue' && 'bg-blue-500/10 text-blue-400 border border-blue-500/30',
      variant === 'gray' && 'bg-gray-500/10 text-gray-400 border border-gray-500/30',
      className
    )}>
      {label}
    </span>
  )
}
