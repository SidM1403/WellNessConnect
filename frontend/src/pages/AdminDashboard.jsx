import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../api/api.js';
import LoadingSkeleton from '../components/LoadingSkeleton.jsx';

const StatCard = ({ label, value, accent }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass rounded-3xl p-4 sm:p-5 card-hover-soft relative overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/4 to-transparent pointer-events-none" />
    <p className="text-[11px] uppercase tracking-wide text-slate-300/80">{label}</p>
    <p className="text-2xl font-semibold text-slate-50">{value}</p>
    <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-slate-900/60 px-2 py-1 text-[10px] text-slate-200 border border-white/5">
      ● {accent}
    </span>
  </motion.div>
);

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const [{ data: userRes }, { data: postRes }] = await Promise.all([
        api.get('/admin/users'),
        api.get('/admin/posts')
      ]);
      setUsers(userRes.users || []);
      setPosts(postRes.posts || []);
    } catch (e) {
      setError('Unable to load admin data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const updateRole = async (id, role) => {
    await api.patch(`/admin/user/${id}/role`, { role });
    load();
  };

  const deletePost = async (id) => {
    await api.delete(`/admin/post/${id}`);
    setPosts((prev) => prev.filter((p) => p._id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl glass p-5 sm:p-6 shadow-soft-xl">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,rgba(74,222,128,0.16),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(56,189,248,0.16),transparent_45%)]" />
        <div className="relative flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-wide text-emerald-100">Admin control</p>
            <h1 className="text-xl sm:text-2xl font-semibold text-slate-50">
              WellConnect oversight
            </h1>
            <p className="text-sm text-slate-200/80">
              Live data from your backend—users, posts, and moderation actions.
            </p>
          </div>
          <div className="hidden md:block rounded-2xl border border-white/10 bg-slate-900/60 px-3 py-2 text-[11px] text-slate-200">
            <p>API</p>
            <p className="font-mono text-[10px] text-emerald-200">/api/admin/*</p>
          </div>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-300 glass inline-flex px-3 py-2 rounded-full">{error}</p>
      )}

      {loading ? (
        <div className="grid gap-3 md:grid-cols-3">
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-3">
          <StatCard label="Community members" value={users.length} accent="Users loaded" />
          <StatCard label="Active posts" value={posts.length} accent="Posts pulled" />
          <StatCard
            label="Admins"
            value={users.filter((u) => u.role === 'admin').length}
            accent="Role: admin"
          />
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="glass rounded-3xl p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-100">Users</h2>
            <span className="text-[11px] text-slate-400">{users.length} total</span>
          </div>
          <div className="space-y-2 max-h-[420px] overflow-auto pr-1">
            {users.map((u) => (
              <motion.div
                key={u._id}
                className="rounded-2xl border border-white/5 bg-slate-950/60 px-3 py-2.5 flex items-center justify-between gap-3"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-50 truncate">{u.name}</p>
                  <p className="text-[11px] text-slate-400 truncate">{u.email}</p>
                </div>
                <select
                  value={u.role}
                  onChange={(e) => updateRole(u._id, e.target.value)}
                  className="rounded-full bg-slate-900/70 border border-white/10 px-2 py-1 text-[11px] text-slate-100"
                >
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </select>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="glass rounded-3xl p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-100">Posts</h2>
            <span className="text-[11px] text-slate-400">{posts.length} total</span>
          </div>
          <div className="space-y-2 max-h-[420px] overflow-auto pr-1">
            {posts.map((p) => (
              <motion.div
                key={p._id}
                className="rounded-2xl border border-white/5 bg-slate-950/60 px-3 py-2.5"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-50 truncate">{p.title}</p>
                    <p className="text-[11px] text-slate-400">
                      by {p.author?.name || 'Member'} • {p.likes ?? 0} likes
                    </p>
                  </div>
                  <button
                    onClick={() => deletePost(p._id)}
                    className="text-[11px] rounded-full border border-red-300/50 bg-red-400/10 px-2 py-1 text-red-100 hover:bg-red-400/20"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;


