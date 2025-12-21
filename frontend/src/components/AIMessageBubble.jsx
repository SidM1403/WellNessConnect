import { motion } from 'framer-motion';

const AIMessageBubble = ({ role, content, timestamp }) => {
  const isUser = role === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && (
        <div className="mr-2 mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-primary-600 shadow-sm border border-primary-200">
          <span className="text-sm">🤖</span>
        </div>
      )}
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm ${isUser
          ? 'bg-gradient-to-br from-primary-600 to-indigo-600 text-white rounded-br-sm'
          : 'bg-surface-50 border border-surface-100 text-text-primary rounded-bl-sm'
          }`}
      >
        <p className="whitespace-pre-wrap leading-relaxed">{content}</p>
        {timestamp && (
          <p className={`mt-1 text-[10px] text-right ${isUser ? 'text-indigo-100/80' : 'text-text-light'}`}>
            {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default AIMessageBubble;


