'use client'
import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { UploadZone } from '@/components/UploadZone'
import {
  Tablet, Download, Upload, Wand2, ArrowRight, CheckCircle, Loader,
} from 'lucide-react'

const workflow = [
  { step: 1, title: 'Generate with Auto-Sculpt', desc: 'AI creates the model and automatically applies sculpting refinement — no manual sculpting needed.' },
  { step: 2, title: 'Send to Nomad Sculpt', desc: 'Download the Nomad-optimized GLB and open it on your iPad for optional touch-ups.' },
  { step: 3, title: 'Import back for printing', desc: 'Upload your Nomad sculpt here — we repair the mesh and export a print-ready STL.' },
]

export default function NomadPage() {
  const [sculpting, setSculpting] = useState(false)
  const [sculptDone, setSculptDone] = useState(false)
  const [sculptSteps, setSculptSteps] = useState<string[]>([])
  const [exporting, setExporting] = useState(false)
  const [exportInfo, setExportInfo] = useState<any>(null)
  const [importing, setImporting] = useState(false)
  const [importDone, setImportDone] = useState(false)

  async function runAutoSculpt() {
    setSculpting(true)
    setSculptDone(false)
    const res = await fetch('/api/auto-sculpt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projectId: 'demo', sculptStyle: 'realistic', intensity: 'medium' }),
    })
    const data = await res.json()
    setSculptSteps(data.stepsApplied || [])
    setSculpting(false)
    setSculptDone(true)
  }

  async function exportNomad() {
    setExporting(true)
    const res = await fetch('/api/export-nomad', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projectId: 'demo' }),
    })
    const data = await res.json()
    setExportInfo(data)
    setExporting(false)
  }

  async function importNomad() {
    setImporting(true)
    await fetch('/api/import-nomad', { method: 'POST' })
    setImporting(false)
    setImportDone(true)
  }

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Tablet className="w-7 h-7 text-gold" />
          <h1 className="text-2xl font-bold text-white">Nomad Sculpt Workflow</h1>
          <Badge label="File-based bridge" variant="gold" />
        </div>
        <p className="text-gray-400 text-sm max-w-2xl">
          Nomad Sculpt has no public API, so we integrate through files: automatic sculpting happens
          here in the AI pipeline, and Nomad-ready GLB files move between the app and your iPad.
        </p>
      </div>

      {/* Workflow overview */}
      <div className="grid md:grid-cols-3 gap-4">
        {workflow.map((w, i) => (
          <Card key={w.step} className="relative">
            <div className="w-8 h-8 rounded-full bg-gold/15 border border-gold/30 text-gold text-sm font-bold flex items-center justify-center mb-3">
              {w.step}
            </div>
            <h3 className="text-white font-semibold text-sm mb-1">{w.title}</h3>
            <p className="text-gray-400 text-xs leading-relaxed">{w.desc}</p>
            {i < workflow.length - 1 && (
              <ArrowRight className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/40 z-10" />
            )}
          </Card>
        ))}
      </div>

      {/* Step 1: Auto-Sculpt */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Wand2 className="w-5 h-5 text-gold" />
          <h2 className="text-white font-semibold">Automatic Sculpting</h2>
        </div>
        <p className="text-gray-400 text-sm mb-4">
          Runs AI-guided sculpt passes on your generated model: remesh, symmetry, smoothing,
          facial detail preservation, and surface polish. Closest possible 3D result — the model
          may still benefit from a quick manual review.
        </p>
        <Button onClick={runAutoSculpt} disabled={sculpting}>
          {sculpting ? <Loader className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
          {sculpting ? 'Sculpting…' : 'Run Auto-Sculpt (Demo)'}
        </Button>
        {sculptDone && (
          <div className="mt-4 space-y-1.5">
            {sculptSteps.map(s => (
              <div key={s} className="flex items-center gap-2 text-sm text-green-400">
                <CheckCircle className="w-4 h-4 flex-shrink-0" /> {s}
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Step 2: Export to Nomad */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Download className="w-5 h-5 text-gold" />
          <h2 className="text-white font-semibold">Send to Nomad Sculpt</h2>
        </div>
        <p className="text-gray-400 text-sm mb-4">
          Exports a Nomad-optimized GLB: decimated for smooth iPad sculpting, vertex colors preserved.
        </p>
        <Button onClick={exportNomad} disabled={exporting} variant="outline">
          {exporting ? <Loader className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
          {exporting ? 'Preparing…' : 'Export Nomad GLB (Demo)'}
        </Button>
        {exportInfo && (
          <div className="mt-4 bg-black/30 rounded-lg p-4 text-sm">
            <div className="flex gap-4 text-gray-300 mb-3">
              <span>File: <span className="text-gold">{exportInfo.fileSize}</span></span>
              <span>Polys: <span className="text-gold">{exportInfo.polyCount}</span></span>
            </div>
            <ol className="space-y-1 text-gray-400 text-xs list-decimal list-inside">
              {exportInfo.instructions?.map((ins: string) => <li key={ins}>{ins}</li>)}
            </ol>
          </div>
        )}
      </Card>

      {/* Step 3: Import from Nomad */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Upload className="w-5 h-5 text-gold" />
          <h2 className="text-white font-semibold">Import Nomad Sculpt for Printing</h2>
        </div>
        <p className="text-gray-400 text-sm mb-4">
          Upload the GLB/OBJ/STL you exported from Nomad Sculpt. We run mesh repair and
          printability checks, then give you a print-ready STL.
        </p>
        <UploadZone label="Drop your Nomad Sculpt export here" className="mb-4" />
        <Button onClick={importNomad} disabled={importing}>
          {importing ? <Loader className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
          {importing ? 'Importing…' : 'Import & Repair (Demo)'}
        </Button>
        {importDone && (
          <div className="mt-4 flex items-center gap-2 text-sm text-green-400">
            <CheckCircle className="w-4 h-4" />
            Sculpt imported — repair queued. Check My Projects for the printability report.
          </div>
        )}
      </Card>
    </div>
  )
}
