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

// New Light Theme Palette
const COLORS = ['#10b981', '#ef4444', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'];
// Lighter, more pastel/vibrant colors for the light theme charts
const CHART_COLORS = ['#6366f1', '#10b981', '#f43f5e', '#8b5cf6', '#f59e0b', '#06b6d4'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-dark-surface-100 p-3 border border-surface-200 dark:border-dark-surface-200 shadow-xl rounded-xl">
        <p className="text-sm font-bold text-text-primary dark:text-dark-text-primary">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-xs font-medium" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const UserActivityChart = ({ data = [] }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="card-premium p-6"
  >
    <h3 className="text-lg font-bold text-text-primary dark:text-dark-text-primary mb-4">Daily Active Users</h3>
    {data.length === 0 ? (
      <div className="h-[300px] flex items-center justify-center text-text-light dark:text-dark-text-light text-sm italic">No activity data available</div>
    ) : (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis
            dataKey="date"
            stroke="#94a3b8"
            tick={{ fill: '#64748b', fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#94a3b8"
            tick={{ fill: '#64748b', fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }} />
          <Line
            type="monotone"
            dataKey="users"
            name="Users"
            stroke="#6366f1"
            strokeWidth={3}
            dot={{ fill: '#6366f1', r: 4, strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    )}
  </motion.div>
);

export const RegistrationsChart = ({ data = [] }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 }}
    className="card-premium p-6"
  >
    <h3 className="text-lg font-bold text-text-primary dark:text-dark-text-primary mb-4">New Registrations</h3>
    {data.length === 0 ? (
      <div className="h-[300px] flex items-center justify-center text-text-light dark:text-dark-text-light text-sm italic">No registration data available</div>
    ) : (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis
            dataKey="date"
            stroke="#94a3b8"
            tick={{ fill: '#64748b', fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#94a3b8"
            tick={{ fill: '#64748b', fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f1f5f9' }} />
          <Bar dataKey="registrations" name="New Members" fill="#3b82f6" radius={[6, 6, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    )}
  </motion.div>
);

export const BMICategoriesChart = ({ data = [] }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
    className="card-premium p-6"
  >
    <h3 className="text-lg font-bold text-text-primary dark:text-dark-text-primary mb-4">BMI Categories Distribution</h3>
    {data.length === 0 ? (
      <div className="h-[300px] flex items-center justify-center text-text-light dark:text-dark-text-light text-sm italic">No BMI data available</div>
    ) : (
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={100}
            innerRadius={60}
            paddingAngle={5}
            label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} strokeWidth={0} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            formatter={(value) => <span className="text-text-secondary text-xs font-medium ml-1">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    )}
  </motion.div>
);

export const UserStatusChart = ({ data = [] }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3 }}
    className="card-premium p-6"
  >
    <h3 className="text-lg font-bold text-text-primary dark:text-dark-text-primary mb-4">Active vs Inactive Users</h3>
    {data.length === 0 ? (
      <div className="h-[300px] flex items-center justify-center text-text-light dark:text-dark-text-light text-sm italic">No user status data available</div>
    ) : (
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ name, count, percent }) => `${name}: ${count}`}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={index === 0 ? '#10b981' : '#cbd5e1'}
                strokeWidth={2}
                stroke="#fff"
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="bottom" height={36} iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    )}
  </motion.div>
);

export const ForumPostsChart = ({ data = [] }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4 }}
    className="card-premium p-6"
  >
    <h3 className="text-lg font-bold text-text-primary dark:text-dark-text-primary mb-4">Forum Posts Over Time</h3>
    {data.length === 0 ? (
      <div className="h-[300px] flex items-center justify-center text-text-light dark:text-dark-text-light text-sm italic">No forum data available</div>
    ) : (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis
            dataKey="date"
            stroke="#94a3b8"
            tick={{ fill: '#64748b', fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#94a3b8"
            tick={{ fill: '#64748b', fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }} />
          <Line
            type="monotone"
            dataKey="posts"
            name="Posts"
            stroke="#8b5cf6"
            strokeWidth={3}
            dot={{ fill: '#8b5cf6', r: 4, strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    )}
  </motion.div>
);
