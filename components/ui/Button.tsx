import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gold' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({ className, variant = 'gold', size = 'md', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
        variant === 'gold' && 'bg-gold text-black hover:bg-gold-light active:scale-95',
        variant === 'outline' && 'border border-gold text-gold hover:bg-gold/10',
        variant === 'ghost' && 'text-gray-400 hover:text-white hover:bg-white/5',
        variant === 'danger' && 'bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20',
        size === 'sm' && 'px-3 py-1.5 text-sm',
        size === 'md' && 'px-5 py-2.5 text-sm',
        size === 'lg' && 'px-8 py-4 text-base',
        className
      )}
      {...props}
    />
  )
}
