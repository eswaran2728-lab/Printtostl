'use client'
import { useState } from 'react'
import { CheckCircle, Zap } from 'lucide-react'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const tiers = [
  {
    name: 'Free',
    monthlyPrice: 0,
    annualPrice: 0,
    desc: 'Perfect for trying out the platform',
    color: 'border-white/10',
    features: [
      '3 generations per month',
      'GLB export only',
      'Basic 3D preview',
      '720p image processing',
      'Community support',
    ],
    missing: ['STL / OBJ export', 'Mesh repair', 'Printability report', 'Commercial use'],
    cta: 'Get Started Free',
    href: '/register',
    highlight: false,
  },
  {
    name: 'Creator',
    monthlyPrice: 29,
    annualPrice: 23,
    desc: 'For hobbyists and makers',
    color: 'border-white/10',
    features: [
      '30 generations per month',
      'STL + GLB export',
      'Printability report',
      'Basic mesh repair',
      '1080p image processing',
      'Email support',
      '5 GB storage',
    ],
    missing: ['OBJ export', 'Bambu presets', 'Batch processing', 'Commercial use'],
    cta: 'Start Creating',
    href: '/register',
    highlight: false,
  },
  {
    name: 'Business',
    monthlyPrice: 99,
    annualPrice: 79,
    desc: 'Most popular for professionals',
    color: 'border-gold',
    features: [
      '150 generations per month',
      'STL + OBJ + GLB export',
      'Advanced mesh repair',
      'Full printability report',
      'Bambu Lab A1 Mini & P1S presets',
      'Batch processing (5 at once)',
      'Priority support',
      '20 GB storage',
      'All optimization flags',
    ],
    missing: ['Deity mode', 'Unlimited generations', 'Commercial license'],
    cta: 'Go Business',
    href: '/register',
    highlight: true,
  },
  {
    name: 'Studio',
    monthlyPrice: 299,
    annualPrice: 239,
    desc: 'For studios and commercial use',
    color: 'border-white/10',
    features: [
      'Unlimited generations',
      'All export formats',
      'Deity mode (specialized)',
      'Advanced batch processing',
      'Full commercial license',
      'Priority queue & processing',
      'Dedicated support',
      '100 GB storage',
      'API access',
      'White-label option',
    ],
    missing: [],
    cta: 'Go Studio',
    href: '/register',
    highlight: false,
  },
]

const faqs = [
  { q: 'Can I switch plans?', a: 'Yes, you can upgrade or downgrade at any time. Changes take effect at the next billing cycle.' },
  { q: 'Do unused credits roll over?', a: 'No, credits reset at the start of each billing cycle.' },
  { q: 'What counts as a generation?', a: 'Each time you click "Generate 3D Model," one credit is used. Failed generations are not charged.' },
  { q: 'Is there a free trial for paid plans?', a: 'Start with the Free tier — no credit card required. Upgrade when you need more generations.' },
]

export default function PricingPage() {
  const [annual, setAnnual] = useState(false)

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <div className="pt-28 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4">Simple, Transparent Pricing</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
              Start free. Scale as you grow. All plans include AI 3D generation and interactive preview.
            </p>

            {/* Billing toggle */}
            <div className="inline-flex items-center gap-3 bg-navy/50 border border-white/10 rounded-full p-1.5">
              <button
                onClick={() => setAnnual(false)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${!annual ? 'bg-gold text-black' : 'text-gray-400 hover:text-white'}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setAnnual(true)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${annual ? 'bg-gold text-black' : 'text-gray-400 hover:text-white'}`}
              >
                Annual
                <span className="ml-2 text-xs bg-green-500/20 text-green-400 border border-green-500/30 px-1.5 py-0.5 rounded-full">Save 20%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-16">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-xl p-6 flex flex-col relative border-2 ${tier.highlight ? 'bg-gold/5 border-gold' : 'card-glass ' + tier.color}`}
              >
                {tier.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-black text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1">
                    <Zap className="w-3 h-3" /> Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-white font-bold text-xl mb-1">{tier.name}</h3>
                  <p className="text-gray-500 text-sm mb-4">{tier.desc}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-white">
                      {tier.monthlyPrice === 0 ? 'Free' : `RM ${annual ? tier.annualPrice : tier.monthlyPrice}`}
                    </span>
                    {tier.monthlyPrice > 0 && (
                      <span className="text-gray-400 text-sm">/mo{annual ? ' billed annually' : ''}</span>
                    )}
                  </div>
                  {annual && tier.monthlyPrice > 0 && (
                    <p className="text-green-400 text-xs mt-1">
                      Save RM {(tier.monthlyPrice - tier.annualPrice) * 12}/year
                    </p>
                  )}
                </div>

                <div className="flex-1">
                  <ul className="space-y-2.5 mb-6">
                    {tier.features.map(f => (
                      <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                    {tier.missing.map(f => (
                      <li key={f} className="flex items-start gap-2 text-sm text-gray-600 line-through">
                        <div className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link href={tier.href}>
                  <button className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${tier.highlight ? 'bg-gold hover:bg-gold-light text-black' : 'border border-gold/40 text-gold hover:bg-gold/10'}`}>
                    {tier.cta}
                  </button>
                </Link>
              </div>
            ))}
          </div>

          {/* FAQs */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-8">Pricing FAQs</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="card-glass rounded-xl p-5">
                  <p className="text-white font-medium mb-2">{faq.q}</p>
                  <p className="text-gray-400 text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
