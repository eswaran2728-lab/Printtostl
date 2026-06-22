'use client'
import { Suspense } from 'react'
import { Download, CheckCircle, AlertTriangle, Printer, Ruler, Clock, Package } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import dynamic from 'next/dynamic'

const ThreeViewer = dynamic(() => import('@/components/ThreeViewer').then(m => ({ default: m.ThreeViewer })), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-navy/50 rounded-xl">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin mx-auto mb-3" />
        <p className="text-gray-400 text-sm">Loading 3D viewer...</p>
      </div>
    </div>
  )
})

const printabilityChecks = [
  { label: 'Manifold', status: 'ok', note: 'Clean' },
  { label: 'Wall Thickness', status: 'warn', note: 'Some thin walls' },
  { label: 'Floating Parts', status: 'ok', note: 'None detected' },
  { label: 'Supports Needed', status: 'warn', note: 'Yes, recommended' },
  { label: 'Fragile Parts', status: 'warn', note: '2 detected' },
  { label: 'File Size', status: 'ok', note: '12.4 MB' },
]

export default function PreviewPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">3D Preview</h1>
          <p className="text-gray-400 mt-1">Karuppar Statue</p>
        </div>
        <div className="flex gap-3">
          <button className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-black font-bold px-4 py-2.5 rounded-lg text-sm transition-all">
            <Download className="w-4 h-4" /> STL
          </button>
          <button className="inline-flex items-center gap-2 border border-gold/40 text-gold hover:bg-gold/10 px-4 py-2.5 rounded-lg text-sm transition-all">
            <Download className="w-4 h-4" /> OBJ
          </button>
          <button className="inline-flex items-center gap-2 border border-gold/40 text-gold hover:bg-gold/10 px-4 py-2.5 rounded-lg text-sm transition-all">
            <Download className="w-4 h-4" /> GLB
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* 3D Viewer */}
        <div className="xl:col-span-2">
          <div className="card-glass rounded-xl overflow-hidden" style={{ height: '500px' }}>
            <ThreeViewer />
          </div>
        </div>

        {/* Stats & Report */}
        <div className="space-y-5">
          {/* Model Stats */}
          <div className="card-glass rounded-xl p-5">
            <h2 className="text-sm font-semibold text-white mb-4">Model Information</h2>
            <div className="space-y-3">
              {[
                { icon: Ruler, label: 'Dimensions', value: '12cm × 8cm × 15cm' },
                { icon: Package, label: 'Filament', value: '47g estimated' },
                { icon: Clock, label: 'Print Time', value: '6h 23m estimated' },
                { icon: Download, label: 'File Size', value: '12.4 MB' },
                { icon: Printer, label: 'Recommended', value: 'Bambu Lab A1 Mini' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3">
                  <item.icon className="w-4 h-4 text-gold flex-shrink-0" />
                  <div className="flex-1 flex items-center justify-between">
                    <span className="text-gray-400 text-sm">{item.label}</span>
                    <span className="text-white text-sm font-medium">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Printability Score */}
          <div className="card-glass rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-white">Printability Score</h2>
              <span className="text-2xl font-black text-yellow-400">87/100</span>
            </div>
            <div className="h-2 bg-navy rounded-full overflow-hidden mb-4">
              <div className="h-full bg-yellow-400 rounded-full" style={{ width: '87%' }} />
            </div>

            <div className="space-y-2">
              {printabilityChecks.map(check => (
                <div key={check.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {check.status === 'ok' ? (
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                    )}
                    <span className="text-gray-400 text-xs">{check.label}</span>
                  </div>
                  <span className={`text-xs font-medium ${check.status === 'ok' ? 'text-green-400' : 'text-yellow-400'}`}>
                    {check.note}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Warning Badges */}
          <div className="card-glass rounded-xl p-5">
            <h2 className="text-sm font-semibold text-white mb-3">Print Warnings</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge label="Thin part detected" variant="yellow" />
              <Badge label="Needs supports" variant="gold" />
              <Badge label="Ready to print" variant="green" />
            </div>

            <div className="space-y-2 text-xs text-gray-500">
              <p><span className="text-white font-medium">Nozzle:</span> 0.4mm recommended</p>
              <p><span className="text-white font-medium">Layer height:</span> 0.2mm</p>
              <p><span className="text-white font-medium">Supports:</span> Tree supports recommended</p>
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-600 mt-6 text-center">
        Placeholder model shown — connect AI backend for actual generated model. Printability repair reduces errors but cannot guarantee every printer result.
      </p>
    </div>
  )
}
