'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Mail, ArrowLeft, Send } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setLoading(false)
    setSent(true)
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-white mb-2">Reset your password</h1>
      <p className="text-gray-400 text-sm mb-8">
        Enter your email address and we&apos;ll send you a link to reset your password.
      </p>

      {sent ? (
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="w-7 h-7 text-green-400" />
          </div>
          <p className="text-white font-semibold mb-2">Check your inbox</p>
          <p className="text-gray-400 text-sm mb-6">
            We sent a password reset link to <span className="text-gold">{email}</span>
          </p>
          <Link href="/login" className="inline-flex items-center gap-2 text-gold hover:text-gold-light text-sm transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Sign In
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold hover:bg-gold-light text-black font-bold py-3 rounded-lg text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : (
              <><Send className="w-4 h-4" /> Send Reset Link</>
            )}
          </button>

          <Link href="/login" className="flex items-center justify-center gap-2 text-gray-400 hover:text-white text-sm transition-colors mt-4">
            <ArrowLeft className="w-4 h-4" /> Back to Sign In
          </Link>
        </form>
      )}
    </>
  )
}
