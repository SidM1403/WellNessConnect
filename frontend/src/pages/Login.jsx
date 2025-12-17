import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto glass p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <form className="space-y-3" onSubmit={submit}>
        <input
          placeholder="Email"
          className="w-full px-3 py-2 bg-slate-800 rounded"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          placeholder="Password"
          type="password"
          className="w-full px-3 py-2 bg-slate-800 rounded"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="w-full bg-accent text-slate-900 font-semibold py-2 rounded">Login</button>
      </form>
      <Link to="/signup" className="text-sm text-accent inline-block mt-3">
        Need an account? Sign up
      </Link>
    </div>
  );
};

export default Login;

