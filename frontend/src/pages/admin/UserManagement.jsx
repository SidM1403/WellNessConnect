import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, UserCheck, UserX, Shield, ShieldOff } from 'lucide-react';
import api from '../../api/api.js';
import LoadingSkeleton from '../../components/LoadingSkeleton.jsx';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/admin/users?search=${search}&page=${page}&limit=20`);
        setUsers(data.users || []);
        setTotal(data.total || 0);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [search, page]);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await api.put(`/admin/users/${userId}/role`, { role: newRole });
      setUsers(users.map((u) => (u._id === userId ? { ...u, role: newRole } : u)));
    } catch (err) {
      console.error(err);
      alert('Failed to update role');
    }
  };

  const handleStatusChange = async (userId, newStatus) => {
    try {
      await api.put(`/admin/users/${userId}/status`, { status: newStatus });
      setUsers(users.map((u) => (u._id === userId ? { ...u, status: newStatus } : u)));
    } catch (err) {
      console.error(err);
      alert('Failed to update status');
    }
  };

  if (loading) return <LoadingSkeleton />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-50 mb-2">User Management</h1>
        <p className="text-slate-400">Manage users, roles, and account status</p>
      </div>

      <div className="glass rounded-2xl p-4 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900/50 border border-white/10 text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          />
        </div>
        <div className="text-sm text-slate-400">
          {total} total users
        </div>
      </div>

      <div className="glass rounded-2xl p-6">
        <div className="space-y-3">
          {users.map((user) => (
            <motion.div
              key={user._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="border border-white/10 rounded-xl p-4 bg-slate-900/30 hover:bg-slate-900/50 transition-colors"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-slate-50 truncate">{user.name}</h3>
                    {user.role === 'admin' && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-medium">
                        Admin
                      </span>
                    )}
                    {user.status === 'suspended' && (
                      <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 text-xs font-medium">
                        Suspended
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-400 truncate">{user.email}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Joined {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="px-3 py-2 rounded-lg bg-slate-800 border border-white/10 text-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>

                  <button
                    onClick={() =>
                      handleStatusChange(
                        user._id,
                        user.status === 'active' ? 'suspended' : 'active'
                      )
                    }
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      user.status === 'active'
                        ? 'bg-red-500/20 text-red-300 hover:bg-red-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
                    }`}
                    title={user.status === 'active' ? 'Suspend User' : 'Activate User'}
                  >
                    {user.status === 'active' ? (
                      <UserX size={18} />
                    ) : (
                      <UserCheck size={18} />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {users.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400">No users found</p>
          </div>
        )}

        {total > 20 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-lg bg-slate-800 text-slate-50 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700"
            >
              Previous
            </button>
            <span className="text-slate-400">
              Page {page} of {Math.ceil(total / 20)}
            </span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page >= Math.ceil(total / 20)}
              className="px-4 py-2 rounded-lg bg-slate-800 text-slate-50 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;

