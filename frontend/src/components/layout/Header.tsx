import { LogOut, User } from 'lucide-react';
import { useAuthStore } from '../../store/auth.store';
import { getInitials } from '../../lib/utils';

export default function Header() {
  const { user, logout } = useAuthStore();

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <div className="text-sm text-gray-500">
        Welcome back, <span className="font-medium text-gray-900">{user?.name || user?.email}</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {user?.avatar ? (
            <img src={user.avatar} alt="avatar" className="h-8 w-8 rounded-full" />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-white text-xs font-medium">
              {user?.name ? getInitials(user.name) : <User className="h-4 w-4" />}
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.role}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </header>
  );
}
