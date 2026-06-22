'use client'
import Link from 'next/link'
import { useState } from 'react'
import {
  Layers, Upload, Cpu, Wrench, Eye, Download,
  CheckCircle, Star, Zap, Shield, Box, FileDown,
  ChevronDown, ChevronUp, ArrowRight, Sparkles,
  Package, Users, Globe, Trophy
} from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const features = [
  { icon: Sparkles, title: 'AI 3D Generation', desc: 'Transform 2D photos into detailed 3D meshes using state-of-the-art AI models like Meshy, Tripo, and Hunyuan3D.' },
  { icon: Wrench, title: 'Auto Mesh Repair', desc: 'Automatically fix non-manifold geometry, fill holes, thicken walls, and connect floating parts for print-ready models.' },
  { icon: Shield, title: 'Printability Report', desc: 'Get a detailed printability score with warnings for thin parts, needed supports, fragile areas, and filament estimates.' },
  { icon: FileDown, title: 'Multi-format Export', desc: 'Export your models as STL, OBJ, or GLB. Download instantly and open in any slicer software.' },
  { icon: Eye, title: '3D Preview', desc: 'Inspect your model from every angle before downloading. Drag to rotate, scroll to zoom, right-click to pan.' },
  { icon: Box, title: 'FDM Optimization', desc: 'Optimize for specific printers like Bambu Lab A1 Mini and P1S. Set layer height, nozzle size, and infill presets.' },
]

const steps = [
  { icon: Upload, title: 'Upload Images', desc: 'Upload front, side, and back photos of your subject for best accuracy.' },
  { icon: Layers, title: 'Choose Settings', desc: 'Select sculpture type, print settings, and optimization options.' },
  { icon: Cpu, title: 'AI Generates Model', desc: 'Our AI pipeline converts your images into a detailed 3D mesh.' },
  { icon: Wrench, title: 'Auto-Repair Mesh', desc: 'Automatic mesh repair ensures your model is print-ready.' },
  { icon: Eye, title: 'Preview in 3D', desc: 'Inspect and verify your model with the interactive 3D viewer.' },
  { icon: Download, title: 'Download & Print', desc: 'Export STL, OBJ, or GLB and start printing immediately.' },
]

const useCases = [
  { title: 'Custom Figurines & Statues', desc: 'Turn photos of people into detailed figurines and commemorative statues.', emoji: '🗿' },
  { title: 'Deity & Religious Sculptures', desc: 'Create reverent deity statues and religious sculptures from reference images.', emoji: '🕌' },
  { title: 'Miniature Figures', desc: 'Perfect for tabletop gaming miniatures and dungeon-crawling heroes.', emoji: '⚔️' },
  { title: 'Custom Keychains & Gifts', desc: 'Personalized 3D-printed gifts from photos — unique and memorable.', emoji: '🎁' },
  { title: 'Product Prototypes', desc: 'Quickly prototype product concepts from reference images and sketches.', emoji: '📦' },
  { title: 'Architectural Models', desc: 'Generate scale architectural models from building photos and floor plans.', emoji: '🏛️' },
]

const pricingTiers = [
  {
    name: 'Free',
    price: 'RM 0',
    period: '/month',
    desc: 'Try it out',
    features: ['3 generations / month', 'GLB export only', 'Basic 3D preview', 'Community support'],
    cta: 'Get Started Free',
    highlight: false,
  },
  {
    name: 'Creator',
    price: 'RM 29',
    period: '/month',
    desc: 'For hobbyists',
    features: ['30 generations / month', 'STL + GLB export', 'Printability report', 'Basic mesh repair', 'Email support'],
    cta: 'Start Creating',
    highlight: false,
  },
  {
    name: 'Business',
    price: 'RM 99',
    period: '/month',
    desc: 'Most popular',
    features: ['150 generations / month', 'STL + OBJ + GLB export', 'Advanced mesh repair', 'Bambu Lab presets', 'Priority support', 'Batch processing'],
    cta: 'Go Business',
    highlight: true,
  },
  {
    name: 'Studio',
    price: 'RM 299',
    period: '/month',
    desc: 'For professionals',
    features: ['Unlimited generations', 'All formats', 'Deity mode', 'Priority processing', 'Commercial license', 'Dedicated support', 'API access'],
    cta: 'Go Studio',
    highlight: false,
  },
]

const faqs = [
  { q: 'What image formats are supported?', a: 'We support JPG, PNG, and WEBP images. For best results, provide front, side, and back photos with good lighting and a plain background.' },
  { q: 'How accurate are the 3D models?', a: 'Accuracy depends on image quality and subject complexity. Using 3 angles (front, side, back) significantly improves results. AI-generated models may need minor manual adjustments for complex subjects.' },
  { q: 'What 3D printers are supported?', a: 'Models are optimized for FDM and resin printers. We have specific presets for Bambu Lab A1 Mini and P1S, plus generic FDM and resin profiles.' },
  { q: 'Can I use the models commercially?', a: 'Studio plan includes a commercial license. Creator and Business plans are for personal and small business use. Check our terms of service for full details.' },
  { q: 'What happens if my model fails to generate?', a: 'Failed generations do not count against your monthly limit. You can retry with different settings or contact our support team for assistance.' },
  { q: 'How long does generation take?', a: 'Most models generate in 2–5 minutes. Complex high-detail models may take up to 10 minutes. Studio plan users get priority queue access.' },
]

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy/30 to-transparent pointer-events-none" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-1.5 text-sm text-gold mb-8">
              <Sparkles className="w-3.5 h-3.5" />
              AI-Powered • Mesh Repair • Print-Ready
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
              Turn Any Image Into a{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">
                3D Printable
              </span>{' '}
              Sculpture
            </h1>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Upload a photo, generate a 3D model, repair print issues, preview it, and export STL-ready files for FDM or resin printing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link href="/dashboard/new-project">
                <button className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-black font-bold px-8 py-4 rounded-xl text-base transition-all duration-200 active:scale-95">
                  Start Creating <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="/dashboard/preview/demo">
                <button className="inline-flex items-center gap-2 border border-gold/40 text-gold hover:bg-gold/10 font-semibold px-8 py-4 rounded-xl text-base transition-all duration-200">
                  View Demo <Eye className="w-4 h-4" />
                </button>
              </Link>
            </div>

            {/* Upload zone preview */}
            <div className="max-w-2xl mx-auto card-glass rounded-2xl p-8 relative">
              <div className="upload-zone rounded-xl p-10 text-center">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-gold">
                  <Upload className="w-7 h-7 text-gold" />
                </div>
                <p className="text-white font-semibold text-lg mb-1">Drop your photo here</p>
                <p className="text-gray-500 text-sm">JPG, PNG, WEBP supported • Front, Side, Back for best results</p>
                <div className="mt-4 flex justify-center gap-2">
                  {['Front View', 'Side View', 'Back View'].map(v => (
                    <span key={v} className="text-xs bg-gold/10 border border-gold/20 text-gold/70 px-2 py-1 rounded">{v}</span>
                  ))}
                </div>
              </div>
              <div className="absolute -top-3 -right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                ✓ Print-Ready
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
            {[
              { label: 'Models Generated', value: '3,891+' },
              { label: 'Happy Creators', value: '1,247+' },
              { label: 'Avg Printability Score', value: '87/100' },
              { label: 'Print Success Rate', value: '94%' },
            ].map(stat => (
              <div key={stat.label} className="card-glass rounded-xl p-5 text-center">
                <p className="text-2xl font-bold text-gold">{stat.value}</p>
                <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">From photo to print-ready file in minutes. Our AI pipeline handles everything.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="card-glass rounded-xl p-6 relative group hover:border-gold/40 transition-colors">
                <div className="absolute top-4 right-4 text-5xl font-black text-white/5 group-hover:text-gold/10 transition-colors">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center mb-4">
                  <step.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-4 bg-navy/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Everything You Need</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Professional-grade tools for creating high-quality 3D-printable models from photos.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, i) => (
              <div key={i} className="card-glass rounded-xl p-6 hover:border-gold/40 transition-all group cursor-default">
                <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                  <feat.icon className="w-5 h-5 text-gold" />
                </div>
                <h3 className="text-white font-semibold mb-2">{feat.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">What Will You Create?</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">From personal keepsakes to professional prototypes — the possibilities are endless.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((uc, i) => (
              <div key={i} className="card-glass rounded-xl p-6 hover:border-gold/40 transition-all group">
                <div className="text-4xl mb-4">{uc.emoji}</div>
                <h3 className="text-white font-semibold mb-2">{uc.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{uc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-4 bg-navy/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Start free, scale as you grow. All plans include our AI pipeline and 3D preview.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingTiers.map((tier, i) => (
              <div key={i} className={`rounded-xl p-6 relative flex flex-col ${tier.highlight ? 'bg-gold/10 border-2 border-gold' : 'card-glass'}`}>
                {tier.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-black text-xs font-bold px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <p className="text-gray-400 text-sm mb-1">{tier.desc}</p>
                  <h3 className="text-white font-bold text-xl mb-2">{tier.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-white">{tier.price}</span>
                    <span className="text-gray-400 text-sm">{tier.period}</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={i === 0 ? '/register' : '/dashboard/new-project'}>
                  <button className={`w-full py-2.5 rounded-lg font-semibold text-sm transition-all ${tier.highlight ? 'bg-gold text-black hover:bg-gold-light' : 'border border-gold/40 text-gold hover:bg-gold/10'}`}>
                    {tier.cta}
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-400 text-lg">Everything you need to know about PhotoToSTL Pro.</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="card-glass rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="text-white font-medium">{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUp className="w-5 h-5 text-gold flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center card-glass rounded-2xl p-12">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Start Creating?</h2>
          <p className="text-gray-400 text-lg mb-8">Join 1,247+ creators turning their photos into stunning 3D sculptures.</p>
          <Link href="/dashboard/new-project">
            <button className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-black font-bold px-10 py-4 rounded-xl text-base transition-all duration-200 active:scale-95">
              Start for Free <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
          <p className="text-gray-500 text-sm mt-4">No credit card required • 3 free generations included</p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
