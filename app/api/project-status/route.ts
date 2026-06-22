import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const projectId = searchParams.get('id')
  return NextResponse.json({
    projectId,
    status: 'processing',
    currentStep: 4,
    totalSteps: 13,
    steps: [
      { id: 1, name: 'Image uploaded', status: 'done' },
      { id: 2, name: 'Background removed', status: 'done' },
      { id: 3, name: 'Image enhanced', status: 'done' },
      { id: 4, name: 'Depth estimated', status: 'processing' },
      { id: 5, name: '3D mesh generated', status: 'pending' },
      { id: 6, name: 'Mesh cleaned', status: 'pending' },
      { id: 7, name: 'Holes filled', status: 'pending' },
      { id: 8, name: 'Non-manifold fixed', status: 'pending' },
      { id: 9, name: 'Thin parts thickened', status: 'pending' },
      { id: 10, name: 'Floating parts connected', status: 'pending' },
      { id: 11, name: 'Base added', status: 'pending' },
      { id: 12, name: 'STL exported', status: 'pending' },
      { id: 13, name: 'Printability report ready', status: 'pending' },
    ],
  })
}
