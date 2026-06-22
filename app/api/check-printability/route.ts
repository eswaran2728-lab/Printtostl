import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  return NextResponse.json({
    success: true,
    score: 87,
    manifold: true,
    wallThickness: 'warning',
    floatingParts: false,
    supportsNeeded: true,
    fragileParts: 2,
    fileSize: '12.4 MB',
    estimatedPrintTime: '6h 23m',
    estimatedFilament: 47,
    recommendedPrinter: 'Bambu Lab A1 Mini',
    recommendedNozzle: '0.4mm',
    layerHeight: '0.2mm',
    warnings: ['thin_part', 'needs_supports'],
  })
}
