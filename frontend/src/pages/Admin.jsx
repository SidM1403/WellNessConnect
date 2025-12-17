import { useEffect, useState } from 'react';
import api from '../api/api.js';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  const load = async () => {
    const [{ data: usersRes }, { data: postsRes }] = await Promise.all([
      api.get('/admin/users'),
      api.get('/admin/posts')
    ]);
    setUsers(usersRes.users || []);
    setPosts(postsRes.posts || []);
  };

  useEffect(() => {
    load();
  }, []);

  const setRole = async (id, role) => {
    await api.patch(`/admin/user/${id}/role`, { role });
    load();
  };

  const deletePost = async (id) => {
    await api.delete(`/admin/post/${id}`);
    load();
  };

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="glass p-4 rounded-lg space-y-2">
        <h3 className="font-semibold">Users</h3>
        {users.map((u) => (
          <div key={u._id} className="flex items-center justify-between text-sm">
            <div>
              <p className="font-semibold">{u.name}</p>
              <p className="text-slate-400">{u.email}</p>
            </div>
            <div className="flex gap-2">
              <select
                value={u.role}
                onChange={(e) => setRole(u._id, e.target.value)}
                className="bg-slate-800 rounded px-2 py-1"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
        ))}
      </div>
      <div className="glass p-4 rounded-lg space-y-2">
        <h3 className="font-semibold">Posts</h3>
        {posts.map((p) => (
          <div key={p._id} className="flex items-center justify-between text-sm">
            <div>
              <p className="font-semibold">{p.title}</p>
              <p className="text-slate-400">by {p.author?.name}</p>
            </div>
            <button
              className="px-3 py-1 rounded bg-red-500/80 text-slate-900"
              onClick={() => deletePost(p._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;

