import { CheckCircle, Circle, Loader } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Step { id: number; name: string; status: 'done' | 'processing' | 'pending' }

export function ProgressTimeline({ steps }: { steps: Step[] }) {
  return (
    <div className="space-y-3">
      {steps.map((step) => (
        <div key={step.id} className="flex items-center gap-3">
          <div className="flex-shrink-0">
            {step.status === 'done' && <CheckCircle className="w-5 h-5 text-green-400" />}
            {step.status === 'processing' && <Loader className="w-5 h-5 text-gold animate-spin" />}
            {step.status === 'pending' && <Circle className="w-5 h-5 text-gray-600" />}
          </div>
          <div>
            <p className={cn(
              'text-sm',
              step.status === 'done' && 'text-green-400',
              step.status === 'processing' && 'text-gold font-medium',
              step.status === 'pending' && 'text-gray-500',
            )}>
              {step.id}. {step.name}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
