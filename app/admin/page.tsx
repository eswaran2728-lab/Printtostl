'use client'
import { Users, FolderOpen, CheckCircle, XCircle, HardDrive, DollarSign, Layers } from 'lucide-react'
import { StatCard } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { formatDate, getStatusColor, getScoreColor } from '@/lib/utils'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts'

const genData = [
  { day: 'Mon', count: 42 }, { day: 'Tue', count: 67 }, { day: 'Wed', count: 55 },
  { day: 'Thu', count: 89 }, { day: 'Fri', count: 102 }, { day: 'Sat', count: 78 },
  { day: 'Sun', count: 61 },
]

const modelTypeData = [
  { name: 'Deity statue', value: 23, color: '#d4a017' },
  { name: 'Chibi figure', value: 19, color: '#f0c040' },
  { name: 'Full body', value: 16, color: '#a07010' },
  { name: 'Bust', value: 13, color: '#1a2f45' },
  { name: 'Keychain', value: 13, color: '#0d4a6b' },
  { name: 'Others', value: 16, color: '#374151' },
]

const recentUsers = [
  { id: 'u1', name: 'Ahmad Razif', email: 'ahmad@example.com', plan: 'Business', projects: 12, joinedAt: '2024-07-01' },
  { id: 'u2', name: 'Priya Krishnan', email: 'priya@example.com', plan: 'Creator', projects: 5, joinedAt: '2024-07-03' },
  { id: 'u3', name: 'Lim Wei Jie', email: 'lim@example.com', plan: 'Free', projects: 2, joinedAt: '2024-07-05' },
  { id: 'u4', name: 'Muthu Raja', email: 'muthu@example.com', plan: 'Studio', projects: 47, joinedAt: '2024-06-20' },
  { id: 'u5', name: 'Sarah Tan', email: 'sarah@example.com', plan: 'Creator', projects: 8, joinedAt: '2024-07-08' },
]

const recentProjects = [
  { id: 'p1', name: 'Murugan Statue', user: 'Muthu Raja', type: 'Deity statue', status: 'completed', score: 91, createdAt: '2024-07-08' },
  { id: 'p2', name: 'Custom Chibi', user: 'Priya Krishnan', type: 'Chibi figure', status: 'processing', score: null, createdAt: '2024-07-08' },
  { id: 'p3', name: 'Warrior Bust', user: 'Lim Wei Jie', type: 'Bust', status: 'completed', score: 82, createdAt: '2024-07-07' },
  { id: 'p4', name: 'Dragon Mini', user: 'Sarah Tan', type: 'Miniature figure', status: 'failed', score: null, createdAt: '2024-07-07' },
  { id: 'p5', name: 'Product Showcase', user: 'Ahmad Razif', type: 'Product model', status: 'completed', score: 88, createdAt: '2024-07-06' },
]

const planColors: Record<string, string> = {
  Free: 'gray', Creator: 'blue', Business: 'gold', Studio: 'green'
}

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] p-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-gold/10 rounded-lg flex items-center justify-center">
            <Layers className="w-4 h-4 text-gold" />
          </div>
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        </div>
        <p className="text-gray-400">PhotoToSTL Pro — Platform Overview</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        <StatCard title="Total Users" value="1,247" icon={<Users className="w-6 h-6" />} />
        <StatCard title="Total Projects" value="3,891" icon={<FolderOpen className="w-6 h-6" />} />
        <StatCard title="Completed" value="3,204" sub="82.3% success rate" icon={<CheckCircle className="w-6 h-6" />} />
        <StatCard title="Failed" value="687" sub="17.7% failure rate" icon={<XCircle className="w-6 h-6" />} />
        <StatCard title="Storage Used" value="842 GB" icon={<HardDrive className="w-6 h-6" />} />
        <StatCard title="Monthly Revenue" value="RM 18,420" icon={<DollarSign className="w-6 h-6" />} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        <div className="card-glass rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-6">Generations per Day (This Week)</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={genData}>
              <XAxis dataKey="day" stroke="#4b5563" tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <YAxis stroke="#4b5563" tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0d1b2a', border: '1px solid rgba(212,160,23,0.2)', borderRadius: '8px', color: '#fff' }}
              />
              <Bar dataKey="count" fill="#d4a017" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card-glass rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-6">Model Type Distribution</h2>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width="60%" height={200}>
              <PieChart>
                <Pie data={modelTypeData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                  {modelTypeData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0d1b2a', border: '1px solid rgba(212,160,23,0.2)', borderRadius: '8px', color: '#fff' }}
                  formatter={(val) => [`${val}%`, '']}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {modelTypeData.map(item => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-gray-400 text-xs">{item.name}</span>
                  <span className="text-white text-xs font-medium ml-auto">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Users */}
      <div className="card-glass rounded-xl overflow-hidden mb-6">
        <div className="p-5 border-b border-white/5">
          <h2 className="text-lg font-semibold text-white">Recent Users</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                {['User', 'Plan', 'Projects', 'Joined'].map(h => (
                  <th key={h} className="text-left text-xs font-medium text-gray-500 px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentUsers.map(user => (
                <tr key={user.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold text-xs font-bold">
                        {user.name[0]}
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">{user.name}</p>
                        <p className="text-gray-500 text-xs">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <Badge label={user.plan} variant={(planColors[user.plan] as any) || 'gray'} />
                  </td>
                  <td className="px-5 py-4 text-white text-sm">{user.projects}</td>
                  <td className="px-5 py-4 text-gray-400 text-sm">{formatDate(user.joinedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="card-glass rounded-xl overflow-hidden">
        <div className="p-5 border-b border-white/5">
          <h2 className="text-lg font-semibold text-white">Recent Projects</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                {['Project', 'User', 'Type', 'Status', 'Score', 'Date'].map(h => (
                  <th key={h} className="text-left text-xs font-medium text-gray-500 px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentProjects.map(proj => (
                <tr key={proj.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                  <td className="px-5 py-4 text-white text-sm font-medium">{proj.name}</td>
                  <td className="px-5 py-4 text-gray-400 text-sm">{proj.user}</td>
                  <td className="px-5 py-4"><Badge label={proj.type} variant="blue" /></td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(proj.status)}`}>
                      {proj.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    {proj.score ? (
                      <span className={`text-sm font-medium ${getScoreColor(proj.score)}`}>{proj.score}/100</span>
                    ) : '—'}
                  </td>
                  <td className="px-5 py-4 text-gray-400 text-sm">{formatDate(proj.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
