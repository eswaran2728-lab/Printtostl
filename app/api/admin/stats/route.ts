import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    totalUsers: 1247,
    totalProjects: 3891,
    completed: 3204,
    failed: 687,
    storageUsed: '842 GB',
    monthlyRevenue: 'RM 18,420',
    popularModelTypes: [
      { type: 'Deity statue', count: 892, pct: 23 },
      { type: 'Chibi figure', count: 756, pct: 19 },
      { type: 'Full body statue', count: 623, pct: 16 },
      { type: 'Bust', count: 511, pct: 13 },
      { type: 'Keychain', count: 489, pct: 13 },
      { type: 'Others', count: 620, pct: 16 },
    ],
  })
}
