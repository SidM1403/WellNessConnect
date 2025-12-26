import React, { useEffect, useState } from 'react';
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
    <div className="card-premium p-6 space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-primary-500 font-bold">
            Wellness To-Do
          </p>
          <p className="text-sm text-text-secondary mt-1">
            Small daily actions for your wellbeing.
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-medium text-text-secondary">
            {completedCount}/{tasks.length || 0} done
          </p>
          <p className="text-xs font-bold text-primary-600">{completionPercent}% today</p>
        </div>
      </div>

      <form onSubmit={handleAdd} className="flex gap-2 text-sm">
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Add a gentle wellness task..."
          className="flex-1 rounded-xl bg-surface-50 px-4 py-2.5 border border-surface-200 text-text-primary focus:ring-2 focus:ring-primary-300 focus:border-transparent outline-none transition-all placeholder:text-text-light"
        />
        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary-500/20 hover:bg-primary-600 hover:shadow-primary-500/40 hover:-translate-y-0.5 transition-all disabled:opacity-60"
        >
          Add
        </button>
      </form>

      {error && <p className="text-xs text-coral-500 bg-coral-50 p-2 rounded-lg">{error}</p>}

      {loading ? (
        <p className="text-xs text-text-light animate-pulse">Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p className="text-xs text-text-light text-center py-4 bg-surface-50 rounded-xl border border-surface-100 border-dashed">
          No tasks yet. Try adding 2–3 small actions you want to show up for today.
        </p>
      ) : (
        <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
          {tasks.map((task) => (
            <motion.div
              key={task._id}
              layout
              className={`rounded-xl border px-3 py-3 flex items-center justify-between gap-3 transition-colors ${task.completed
                ? 'bg-primary-50 border-primary-100'
                : 'bg-white border-surface-200 hover:border-primary-200'
                }`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <button
                type="button"
                onClick={() => toggleTask(task._id)}
                className={`flex-1 text-left text-sm flex items-center gap-3 ${task.completed ? 'text-primary-700 line-through decoration-primary-300' : 'text-text-primary'
                  }`}
              >
                <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${task.completed ? 'bg-primary-500 border-primary-500 text-white' : 'border-surface-300 hover:border-primary-400'
                  }`}>
                  {task.completed && <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                </div>
                {task.title}
              </button>
              <button
                type="button"
                onClick={() => deleteTask(task._id)}
                className="text-xs text-text-light hover:text-coral-500 p-2 hover:bg-coral-50 rounded-lg transition-colors"
                aria-label="Delete task"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(WellnessTodoWidget);


