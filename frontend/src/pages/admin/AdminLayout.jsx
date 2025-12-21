import { useState, useEffect } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  TrendingUp,
  Heart,
  MessageSquare,
  Bot,
  Settings,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { FaSpa } from 'react-icons/fa';

const menuItems = [
  { path: '/admin', icon: LayoutDashboard, label: 'Overview' },
  { path: '/admin/users', icon: Users, label: 'User Analytics' },
  { path: '/admin/wellness', icon: Heart, label: 'Wellness Trends' },
  { path: '/admin/forums', icon: MessageSquare, label: 'Forum Analytics' },
  { path: '/admin/ai', icon: Bot, label: 'AI Analytics' },
  { path: '/admin/manage', icon: Settings, label: 'User Management' }
];

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-surface-50">
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-50 glass border-b border-surface-200 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white shadow-lg shadow-primary-500/30">
            <FaSpa className="w-4 h-4" />
          </div>
          <span className="font-display font-bold text-lg text-text-primary">Admin</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-surface-100 text-text-secondary"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <motion.aside
          initial={false}
          animate={{
            x: sidebarOpen || isDesktop ? 0 : -280
          }}
          className="fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-surface-200 lg:border-r-0 lg:translate-x-0 shadow-xl lg:shadow-none"
        >
          <div className="h-full flex flex-col p-6">
            <div className="mb-8 hidden lg:flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white shadow-lg shadow-primary-500/30">
                <FaSpa className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold font-display text-text-primary">Admin Panel</h1>
                <p className="text-xs text-text-light font-medium">WellConnect Analytics</p>
              </div>
            </div>

            <nav className="flex-1 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive
                      ? 'bg-primary-50 text-indigo-600 shadow-sm border border-primary-100'
                      : 'text-text-secondary hover:bg-surface-50 hover:text-primary-600'
                      }`}
                  >
                    <Icon size={20} className={isActive ? 'text-primary-600' : ''} />
                    <span className="text-sm">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="pt-6 border-t border-surface-200">
              <div className="px-4 py-2 mb-4 bg-surface-50 rounded-xl border border-surface-100">
                <p className="text-xs text-text-light uppercase tracking-wide font-bold mb-1">Logged in as</p>
                <p className="text-sm font-bold text-text-primary truncate">{user?.name}</p>
                <p className="text-xs text-text-secondary truncate">{user?.email}</p>
              </div>
              <button
                onClick={logout}
                className="w-full px-4 py-2.5 rounded-xl border border-surface-200 text-text-secondary hover:bg-surface-50 hover:text-primary-600 transition-colors text-sm font-bold flex items-center justify-center gap-2"
              >
                Logout
              </button>
            </div>
          </div>
        </motion.aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-0 p-6 lg:p-10 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
