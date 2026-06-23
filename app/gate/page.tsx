'use client'
import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Layers, Lock, Eye, EyeOff } from 'lucide-react'

function GateForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const from = searchParams.get('from') || '/'

  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/gate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, from }),
    })
    const data = await res.json()
    setLoading(false)
    if (data.success) {
      router.push(data.redirect)
      router.refresh()
    } else {
      setError('Incorrect password. Try again.')
      setPassword('')
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-gold/10 border border-gold/30 flex items-center justify-center mb-4">
            <Layers className="w-8 h-8 text-gold" />
          </div>
          <h1 className="text-2xl font-bold text-white">PhotoToSTL <span className="text-gold">Pro</span></h1>
          <p className="text-gray-500 text-sm mt-1">Personal workspace</p>
        </div>

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#0d1b2a] border border-white/10 rounded-2xl p-8 space-y-5"
        >
          <div className="flex items-center gap-2 text-gray-400 mb-2">
            <Lock className="w-4 h-4 text-gold" />
            <span className="text-sm">Enter password to continue</span>
          </div>

          <div className="relative">
            <input
              type={show ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              autoFocus
              required
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-gold/60 text-sm pr-12"
            />
            <button
              type="button"
              onClick={() => setShow(s => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
            >
              {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {error && (
            <p className="text-red-400 text-xs text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-gold text-black font-semibold py-3 rounded-xl hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {loading ? 'Checking…' : 'Enter'}
          </button>
        </form>

        <p className="text-center text-gray-600 text-xs mt-6">
          Created by ESWARAN A/L Padmanathan · Eshan Creations
        </p>
      </div>
    </div>
  )
}

export default function GatePage() {
  return (
    <Suspense>
      <GateForm />
    </Suspense>
  )
}
