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
  totalUsers: { bg: 'bg-blue-50', text: 'text-blue-500', icon: 'text-blue-500' },
  activeUsers: { bg: 'bg-emerald-50', text: 'text-emerald-500', icon: 'text-emerald-500' },
  totalForumPosts: { bg: 'bg-purple-50', text: 'text-purple-500', icon: 'text-purple-500' },
  totalAiChats: { bg: 'bg-pink-50', text: 'text-pink-500', icon: 'text-pink-500' },
  averageBMI: { bg: 'bg-orange-50', text: 'text-orange-500', icon: 'text-orange-500' }
};

const OverviewCard = ({ label, value, type }) => {
  const Icon = iconMap[type] || Users;
  const colors = colorClasses[type] || colorClasses.totalUsers;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-premium p-6 hover:translate-y-[-2px] transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-2xl ${colors.bg}`}>
          <Icon className={colors.icon} size={22} />
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-3xl font-bold text-text-primary">{value}</p>
        <p className="text-sm font-medium text-text-secondary">{label}</p>
      </div>
    </motion.div>
  );
};

export default OverviewCard;
