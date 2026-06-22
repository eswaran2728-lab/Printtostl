import Link from 'next/link'
import { Plus, Eye, Download, RefreshCw, Trash2, Layers } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { mockProjects } from '@/lib/mock-data'
import { formatDate, getStatusColor, getScoreColor } from '@/lib/utils'

export default function ProjectsPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">My Projects</h1>
          <p className="text-gray-400 mt-1">{mockProjects.length} total projects</p>
        </div>
        <Link href="/dashboard/new-project">
          <button className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-black font-bold px-5 py-2.5 rounded-lg text-sm transition-all">
            <Plus className="w-4 h-4" /> New Project
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockProjects.map(project => (
          <div key={project.id} className="card-glass rounded-xl overflow-hidden hover:border-gold/30 transition-all">
            {/* Thumbnail */}
            <div className="h-40 bg-gradient-to-br from-navy via-navy-light to-gold/10 flex items-center justify-center relative">
              <Layers className="w-12 h-12 text-gold/30" />
              <div className="absolute top-3 right-3">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-white font-semibold">{project.name}</h3>
                  <p className="text-gray-500 text-xs mt-0.5">{formatDate(project.createdAt)}</p>
                </div>
                {project.score && (
                  <span className={`text-sm font-bold ${getScoreColor(project.score)}`}>
                    {project.score}/100
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 mb-4">
                <Badge label={project.type} variant="blue" />
                {project.score && project.score >= 90 && <Badge label="Print Ready" variant="green" />}
                {project.score && project.score < 80 && <Badge label="Needs Review" variant="yellow" />}
              </div>

              {project.score && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">Printability</span>
                    <span className={`text-xs font-medium ${getScoreColor(project.score)}`}>{project.score}%</span>
                  </div>
                  <div className="h-1.5 bg-navy rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${project.score >= 90 ? 'bg-green-400' : project.score >= 70 ? 'bg-yellow-400' : 'bg-red-400'}`}
                      style={{ width: `${project.score}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                <Link href={`/dashboard/preview/${project.id}`}>
                  <button className="inline-flex items-center gap-1.5 bg-gold/10 border border-gold/30 text-gold hover:bg-gold/20 px-3 py-1.5 rounded-lg text-xs font-medium transition-all">
                    <Eye className="w-3 h-3" /> View 3D
                  </button>
                </Link>
                {project.status === 'completed' && (
                  <>
                    <button className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 px-3 py-1.5 rounded-lg text-xs font-medium transition-all">
                      <Download className="w-3 h-3" /> STL
                    </button>
                    <button className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 px-3 py-1.5 rounded-lg text-xs font-medium transition-all">
                      <Download className="w-3 h-3" /> OBJ
                    </button>
                    <button className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 px-3 py-1.5 rounded-lg text-xs font-medium transition-all">
                      <Download className="w-3 h-3" /> GLB
                    </button>
                  </>
                )}
                <button className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 px-3 py-1.5 rounded-lg text-xs font-medium transition-all">
                  <RefreshCw className="w-3 h-3" /> Regen
                </button>
                <button className="inline-flex items-center gap-1.5 bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 px-3 py-1.5 rounded-lg text-xs font-medium transition-all">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
