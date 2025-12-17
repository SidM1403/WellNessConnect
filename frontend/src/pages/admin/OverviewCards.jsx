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
  totalUsers: { bg: 'bg-blue-50', text: 'text-blue-600' },
  activeUsers: { bg: 'bg-emerald-50', text: 'text-emerald-600' },
  totalForumPosts: { bg: 'bg-purple-50', text: 'text-purple-600' },
  totalAiChats: { bg: 'bg-pink-50', text: 'text-pink-600' },
  averageBMI: { bg: 'bg-orange-50', text: 'text-orange-600' }
};

const OverviewCard = ({ label, value, type }) => {
  const Icon = iconMap[type] || Users;
  const colors = colorClasses[type] || colorClasses.totalUsers;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg ${colors.bg}`}>
          <Icon className={colors.text} size={20} />
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-3xl font-semibold text-gray-900">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </motion.div>
  );
};

export default OverviewCard;

