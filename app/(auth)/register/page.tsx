'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Mail, Lock, User, UserPlus } from 'lucide-react'
import { mockAuth } from '@/lib/supabase'

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [terms, setTerms] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirm) { setError('Passwords do not match'); return }
    if (!terms) { setError('Please accept the terms'); return }
    setLoading(true)
    setError('')
    const { error: authError } = await mockAuth.signUp(email, password, name)
    setLoading(false)
    if (authError) setError(authError)
    else router.push('/dashboard')
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-white mb-2">Create your account</h1>
      <p className="text-gray-400 text-sm mb-8">Start creating 3D models from photos today</p>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Full name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your full name"
              required
              className="w-full bg-navy/50 border border-white/10 text-white placeholder-gray-600 rounded-lg px-4 py-2.5 pl-10 text-sm focus:outline-none focus:border-gold/50 transition-colors"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Email address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full bg-navy/50 border border-white/10 text-white placeholder-gray-600 rounded-lg px-4 py-2.5 pl-10 text-sm focus:outline-none focus:border-gold/50 transition-colors"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Choose a strong password"
              required
              minLength={8}
              className="w-full bg-navy/50 border border-white/10 text-white placeholder-gray-600 rounded-lg px-4 py-2.5 pl-10 pr-10 text-sm focus:outline-none focus:border-gold/50 transition-colors"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Confirm password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              placeholder="Repeat your password"
              required
              className="w-full bg-navy/50 border border-white/10 text-white placeholder-gray-600 rounded-lg px-4 py-2.5 pl-10 text-sm focus:outline-none focus:border-gold/50 transition-colors"
            />
          </div>
        </div>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={terms}
            onChange={e => setTerms(e.target.checked)}
            className="mt-0.5 rounded border-white/20 bg-navy/50 text-gold focus:ring-gold"
          />
          <span className="text-sm text-gray-400">
            I agree to the{' '}
            <Link href="#" className="text-gold hover:text-gold-light">Terms of Service</Link>
            {' '}and{' '}
            <Link href="#" className="text-gold hover:text-gold-light">Privacy Policy</Link>
          </span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gold hover:bg-gold-light text-black font-bold py-3 rounded-lg text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
          ) : (
            <><UserPlus className="w-4 h-4" /> Create Account</>
          )}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Already have an account?{' '}
        <Link href="/login" className="text-gold hover:text-gold-light transition-colors font-medium">
          Sign in
        </Link>
      </p>
    </>
  )
}
