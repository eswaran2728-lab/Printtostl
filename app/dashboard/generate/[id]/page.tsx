'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { CheckCircle, Circle, Loader, X, Clock, Layers } from 'lucide-react'
import { cn } from '@/lib/utils'
import { mockSteps } from '@/lib/mock-data'

type StepStatus = 'done' | 'processing' | 'pending'
type Step = { id: number; name: string; status: StepStatus }

export default function GeneratePage() {
  const params = useParams()
  const router = useRouter()
  const [steps, setSteps] = useState<Step[]>(mockSteps as Step[])
  const [currentStep, setCurrentStep] = useState(3)

  useEffect(() => {
    const interval = setInterval(() => {
      setSteps(prev => {
        const next = [...prev]
        const procIdx = next.findIndex(s => s.status === 'processing')
        if (procIdx === -1 || procIdx === next.length - 1) {
          clearInterval(interval)
          if (procIdx === next.length - 1) {
            next[procIdx].status = 'done'
            setTimeout(() => router.push(`/dashboard/preview/${params.id}`), 1000)
          }
          return next
        }
        next[procIdx].status = 'done'
        next[procIdx + 1].status = 'processing'
        setCurrentStep(procIdx + 2)
        return next
      })
    }, 2000)
    return () => clearInterval(interval)
  }, [params.id, router])

  const doneCount = steps.filter(s => s.status === 'done').length
  const progress = Math.round((doneCount / steps.length) * 100)

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Generating Model</h1>
          <p className="text-gray-400">Project ID: {params.id}</p>
        </div>
        <button
          onClick={() => router.push('/dashboard')}
          className="inline-flex items-center gap-2 border border-red-500/30 text-red-400 hover:bg-red-500/10 px-4 py-2 rounded-lg text-sm transition-all"
        >
          <X className="w-4 h-4" /> Cancel
        </button>
      </div>

      {/* Project info */}
      <div className="card-glass rounded-xl p-5 mb-6 flex items-center gap-4">
        <div className="w-14 h-14 bg-gradient-to-br from-gold/30 to-navy rounded-xl flex items-center justify-center flex-shrink-0">
          <Layers className="w-7 h-7 text-gold" />
        </div>
        <div className="flex-1">
          <p className="text-white font-medium">New 3D Model</p>
          <p className="text-gray-400 text-sm">Deity statue • STL • Bambu Lab A1 Mini</p>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="flex items-center gap-1 text-gray-400 text-sm">
            <Clock className="w-3.5 h-3.5" />
            <span>~{Math.max(0, (steps.length - doneCount) * 2)}s remaining</span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="card-glass rounded-xl p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-white">Overall Progress</span>
          <span className="text-sm font-bold text-gold">{progress}%</span>
        </div>
        <div className="h-2 bg-navy rounded-full overflow-hidden">
          <div
            className="h-full bg-gold rounded-full transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">Step {currentStep} of {steps.length}</p>
      </div>

      {/* Steps timeline */}
      <div className="card-glass rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-5">Processing Pipeline</h2>
        <div className="space-y-4">
          {steps.map((step) => (
            <div key={step.id} className="flex items-center gap-4">
              <div className="flex-shrink-0">
                {step.status === 'done' && <CheckCircle className="w-5 h-5 text-green-400" />}
                {step.status === 'processing' && <Loader className="w-5 h-5 text-gold animate-spin" />}
                {step.status === 'pending' && <Circle className="w-5 h-5 text-gray-700" />}
              </div>
              <div className="flex-1">
                <p className={cn(
                  'text-sm font-medium',
                  step.status === 'done' && 'text-green-400',
                  step.status === 'processing' && 'text-gold',
                  step.status === 'pending' && 'text-gray-600',
                )}>
                  {step.name}
                </p>
                {step.status === 'processing' && (
                  <p className="text-xs text-gray-500 mt-0.5">In progress...</p>
                )}
              </div>
              <div className="flex-shrink-0">
                {step.status === 'done' && <span className="text-xs text-green-400/60">Done</span>}
                {step.status === 'processing' && <span className="text-xs text-gold/60 animate-pulse">Processing</span>}
                {step.status === 'pending' && <span className="text-xs text-gray-700">Pending</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-gray-600 mt-6 text-center">
        AI-generated models may need manual review. Printability repair reduces errors but cannot guarantee every printer result.
      </p>
    </div>
  )
}
