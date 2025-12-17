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
    <div className="glass rounded-3xl p-4 sm:p-5 flex flex-col h-[520px] max-h-[70vh]">
      <div className="flex items-center justify-between gap-3 mb-3">
        <div>
          <p className="text-[11px] uppercase tracking-wide text-emerald-200/80">
            AI wellness companion
          </p>
          <p className="text-xs text-slate-300">
            Gentle fitness and health-check reflections. No diagnoses, ever.
          </p>
        </div>
        <AIModeToggle mode={mode} onChange={setMode} />
      </div>
      
      {!isConnected && (
        <div className="bg-yellow-500/20 border border-yellow-500/50 text-yellow-100 text-sm p-3 rounded-lg mb-4">
          Note: You're in offline mode. Some features may be limited.
        </div>
      )}
      
      <div className="flex-1 overflow-y-auto mb-4 space-y-4" ref={listRef}>
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
        <div className="text-red-400 text-sm mb-2 text-center">
          {error}
        </div>
      )}
      
      <form onSubmit={sendMessage} className="flex gap-2 mt-auto">
        <div className="relative flex-1">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 pr-12 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-300 disabled:opacity-50 disabled:cursor-not-allowed p-2"
          >
            <FiSend className="w-5 h-5" />
          </button>
        </div>
      </form>
      
      <p className="text-xs text-slate-400 mt-2 text-center">
        AI responses are for informational purposes only and not medical advice.
      </p>
    </div>
  );
};

export default AIChatWindow;


