import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../api/api.js';

const WellnessTodoWidget = () => {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const loadTasks = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get('/tasks');
      setTasks(data.tasks || []);
    } catch (err) {
      console.error('Failed to load wellness tasks', err);
      setError('Unable to load your wellness tasks.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAdd = async (e) => {
    e?.preventDefault();
    if (!newTitle.trim()) return;
    setSaving(true);
    setError('');
    try {
      await api.post('/tasks', { title: newTitle.trim() });
      setNewTitle('');
      await loadTasks();
    } catch (err) {
      console.error('Failed to add task', err);
      setError('Could not add this task.');
    } finally {
      setSaving(false);
    }
  };

  const toggleTask = async (id) => {
    try {
      await api.patch(`/tasks/${id}/toggle`);
      await loadTasks();
    } catch (err) {
      console.error('Failed to toggle task', err);
      setError('Could not update task.');
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      await loadTasks();
    } catch (err) {
      console.error('Failed to delete task', err);
      setError('Could not delete task.');
    }
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const total = tasks.length || 1;
  const completionPercent = Math.round((completedCount / total) * 100);

  return (
    <div className="glass rounded-3xl p-4 sm:p-5 space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-wide text-emerald-200/80">
            Wellness to‑do
          </p>
          <p className="text-sm text-slate-200">
            Small daily actions that support your wellbeing.
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-300">
            {completedCount}/{tasks.length || 0} done
          </p>
          <p className="text-[11px] text-emerald-300">{completionPercent}% today</p>
        </div>
      </div>

      <form onSubmit={handleAdd} className="flex gap-2 text-xs sm:text-sm">
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Add a gentle wellness task"
          className="flex-1 rounded-full bg-slate-900/60 px-3 py-2 border border-white/10 text-slate-100"
        />
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-emerald-300/90 px-4 py-2 text-xs sm:text-sm font-semibold text-emerald-950 disabled:opacity-60"
        >
          Add
        </button>
      </form>

      {error && <p className="text-xs text-red-300">{error}</p>}

      {loading ? (
        <p className="text-xs text-slate-400">Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p className="text-xs text-slate-400">
          No tasks yet. Try adding 2–3 small actions you want to show up for today.
        </p>
      ) : (
        <div className="space-y-2">
          {tasks.map((task) => (
            <motion.div
              key={task._id}
              className="rounded-2xl border border-white/5 bg-slate-950/60 px-3 py-2.5 flex items-center justify-between gap-2"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <button
                type="button"
                onClick={() => toggleTask(task._id)}
                className={`flex-1 text-left text-sm ${
                  task.completed ? 'line-through text-emerald-200' : 'text-slate-100'
                }`}
              >
                {task.title}
              </button>
              <button
                type="button"
                onClick={() => deleteTask(task._id)}
                className="text-[11px] text-slate-400 hover:text-red-300"
              >
                Remove
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WellnessTodoWidget;


