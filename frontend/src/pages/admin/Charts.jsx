import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const COLORS = ['#10b981', '#ef4444', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'];
const DARK_COLORS = ['#34d399', '#f87171', '#60a5fa', '#a78bfa', '#f472b6', '#fbbf24'];

export const UserActivityChart = ({ data = [] }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-slate-700/50 p-6"
  >
    <h3 className="text-lg font-semibold text-slate-100 mb-4">Daily Active Users</h3>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
        <XAxis 
          dataKey="date" 
          stroke="#94a3b8"
          tick={{ fill: '#94a3b8', fontSize: 12 }}
        />
        <YAxis 
          stroke="#94a3b8"
          tick={{ fill: '#94a3b8', fontSize: 12 }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1e293b',
            border: '1px solid #475569',
            borderRadius: '8px',
            color: '#f1f5f9'
          }}
        />
        <Line
          type="monotone"
          dataKey="users"
          stroke="#34d399"
          strokeWidth={2}
          dot={{ fill: '#34d399', r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </motion.div>
);

export const RegistrationsChart = ({ data = [] }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 }}
    className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-slate-700/50 p-6"
  >
    <h3 className="text-lg font-semibold text-slate-100 mb-4">New Registrations</h3>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
        <XAxis 
          dataKey="date" 
          stroke="#94a3b8"
          tick={{ fill: '#94a3b8', fontSize: 12 }}
        />
        <YAxis 
          stroke="#94a3b8"
          tick={{ fill: '#94a3b8', fontSize: 12 }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1e293b',
            border: '1px solid #475569',
            borderRadius: '8px',
            color: '#f1f5f9'
          }}
        />
        <Bar dataKey="registrations" fill="#3b82f6" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </motion.div>
);

export const BMICategoriesChart = ({ data = [] }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
    className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-slate-700/50 p-6"
  >
    <h3 className="text-lg font-semibold text-slate-100 mb-4">BMI Categories Distribution</h3>
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="count"
          nameKey="category"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={DARK_COLORS[index % DARK_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: '#1e293b',
            border: '1px solid #475569',
            borderRadius: '8px',
            color: '#f1f5f9'
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  </motion.div>
);

export const UserStatusChart = ({ data = [] }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3 }}
    className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-slate-700/50 p-6"
  >
    <h3 className="text-lg font-semibold text-slate-100 mb-4">Active vs Inactive Users</h3>
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label={({ name, count, percent }) => `${name}: ${count} (${(percent * 100).toFixed(0)}%)`}
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={index === 0 ? DARK_COLORS[0] : DARK_COLORS[1]} 
            />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: '#1e293b',
            border: '1px solid #475569',
            borderRadius: '8px',
            color: '#f1f5f9'
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  </motion.div>
);

export const ForumPostsChart = ({ data = [] }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4 }}
    className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-slate-700/50 p-6"
  >
    <h3 className="text-lg font-semibold text-slate-100 mb-4">Forum Posts Over Time</h3>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
        <XAxis 
          dataKey="date" 
          stroke="#94a3b8"
          tick={{ fill: '#94a3b8', fontSize: 12 }}
        />
        <YAxis 
          stroke="#94a3b8"
          tick={{ fill: '#94a3b8', fontSize: 12 }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1e293b',
            border: '1px solid #475569',
            borderRadius: '8px',
            color: '#f1f5f9'
          }}
        />
        <Line
          type="monotone"
          dataKey="posts"
          stroke="#8b5cf6"
          strokeWidth={2}
          dot={{ fill: '#8b5cf6', r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </motion.div>
);

