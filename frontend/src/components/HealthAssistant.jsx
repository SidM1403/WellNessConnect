import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiX, FiSend, FiMinimize2 } from 'react-icons/fi';
import api from '../api/api.js';

const HealthAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: "Hello! I'm your wellness guide. I can help with general fitness, nutrition, and sleep advice.",
        }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [chatId, setChatId] = useState(null);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMsg = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setLoading(true);

        try {
            const { data } = await api.post('/ai/chat', {
                message: userMsg,
                mode: 'health', // Default mode
                chatId
            });

            if (data.chatId) setChatId(data.chatId);

            setMessages(prev => [...prev, {
                role: 'assistant',
                content: data.message.content
            }]);
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "I'm having trouble connecting right now. Please try again later."
            }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[9999] font-sans">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-16 right-0 w-[350px] sm:w-[380px] bg-white rounded-2xl shadow-2xl border border-surface-200 overflow-hidden flex flex-col h-[500px] max-h-[80vh]"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-primary-600 to-primary-500 p-4 shrink-0 flex justify-between items-center text-white">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
                                    <FiMessageSquare className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm">Wellness Assistant</h3>
                                    <p className="text-[10px] opacity-90">AI-powered • Not medical advice</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                                aria-label="Close chat"
                            >
                                <FiMinimize2 className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Disclaimer */}
                        <div className="bg-amber-50 p-2 text-[10px] text-amber-800 text-center border-b border-amber-100 shrink-0">
                            ⚠️ General wellness info only. For emergencies, call 911.
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-surface-50 scrollbar-thin scrollbar-thumb-surface-300">
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${msg.role === 'user'
                                            ? 'bg-primary-600 text-white rounded-tr-none'
                                            : 'bg-white text-black border border-surface-200 rounded-tl-none'
                                            }`}
                                    >
                                        {msg.content}
                                    </div>
                                </motion.div>
                            ))}
                            {loading && (
                                <div className="flex justify-start">
                                    <div className="bg-white border border-surface-200 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1 items-center">
                                        <span className="w-1.5 h-1.5 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                        <span className="w-1.5 h-1.5 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                        <span className="w-1.5 h-1.5 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-surface-200 shrink-0">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask about health, fitness..."
                                    className="w-full bg-surface-50 border border-surface-200 rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-black placeholder:text-gray-400"
                                    disabled={loading}
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || loading}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:hover:bg-primary-600 transition-colors shadow-sm"
                                >
                                    <FiSend className="w-4 h-4" />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-colors ${isOpen
                    ? 'bg-surface-800 text-white rotate-90'
                    : 'bg-gradient-to-r from-primary-600 to-primary-500 text-white hover:shadow-xl hover:shadow-primary-500/20'
                    }`}
            >
                {isOpen ? <FiX className="w-6 h-6" /> : <FiMessageSquare className="w-6 h-6" />}
            </motion.button>
        </div>
    );
};

export default HealthAssistant;
