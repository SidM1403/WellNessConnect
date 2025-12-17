import { useEffect, useState } from 'react';
import api from '../api/api.js';
import PostCard from '../components/PostCard.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const tags = ['Mental', 'Fitness', 'Diet', 'Mindfulness', 'Therapy'];
const fallbackPosts = [
  {
    _id: 'demo-post-1',
    title: 'Breath check-in before meetings',
    content:
      'I pause for 90 seconds with 4-7-8 breathing before clicking “Join meeting.” Keeps me steady.',
    tags: ['Mindfulness'],
    likes: 18,
    comments: [{ _id: 'demo-c1', text: 'Doing this daily now!', user: { name: 'Ray' } }],
    author: { name: 'WellConnect Demo' }
  },
  {
    _id: 'demo-post-2',
    title: 'Evening digital sunset',
    content:
      'I dim screens at 8:30pm and read 6 pages of a book. Sleep quality improved a lot.',
    tags: ['Mental', 'Therapy'],
    likes: 24,
    comments: [{ _id: 'demo-c2', text: 'Screens-off helped me too', user: { name: 'Mina' } }],
    author: { name: 'WellConnect Demo' }
  },
  {
    _id: 'demo-post-3',
    title: 'Desk mobility: 5-move mini flow',
    content:
      'Neck circles, shoulder CARs, cat-cow seated, thoracic rotations, hip openers—takes 6 minutes.',
    tags: ['Fitness'],
    likes: 31,
    comments: [{ _id: 'demo-c3', text: 'Shoulders feel lighter now', user: { name: 'Lee' } }],
    author: { name: 'WellConnect Demo' }
  }
];

const Forum = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ search: '', tag: '' });
  const [form, setForm] = useState({ title: '', content: '', tags: [], anonymous: false });

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/posts', { params: filters });
      const incoming = data.posts || [];
      setPosts(incoming.length ? incoming : fallbackPosts);
    } catch {
      setPosts(fallbackPosts);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [filters]);

  const create = async (e) => {
    e.preventDefault();
    if (!user) return;
    await api.post('/posts', { ...form, tags: form.tags.filter(Boolean) });
    setForm({ title: '', content: '', tags: [], anonymous: false });
    load();
  };

  const like = async (id) => {
    if (id?.startsWith('demo-')) return;
    await api.patch(`/posts/${id}/like`);
    load();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <input
          placeholder="Search posts"
          className="px-3 py-2 rounded bg-slate-800"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
        <select
          className="px-3 py-2 rounded bg-slate-800"
          value={filters.tag}
          onChange={(e) => setFilters({ ...filters, tag: e.target.value })}
        >
          <option value="">All tags</option>
          {tags.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {user && (
        <form onSubmit={create} className="glass p-4 rounded-lg space-y-2">
          <h3 className="font-semibold">Share something</h3>
          <input
            className="w-full px-3 py-2 bg-slate-800 rounded"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <textarea
            className="w-full px-3 py-2 bg-slate-800 rounded"
            placeholder="Content"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />
          <div className="flex gap-2 flex-wrap">
            {tags.map((t) => (
              <label key={t} className="text-xs">
                <input
                  type="checkbox"
                  className="mr-1"
                  checked={form.tags.includes(t)}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      tags: e.target.checked
                        ? [...prev.tags, t]
                        : prev.tags.filter((tag) => tag !== t)
                    }))
                  }
                />
                {t}
              </label>
            ))}
          </div>
          <label className="inline-flex items-center gap-2 text-xs text-slate-300">
            <input
              type="checkbox"
              checked={form.anonymous}
              onChange={(e) => setForm((prev) => ({ ...prev, anonymous: e.target.checked }))}
            />
            Post anonymously
          </label>
          <button className="px-4 py-2 rounded bg-accent text-slate-900 font-semibold">Post</button>
        </form>
      )}

      <div className="space-y-3">
        {loading && <p>Loading...</p>}
        {posts.map((p) => (
          <PostCard key={p._id} post={p} onLike={like} />
        ))}
      </div>
    </div>
  );
};

export default Forum;

