import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../api/api.js';
import AIMessageBubble from './AIMessageBubble.jsx';
import AIModeToggle from './AIModeToggle.jsx';
import TypingIndicator from './TypingIndicator.jsx';
import { FiSend } from 'react-icons/fi';

const AIChatWindow = () => {
  const [mode, setMode] = useState('fitness');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m your wellness assistant. How can I help you today?',
      createdAt: new Date().toISOString()
    }
  ]);
  const [chatId, setChatId] = useState(null);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [error, setError] = useState('');
  const [isConnected, setIsConnected] = useState(true);
  const listRef = useRef(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data } = await api.get('/ai/history');
        if (data.chats?.length) {
          const latest = data.chats[0];
          setChatId(latest._id);
          setMessages(latest.messages || []);
          setMode(latest.mode || 'fitness');
        }
      } catch {
        // history is optional; ignore error
      }
    };
    fetchHistory();
  }, []);

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, typing]);

  const sendMessage = async (e) => {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = {
      role: 'user',
      content: input,
      createdAt: new Date().toISOString()
    };

    // Add user message to the chat
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);
    setLoading(true);
    setError('');

    try {
      // Check if we have a connection to the backend
      if (!isConnected) {
        // If offline, simulate a response
        setTimeout(() => {
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: 'I\'m currently offline. Please check your internet connection and try again later.',
            createdAt: new Date().toISOString()
          }]);
          setTyping(false);
          setLoading(false);
        }, 1000);
        return;
      }

      // If online, try to send the message to the backend
      try {
        const { data } = await api.post('/ai/chat', {
          mode,
          message: userMsg.content,
          chatId
        });

        setChatId(data.chatId);
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.message?.content || 'I received your message but had trouble processing it.',
          createdAt: new Date().toISOString()
        }]);
      } catch (err) {
        console.error('Error sending message:', err);
        setError('Unable to reach the assistant. The service might be down.');
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setTyping(false);
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-dark-surface-100 rounded-3xl shadow-xl border border-surface-200 dark:border-dark-surface-200 p-4 sm:p-6 flex flex-col h-[600px] max-h-[75vh]">
      <div className="flex items-center justify-between gap-3 mb-6 border-b border-surface-100 dark:border-dark-surface-200 pb-4">
        <div>
          <p className="text-[11px] uppercase tracking-wider font-bold text-primary-600 mb-1">
            AI Wellness Companion
          </p>
          <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
            Gentle reflections. No diagnoses.
          </p>
        </div>
        <AIModeToggle mode={mode} onChange={setMode} />
      </div>

      {!isConnected && (
        <div className="bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 text-amber-700 dark:text-amber-200 text-sm p-3 rounded-xl mb-4 flex items-center gap-2">
          <span>⚠️</span> Note: You're in offline mode. Some features may be limited.
        </div>
      )}

      <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2 scrollbar-thin scrollbar-thumb-surface-300 scrollbar-track-transparent" ref={listRef}>
        {messages.map((message, index) => (
          <AIMessageBubble
            key={index}
            role={message.role}
            content={message.content}
            timestamp={message.createdAt}
          />
        ))}
        {typing && <TypingIndicator />}
      </div>

      {error && (
        <div className="text-red-500 text-sm mb-2 text-center bg-red-50 py-1 px-3 rounded-full mx-auto w-fit">
          {error}
        </div>
      )}

      <form onSubmit={sendMessage} className="flex gap-2 mt-auto pt-2">
        <div className="relative flex-1 group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="w-full bg-surface-50 dark:bg-dark-surface-200 border border-surface-200 dark:border-dark-surface-200 rounded-2xl px-5 py-3.5 pr-12 text-text-primary dark:text-dark-text-primary placeholder:text-text-light dark:placeholder:text-dark-text-light focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:focus:border-dark-primary-500 transition-all shadow-sm"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-primary-500 hover:text-primary-600 disabled:opacity-40 disabled:cursor-not-allowed p-2 transition-colors"
          >
            <FiSend className="w-5 h-5" />
          </button>
        </div>
      </form>

      <p className="text-[10px] text-text-light dark:text-dark-text-light mt-3 text-center">
        AI responses are for informational purposes only and not medical advice.
      </p>
    </div>
  );
};

export default AIChatWindow;


