// TODO: Replace with real Supabase client when ready
// import { createClient } from '@supabase/supabase-js'
// export const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// )

// Mock auth for development
export const mockAuth = {
  signIn: async (email: string, password: string) => {
    await new Promise(r => setTimeout(r, 800))
    if (email && password) {
      const user = { id: 'user_001', email, name: email.split('@')[0] }
      localStorage.setItem('phototostl_user', JSON.stringify(user))
      return { user, error: null }
    }
    return { user: null, error: 'Invalid credentials' }
  },
  signUp: async (email: string, password: string, name: string) => {
    await new Promise(r => setTimeout(r, 800))
    const user = { id: 'user_' + Math.random().toString(36).slice(2), email, name }
    localStorage.setItem('phototostl_user', JSON.stringify(user))
    return { user, error: null }
  },
  signOut: () => localStorage.removeItem('phototostl_user'),
  getUser: () => {
    if (typeof window === 'undefined') return null
    const stored = localStorage.getItem('phototostl_user')
    return stored ? JSON.parse(stored) : null
  },
}
