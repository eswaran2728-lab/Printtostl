import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const PASSWORD = process.env.SITE_PASSWORD || 'eshan2024'

export async function POST(request: Request) {
  const { password, from } = await request.json()

  if (password !== PASSWORD) {
    return NextResponse.json({ error: 'Wrong password' }, { status: 401 })
  }

  const res = NextResponse.json({ success: true, redirect: from || '/' })
  res.cookies.set('site_auth', PASSWORD, {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/',
  })
  return res
}
