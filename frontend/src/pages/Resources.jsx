import { useEffect, useState } from 'react';
import api from '../api/api.js';
import ResourceCard from '../components/ResourceCard.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const fallbackResources = [
  {
    _id: 'demo-res-1',
    title: 'Guided breath for focus (audio)',
    description: '4-7-8 paced breathing to steady your mind before a task.',
    type: 'tip',
    url: 'https://example.com/focus-breath',
    category: 'Mindfulness'
  },
  {
    _id: 'demo-res-2',
    title: 'Mobility reset: 8-minute flow',
    description: 'Loosen hips, shoulders, and spine without getting sweaty.',
    type: 'video',
    url: 'https://example.com/mobility-reset',
    category: 'Fitness'
  },
  {
    _id: 'demo-res-3',
    title: 'Evening wind-down ritual',
    description: 'A gentle three-step routine to ease into restful sleep.',
    type: 'article',
    url: 'https://example.com/wind-down',
    category: 'Sleep'
  },
  {
    _id: 'demo-res-4',
    title: 'Mindful snacking: small swaps',
    description: 'Practical swaps to keep blood sugar steadier through the day.',
    type: 'tip',
    url: 'https://example.com/snack-swaps',
    category: 'Nutrition'
  }
];

const Resources = () => {
  const { user } = useAuth();
  const [resources, setResources] = useState([]);
  const [filters, setFilters] = useState({ category: '', type: '' });
  const [form, setForm] = useState({
    title: '',
    description: '',
    url: '',
    category: '',
    type: 'article'
  });

  const load = async () => {
    try {
      const { data } = await api.get('/resources', { params: filters });
      const incoming = data.resources || [];
      setResources(incoming.length ? incoming : fallbackResources);
    } catch {
      setResources(fallbackResources);
    }
  };

  useEffect(() => {
    load();
  }, [filters]);

  const create = async (e) => {
    e.preventDefault();
    await api.post('/resources', form);
    setForm({ title: '', description: '', url: '', category: '', type: 'article' });
    load();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <input
          placeholder="Category"
          className="px-3 py-2 bg-slate-800 rounded"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        />
        <select
          className="px-3 py-2 bg-slate-800 rounded"
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        >
          <option value="">All types</option>
          <option value="article">Article</option>
          <option value="video">Video</option>
          <option value="tip">Tip</option>
        </select>
      </div>

      {user?.role === 'admin' && (
        <form onSubmit={create} className="glass p-4 rounded-lg grid md:grid-cols-2 gap-2">
          <input
            className="px-3 py-2 bg-slate-800 rounded"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            className="px-3 py-2 bg-slate-800 rounded"
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
          <input
            className="px-3 py-2 bg-slate-800 rounded"
            placeholder="URL"
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
          />
          <select
            className="px-3 py-2 bg-slate-800 rounded"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option value="article">Article</option>
            <option value="video">Video</option>
            <option value="tip">Tip</option>
          </select>
          <textarea
            className="col-span-2 px-3 py-2 bg-slate-800 rounded"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <button className="col-span-2 px-4 py-2 rounded bg-accent text-slate-900 font-semibold">
            Add Resource
          </button>
        </form>
      )}

      <div className="grid md:grid-cols-2 gap-3">
        {resources.map((r) => (
          <ResourceCard key={r._id} resource={r} />
        ))}
      </div>
    </div>
  );
};

export default Resources;

