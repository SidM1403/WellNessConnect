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
        <div className="mr-2 mt-1 flex h-7 w-7 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-300 via-sky-300 to-violet-300 text-[13px] shadow-soft-xl">
          ☺
        </div>
      )}
      <div
        className={`max-w-[80%] rounded-3xl px-3 py-2 text-xs sm:text-sm ${
          isUser
            ? 'bg-emerald-400/80 text-emerald-950 rounded-br-sm'
            : 'glass text-slate-100 rounded-bl-sm'
        }`}
      >
        <p className="whitespace-pre-wrap">{content}</p>
        {timestamp && (
          <p className="mt-1 text-[10px] opacity-70 text-right">
            {new Date(timestamp).toLocaleTimeString()}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default AIMessageBubble;


