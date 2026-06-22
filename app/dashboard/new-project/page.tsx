'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { UploadZone } from '@/components/UploadZone'
import { ChevronRight, ChevronLeft, Zap } from 'lucide-react'

const MODEL_TYPES = ['Full body statue', 'Bust', 'Relief', 'Keychain', 'Chibi figure', 'Deity statue', 'Product model', 'Miniature figure']
const PRINT_TYPES = ['FDM', 'Resin', 'Display model', 'Low poly', 'High detail']
const PRINTER_PROFILES = ['Bambu Lab A1 Mini', 'Bambu Lab P1S', 'Generic FDM', 'Resin printer']
const OUTPUT_FORMATS = ['STL', 'OBJ', 'GLB']

const OPTIMIZATION_FLAGS = [
  { key: 'thickenThinParts', label: 'Thicken thin parts' },
  { key: 'thickenWeapons', label: 'Thicken weapons' },
  { key: 'thickenFingers', label: 'Thicken fingers' },
  { key: 'thickenJewelry', label: 'Thicken jewelry' },
  { key: 'connectFloatingParts', label: 'Connect floating parts' },
  { key: 'fillHoles', label: 'Fill holes' },
  { key: 'fixNonManifold', label: 'Fix non-manifold mesh' },
  { key: 'addFlatBase', label: 'Add flat base' },
  { key: 'addSupportWarning', label: 'Add support warning' },
  { key: 'reduceFragileDetails', label: 'Reduce fragile details' },
  { key: 'splitIntoParts', label: 'Split large model into parts' },
  { key: 'hollowModel', label: 'Hollow model' },
  { key: 'addDrainHoles', label: 'Add drain holes for resin' },
  { key: 'smoothSurface', label: 'Smooth surface' },
  { key: 'preserveFacialDetails', label: 'Preserve facial details' },
]

const STEPS = ['Upload Images', 'Settings', 'Optimization', 'Size & Generate']

type OptFlags = Record<string, boolean>

export default function NewProjectPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [projectName, setProjectName] = useState('')
  const [modelType, setModelType] = useState(MODEL_TYPES[0])
  const [outputFormat, setOutputFormat] = useState('STL')
  const [printType, setPrintType] = useState(PRINT_TYPES[0])
  const [printerProfile, setPrinterProfile] = useState(PRINTER_PROFILES[0])
  const [removeBackground, setRemoveBackground] = useState(true)
  const [enhanceImage, setEnhanceImage] = useState(true)
  const [flags, setFlags] = useState<OptFlags>(
    Object.fromEntries(OPTIMIZATION_FLAGS.map(f => [f.key, f.key === 'thickenThinParts' || f.key === 'fillHoles' || f.key === 'fixNonManifold' || f.key === 'addFlatBase']))
  )
  const [height, setHeight] = useState('15')
  const [width, setWidth] = useState('8')
  const [baseDiameter, setBaseDiameter] = useState('5')
  const [minWall, setMinWall] = useState('0.8')
  const [hollow, setHollow] = useState(false)
  const [splitParts, setSplitParts] = useState(false)
  const [generating, setGenerating] = useState(false)

  const toggleFlag = (key: string) => setFlags(prev => ({ ...prev, [key]: !prev[key] }))

  const handleGenerate = async () => {
    setGenerating(true)
    const res = await fetch('/api/generate-3d', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projectName, modelType, outputFormat, printType, printerProfile, flags }),
    })
    const data = await res.json()
    setGenerating(false)
    router.push(`/dashboard/generate/${data.projectId}`)
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-1">New Project</h1>
        <p className="text-gray-400">Create a 3D model from your photos</p>
      </div>

      {/* Stepper */}
      <div className="flex items-center gap-2 mb-10 flex-wrap">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <button
              onClick={() => i < step && setStep(i)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                i === step ? 'bg-gold text-black' :
                i < step ? 'bg-green-500/10 text-green-400 border border-green-500/30' :
                'bg-white/5 text-gray-500'
              }`}
            >
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold
                bg-current/20">{i < step ? '✓' : i + 1}</span>
              {s}
            </button>
            {i < STEPS.length - 1 && <ChevronRight className="w-4 h-4 text-gray-600" />}
          </div>
        ))}
      </div>

      <div className="card-glass rounded-xl p-6">
        {/* Step 0: Upload Images */}
        {step === 0 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Project Name</label>
              <input
                type="text"
                value={projectName}
                onChange={e => setProjectName(e.target.value)}
                placeholder="e.g. Karuppar Statue"
                className="w-full bg-navy/50 border border-white/10 text-white placeholder-gray-600 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-gold/50"
              />
            </div>

            <div className="flex items-center gap-4 mb-4">
              <span className="text-sm font-medium text-gray-300">Mode:</span>
              {['Single Image', 'Multi-Image'].map(m => (
                <button key={m} className="px-3 py-1.5 rounded-full border border-gold/30 text-sm text-gold hover:bg-gold/10 transition-colors">
                  {m}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <UploadZone label="Front View" />
              <UploadZone label="Side View" />
              <UploadZone label="Back View" />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-300 mb-3">Optional Detail Images</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[1, 2, 3, 4].map(n => (
                  <UploadZone key={n} label={`Detail ${n}`} />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <div
                  onClick={() => setRemoveBackground(!removeBackground)}
                  className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${removeBackground ? 'bg-gold' : 'bg-gray-700'}`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${removeBackground ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </div>
                <span className="text-sm text-gray-300">Remove Background</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <div
                  onClick={() => setEnhanceImage(!enhanceImage)}
                  className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${enhanceImage ? 'bg-gold' : 'bg-gray-700'}`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${enhanceImage ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </div>
                <span className="text-sm text-gray-300">Enhance Image</span>
              </label>
            </div>
          </div>
        )}

        {/* Step 1: Settings */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Model Type</label>
              <select
                value={modelType}
                onChange={e => setModelType(e.target.value)}
                className="w-full bg-navy/50 border border-white/10 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-gold/50"
              >
                {MODEL_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Output Format</label>
              <div className="flex gap-3">
                {OUTPUT_FORMATS.map(f => (
                  <button
                    key={f}
                    onClick={() => setOutputFormat(f)}
                    className={`flex-1 py-2.5 rounded-lg border text-sm font-medium transition-all ${outputFormat === f ? 'bg-gold/10 border-gold text-gold' : 'border-white/10 text-gray-400 hover:border-gold/30'}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Print Type</label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {PRINT_TYPES.map(t => (
                  <button
                    key={t}
                    onClick={() => setPrintType(t)}
                    className={`py-2 rounded-lg border text-xs font-medium transition-all ${printType === t ? 'bg-gold/10 border-gold text-gold' : 'border-white/10 text-gray-400 hover:border-gold/30'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Printer Profile</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PRINTER_PROFILES.map(p => (
                  <button
                    key={p}
                    onClick={() => setPrinterProfile(p)}
                    className={`py-3 px-4 rounded-lg border text-sm font-medium text-left transition-all ${printerProfile === p ? 'bg-gold/10 border-gold text-gold' : 'border-white/10 text-gray-400 hover:border-gold/30'}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Optimization */}
        {step === 2 && (
          <div>
            <p className="text-sm text-gray-400 mb-6">Enable optimizations to improve print success rate. Recommended options are pre-selected.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {OPTIMIZATION_FLAGS.map(flag => (
                <label key={flag.key} className="flex items-center justify-between p-3 rounded-lg border border-white/5 hover:border-white/10 cursor-pointer transition-colors">
                  <span className="text-sm text-gray-300">{flag.label}</span>
                  <div
                    onClick={() => toggleFlag(flag.key)}
                    className={`w-10 h-5 rounded-full transition-colors relative flex-shrink-0 ${flags[flag.key] ? 'bg-gold' : 'bg-gray-700'}`}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${flags[flag.key] ? 'translate-x-5' : 'translate-x-0.5'}`} />
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Size & Generate */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { label: 'Height (cm)', value: height, set: setHeight },
                { label: 'Width (cm)', value: width, set: setWidth },
                { label: 'Base Diameter (cm)', value: baseDiameter, set: setBaseDiameter },
                { label: 'Min Wall Thickness (mm)', value: minWall, set: setMinWall },
              ].map(field => (
                <div key={field.label}>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">{field.label}</label>
                  <input
                    type="number"
                    value={field.value}
                    onChange={e => field.set(e.target.value)}
                    step="0.1"
                    className="w-full bg-navy/50 border border-white/10 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-gold/50"
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Fill Type</label>
              <div className="flex gap-3">
                {['Solid', 'Hollow'].map(t => (
                  <button
                    key={t}
                    onClick={() => setHollow(t === 'Hollow')}
                    className={`flex-1 py-2.5 rounded-lg border text-sm font-medium transition-all ${(hollow ? t === 'Hollow' : t === 'Solid') ? 'bg-gold/10 border-gold text-gold' : 'border-white/10 text-gray-400'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
              <div
                onClick={() => setSplitParts(!splitParts)}
                className={`w-10 h-5 rounded-full transition-colors relative ${splitParts ? 'bg-gold' : 'bg-gray-700'}`}
              >
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${splitParts ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </div>
              <span className="text-sm text-gray-300">Split into printable parts</span>
            </label>

            <div className="bg-gold/5 border border-gold/20 rounded-lg p-4 text-sm text-gray-400">
              <p className="text-gold font-medium mb-1">Ready to generate</p>
              <p>Model: <span className="text-white">{modelType}</span> • Format: <span className="text-white">{outputFormat}</span> • Printer: <span className="text-white">{printerProfile}</span></p>
            </div>

            <button
              onClick={handleGenerate}
              disabled={generating}
              className="w-full bg-gold hover:bg-gold-light text-black font-bold py-4 rounded-xl text-base flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {generating ? (
                <><div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" /> Queueing Generation...</>
              ) : (
                <><Zap className="w-5 h-5" /> Generate 3D Model</>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() => setStep(s => s - 1)}
          disabled={step === 0}
          className="inline-flex items-center gap-2 border border-white/10 text-gray-400 hover:text-white hover:border-white/30 px-5 py-2.5 rounded-lg text-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </button>
        {step < STEPS.length - 1 && (
          <button
            onClick={() => setStep(s => s + 1)}
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-black font-semibold px-5 py-2.5 rounded-lg text-sm transition-all"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}
