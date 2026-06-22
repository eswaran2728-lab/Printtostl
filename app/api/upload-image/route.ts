import { NextResponse } from 'next/server'

// TODO: Connect to Supabase Storage for real file upload
// TODO: Validate file type, size limits per subscription tier
export async function POST(request: Request) {
  await new Promise(r => setTimeout(r, 500))
  return NextResponse.json({
    success: true,
    imageId: 'img_' + Math.random().toString(36).slice(2),
    url: '/api/placeholder/400/400',
    message: 'Image uploaded successfully (mock)',
  })
}
