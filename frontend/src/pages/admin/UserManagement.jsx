import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, UserCheck, UserX } from 'lucide-react';
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

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-14 w-full bg-surface-100 rounded-2xl animate-pulse" />
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-20 w-full bg-white rounded-xl border border-surface-200 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-text-primary">User Management</h1>
        <p className="text-text-secondary mt-1">Manage users, roles, and account status</p>
      </div>

      <div className="card-premium p-2 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light" size={20} />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-transparent text-text-primary placeholder:text-text-light focus:outline-none"
          />
        </div>
        <div className="pr-4 text-sm font-medium text-text-secondary hidden sm:block">
          {total} total users
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-surface-200 shadow-sm overflow-hidden">
        <div className="divide-y divide-surface-100">
          {users.map((user) => (
            <motion.div
              key={user._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 sm:p-5 hover:bg-surface-50 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-text-primary truncate">{user.name}</h3>
                    {user.role === 'admin' && (
                      <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-600 text-xs font-bold border border-purple-100">
                        ADMIN
                      </span>
                    )}
                    {user.status === 'suspended' && (
                      <span className="px-2 py-0.5 rounded-md bg-coral-50 text-coral-600 text-xs font-bold border border-coral-100">
                        SUSPENDED
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-text-secondary truncate">{user.email}</p>
                  <p className="text-xs text-text-light mt-1">
                    Joined {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="px-3 py-2 rounded-lg bg-surface-50 border border-surface-200 text-text-secondary text-sm font-medium focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
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
                    className={`p-2 rounded-lg transition-all shadow-sm border ${user.status === 'active'
                        ? 'bg-white border-coral-100 text-coral-500 hover:bg-coral-50 hover:border-coral-200'
                        : 'bg-white border-emerald-100 text-emerald-500 hover:bg-emerald-50 hover:border-emerald-200'
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
            <p className="text-text-light italic">No users found matching your search.</p>
          </div>
        )}

        {total > 20 && (
          <div className="p-4 border-t border-surface-200 flex items-center justify-center gap-4 bg-surface-50">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-lg bg-white border border-surface-200 text-text-primary text-sm font-medium hover:bg-surface-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              Previous
            </button>
            <span className="text-sm font-medium text-text-secondary">
              Page {page} of {Math.ceil(total / 20)}
            </span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page >= Math.ceil(total / 20)}
              className="px-4 py-2 rounded-lg bg-white border border-surface-200 text-text-primary text-sm font-medium hover:bg-surface-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
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
