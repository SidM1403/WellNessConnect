import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { motion } from 'framer-motion';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div
        className="w-full max-w-md bg-white/70 backdrop-blur-xl border border-white/50 p-8 rounded-[2rem] shadow-glass"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold font-display text-text-primary mb-2">Welcome Back</h2>
          <p className="text-text-secondary">Continue your wellness journey</p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-coral-50 border border-coral-200 text-coral-600 px-4 py-3 rounded-xl text-sm mb-6"
          >
            {error}
          </motion.div>
        )}

        <form className="space-y-5" onSubmit={submit}>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-text-secondary ml-1">Email</label>
            <input
              type="email"
              required
              className="w-full px-5 py-3 bg-surface-50 border border-surface-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none transition-all text-text-primary placeholder:text-text-light"
              placeholder="name@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-text-secondary ml-1">Password</label>
            <input
              type="password"
              required
              className="w-full px-5 py-3 bg-surface-50 border border-surface-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none transition-all text-text-primary placeholder:text-text-light"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <motion.button
            className="w-full btn-primary py-3.5 mt-2 flex justify-center items-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
          >
            {loading ? <span className="animate-pulse">Logging in...</span> : 'Login'}
          </motion.button>
        </form>

        <p className="mt-8 text-center text-sm text-text-secondary">
          Don't have an account?{' '}
          <Link to="/signup" className="font-semibold text-primary-600 hover:text-primary-500 transition-colors">
            Sign up free
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
