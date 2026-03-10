import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Building2, ClipboardList, Star, Users, DollarSign, BookOpen, BarChart3,
} from 'lucide-react';
import { useAuthStore } from '../../store/auth.store';
import { cn } from '../../lib/utils';

const navItems = [
  { to: '/dashboard/admin', label: 'Dashboard', icon: LayoutDashboard, roles: ['ADMIN'] },
  { to: '/dashboard/founder', label: 'Dashboard', icon: LayoutDashboard, roles: ['INCUBATEE'] },
  { to: '/dashboard/mentor', label: 'Dashboard', icon: LayoutDashboard, roles: ['MENTOR'] },
  { to: '/dashboard/investor', label: 'Dashboard', icon: LayoutDashboard, roles: ['INVESTOR'] },
  { to: '/startups', label: 'Startups', icon: Building2, roles: ['ADMIN', 'MENTOR', 'INVESTOR', 'INCUBATEE'] },
  { to: '/applications', label: 'Applications', icon: ClipboardList, roles: ['ADMIN', 'INCUBATEE'] },
  { to: '/evaluation', label: 'Evaluation', icon: Star, roles: ['ADMIN', 'MENTOR'] },
  { to: '/mentorship', label: 'Mentorship', icon: Users, roles: ['ADMIN', 'MENTOR', 'INCUBATEE'] },
  { to: '/funding', label: 'Funding', icon: DollarSign, roles: ['ADMIN', 'INVESTOR'] },
  { to: '/knowledge', label: 'Knowledge Base', icon: BookOpen, roles: ['ADMIN', 'MENTOR', 'INCUBATEE', 'INVESTOR'] },
  { to: '/analytics', label: 'Analytics', icon: BarChart3, roles: ['ADMIN', 'INVESTOR'] },
];

export default function Sidebar() {
  const { user } = useAuthStore();
  const role = user?.role || '';

  const filteredItems = navItems.filter((item) =>
    !item.roles || item.roles.includes(role),
  );

  const uniqueItems = filteredItems.filter((item, idx, arr) =>
    arr.findIndex((i) => i.to === item.to) === idx,
  );

  return (
    <div className="flex h-full w-64 flex-col bg-primary-900 text-white">
      <div className="flex h-16 items-center justify-center border-b border-primary-700">
        <span className="text-xl font-bold tracking-wider">FMCIII Portal</span>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {uniqueItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary-700 text-white'
                      : 'text-primary-100 hover:bg-primary-800 hover:text-white',
                  )
                }
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
