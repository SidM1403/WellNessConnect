import { motion } from 'framer-motion';
import { Users, Activity, MessageSquare, Bot, TrendingUp } from 'lucide-react';

const iconMap = {
  totalUsers: Users,
  activeUsers: Activity,
  totalForumPosts: MessageSquare,
  totalAiChats: Bot,
  averageBMI: TrendingUp
};

const colorClasses = {
  totalUsers: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30' },
  activeUsers: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  totalForumPosts: { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/30' },
  totalAiChats: { bg: 'bg-pink-500/20', text: 'text-pink-400', border: 'border-pink-500/30' },
  averageBMI: { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/30' }
};

const OverviewCard = ({ label, value, type }) => {
  const Icon = iconMap[type] || Users;
  const colors = colorClasses[type] || colorClasses.totalUsers;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-slate-800/50 backdrop-blur-lg rounded-xl border ${colors.border} p-6 hover:bg-slate-800/70 transition-all`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg ${colors.bg}`}>
          <Icon className={colors.text} size={20} />
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-3xl font-semibold text-slate-100">{value}</p>
        <p className="text-sm text-slate-400">{label}</p>
      </div>
    </motion.div>
  );
};

export default OverviewCard;

