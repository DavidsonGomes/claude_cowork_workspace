import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Activity,
  Users,
  GitBranch,
  DollarSign,
  Video,
  Heart,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/routines', label: 'Rotinas', icon: Activity },
  { to: '/community', label: 'Comunidade', icon: Users },
  { to: '/projects', label: 'Projetos', icon: GitBranch },
  { to: '/finance', label: 'Financeiro', icon: DollarSign },
  { to: '/meetings', label: 'Reuniões', icon: Video },
  { to: '/health', label: 'Saúde', icon: Heart },
]

export function Sidebar() {
  return (
    <aside
      className="fixed left-0 top-0 h-full w-[220px] flex flex-col z-20"
      style={{ backgroundColor: '#101828' }}
    >
      {/* Logo */}
      <div className="flex items-center px-5 h-14 border-b" style={{ borderColor: 'hsl(215 20% 27%)' }}>
        <img src="/logo.png" alt="EVO Dashboard" className="h-8 w-auto" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-6 py-2.5 text-sm font-medium transition-colors',
                'border-l-[3px] border-transparent',
                isActive
                  ? 'border-l-[3px] text-[#00FFA7]'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
              )
            }
            style={({ isActive }) =>
              isActive
                ? { borderLeftColor: '#00FFA7', borderLeftWidth: '3px' }
                : { borderLeftWidth: '3px', borderLeftColor: 'transparent' }
            }
          >
            <Icon size={16} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t" style={{ borderColor: 'hsl(215 20% 27%)' }}>
        <span className="text-xs text-gray-500">EVO Dashboard v1.0</span>
      </div>
    </aside>
  )
}
