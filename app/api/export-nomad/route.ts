import { NextResponse } from 'next/server'

// EXPORT FOR NOMAD SCULPT
// Nomad Sculpt (iPad/Android) has no public API, so integration is file-based:
// we export a Nomad-optimized GLB (quad-friendly topology, vertex colors kept,
// reasonable poly count for mobile sculpting), which the user opens in Nomad.
//
// TODO: Real implementation in backend-python/blender_repair.py:
// - Decimate to ~500k tris max (Nomad mobile performance sweet spot)
// - Keep vertex colors + PBR material
// - Export GLB via bpy.ops.export_scene.gltf
export async function POST(request: Request) {
  const body = await request.json()
  const { projectId } = body

  await new Promise(r => setTimeout(r, 1200))

  return NextResponse.json({
    success: true,
    projectId,
    downloadUrl: '/downloads/model_nomad.glb',
    fileSize: '18.7 MB',
    polyCount: '480k tris',
    instructions: [
      'Download the GLB file to your iPad (Files app / AirDrop / cloud drive)',
      'Open Nomad Sculpt → menu → Add → Import → select the GLB',
      'Sculpt or touch up as you like — vertex colors are preserved',
      'Export from Nomad as GLB, then re-import here for repair + STL export',
    ],
    message: 'Nomad Sculpt file ready (mock).',
  })
}
