import Link from 'next/link'
import { Plus, Layers, CheckCircle, XCircle, HardDrive, Zap, FolderOpen } from 'lucide-react'
import { StatCard } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { mockProjects, mockUser } from '@/lib/mock-data'
import { formatDate, getStatusColor, getScoreColor } from '@/lib/utils'

export default function DashboardPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-1">Welcome back, {mockUser.name}</p>
        </div>
        <Link href="/dashboard/new-project">
          <button className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-black font-bold px-5 py-2.5 rounded-lg text-sm transition-all">
            <Plus className="w-4 h-4" /> Create New Model
          </button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        <StatCard
          title="Total Projects"
          value={mockProjects.length}
          sub="All time"
          icon={<FolderOpen className="w-6 h-6" />}
        />
        <StatCard
          title="Completed"
          value={mockProjects.filter(p => p.status === 'completed').length}
          sub="Models ready"
          icon={<CheckCircle className="w-6 h-6" />}
        />
        <StatCard
          title="Failed"
          value={mockProjects.filter(p => p.status === 'failed').length}
          sub="No credit used"
          icon={<XCircle className="w-6 h-6" />}
        />
        <StatCard
          title="Storage Used"
          value={`${mockUser.storageUsed} GB`}
          sub={`of ${mockUser.storageTotal} GB`}
          icon={<HardDrive className="w-6 h-6" />}
        />
        <StatCard
          title="Credits Left"
          value={`${mockUser.creditsTotal - mockUser.creditsUsed}/${mockUser.creditsTotal}`}
          sub={`${mockUser.plan} plan`}
          icon={<Zap className="w-6 h-6" />}
        />
      </div>

      {/* Credits bar */}
      <div className="card-glass rounded-xl p-5 mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-white">Monthly Credits</span>
          <span className="text-sm text-gray-400">{mockUser.creditsUsed}/{mockUser.creditsTotal} used</span>
        </div>
        <div className="h-2 bg-navy rounded-full overflow-hidden">
          <div
            className="h-full bg-gold rounded-full transition-all"
            style={{ width: `${(mockUser.creditsUsed / mockUser.creditsTotal) * 100}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">{mockUser.creditsTotal - mockUser.creditsUsed} generations remaining this month</p>
      </div>

      {/* Recent Projects */}
      <div className="card-glass rounded-xl overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-white/5">
          <h2 className="text-lg font-semibold text-white">Recent Projects</h2>
          <Link href="/dashboard/projects" className="text-gold hover:text-gold-light text-sm transition-colors">
            View all
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Project</th>
                <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Type</th>
                <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Status</th>
                <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Score</th>
                <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Created</th>
                <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockProjects.slice(0, 5).map(project => (
                <tr key={project.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-gold/20 to-navy flex items-center justify-center flex-shrink-0">
                        <Layers className="w-4 h-4 text-gold" />
                      </div>
                      <span className="text-white text-sm font-medium">{project.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <Badge label={project.type} variant="blue" />
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    {project.score ? (
                      <span className={`text-sm font-medium ${getScoreColor(project.score)}`}>{project.score}/100</span>
                    ) : (
                      <span className="text-gray-600 text-sm">—</span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-gray-400 text-sm">{formatDate(project.createdAt)}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Link href={`/dashboard/preview/${project.id}`} className="text-xs text-gold hover:text-gold-light transition-colors">
                        View 3D
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
