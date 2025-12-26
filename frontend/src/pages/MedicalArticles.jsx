import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaBookMedical, FaStethoscope, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';
import api from '../api/api';
import LoadingSkeleton from '../components/LoadingSkeleton.jsx';
import GlitchText from '../components/GlitchText.jsx';

const MedicalArticles = () => {
  const [query, setQuery] = useState('');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const searchArticles = async (e) => {
    e?.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setHasSearched(true);
    try {
      // Append context to query if not present to improve relevance
      const searchQuery = query.toLowerCase().includes('medical') || query.toLowerCase().includes('health')
        ? query
        : `${query} medical health article`;

      const { data } = await api.get(`/articles/search?q=${searchQuery}`);
      // Ensure we map 'link' to the UI; backend returns 'link', not 'url'
      // Normalizing data here just in case
      const validArticles = (data.articles || []).map(a => ({
        ...a,
        url: a.link || a.url // fallback
      }));
      setArticles(validArticles);
    } catch (err) {
      console.error('Failed to search articles', err);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setArticles([]);
    setHasSearched(false);
  };

  return (
    <div className="pt-28 pb-16 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header & Search */}
        <div className="text-center space-y-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-100 dark:bg-dark-surface-200 text-primary-600 dark:text-dark-primary-600 text-sm font-semibold tracking-wide uppercase"
          >
            <FaBookMedical />
            <span>Verified Medical Resources</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <GlitchText
              enableOnHover={true}
              speed={1.5}
              className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white inline-block glitch-ghost"
            >
              Find reliable{' '}
            </GlitchText>
            <GlitchText
              enableOnHover={true}
              speed={1.5}
              className="text-4xl md:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-primary inline-block"
            >
              health information
            </GlitchText>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto relative z-20"
          >
            <form onSubmit={searchArticles} className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <FaSearch className="text-text-light group-focus-within:text-primary-500 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search articles (e.g., 'Anxiety Relief', 'Sleep Hygiene')..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-5 rounded-2xl bg-white dark:bg-dark-surface-100 border border-surface-200 dark:border-dark-surface-200 shadow-card focus:shadow-soft-xl focus:border-primary-300 dark:focus:border-dark-primary-300 focus:outline-none focus:ring-4 focus:ring-primary-50 dark:focus:ring-dark-primary-100 text-lg transition-all text-gray-900 dark:text-dark-text-primary placeholder:text-gray-400 dark:placeholder:text-dark-text-light"
              />
              {query && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-4 flex items-center text-text-light dark:text-dark-text-light hover:text-text-secondary dark:hover:text-dark-text-secondary transition-colors"
                >
                  <FaTimes />
                </button>
              )}
            </form>
          </motion.div>
        </div>

        {/* Results Area */}
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2">
            <LoadingSkeleton height="h-64" />
            <LoadingSkeleton height="h-64" />
          </div>
        ) : (
          <div className="space-y-12">
            {!hasSearched ? (
              /* Empty State / Suggestions */
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid gap-6 md:grid-cols-3"
              >
                {[
                  { title: "Mental Wellness", count: "120+ Articles", color: "bg-primary-50 text-primary-600" },
                  { title: "Physical Health", count: "85+ Articles", color: "bg-accent-50 text-accent-600" },
                  { title: "Sleep Science", count: "40+ Articles", color: "bg-secondary-50 text-secondary-600" }
                ].map((cat, i) => (
                  <div key={i} onClick={() => { setQuery(cat.title); searchArticles(); }} className="cursor-pointer group p-6 rounded-3xl bg-white dark:bg-dark-surface-100 border border-surface-200 dark:border-dark-surface-200 hover:border-primary-200 dark:hover:border-dark-primary-200 hover:shadow-soft transition-all text-center">
                    <div className={`w-16 h-16 mx-auto rounded-full ${cat.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                      <FaStethoscope />
                    </div>
                    <h3 className="font-bold text-text-primary dark:text-dark-text-primary text-lg">{cat.title}</h3>
                    <p className="text-text-light dark:text-dark-text-light text-sm mt-1">{cat.count}</p>
                  </div>
                ))}
              </motion.div>
            ) : (
              <>
                {articles.length > 0 ? (
                  <div className="grid gap-6 md:grid-cols-2">
                    {articles.map((article, index) => (
                      <motion.a
                        key={article.id || index}
                        href={article.url || article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="block bg-white dark:bg-dark-surface-100 rounded-3xl p-6 border border-surface-200 dark:border-dark-surface-200 shadow-sm hover:shadow-card hover:-translate-y-1 transition-all group flex flex-col justify-between h-full"
                      >
                        <div>
                          <div className="flex items-start justify-between mb-4">
                            <span className="px-3 py-1 rounded-full bg-surface-100 dark:bg-dark-surface-200 text-xs font-semibold text-text-secondary dark:text-dark-text-secondary">Medical Article</span>
                            <span className="p-2 rounded-full bg-surface-50 text-text-light group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                              <FaExternalLinkAlt className="w-3.5 h-3.5" />
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-text-primary dark:text-dark-text-primary mb-3 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-dark-primary-600 transition-colors">{article.title}</h3>
                          <p className="text-text-secondary dark:text-dark-text-secondary text-sm leading-relaxed line-clamp-3 mb-6">
                            {article.description || article.snippet || article.content?.substring(0, 150) + "..."}
                          </p>
                        </div>
                        <div className="pt-4 border-t border-surface-100 dark:border-dark-surface-200 flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-surface-200 flex items-center justify-center text-[10px] text-text-secondary font-bold uppercase">
                            {article.source?.[0] || 'W'}
                          </div>
                          <span className="text-xs font-medium text-text-light dark:text-dark-text-light">{article.source || 'Verified Source'}</span>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-surface-50 dark:bg-dark-surface-100 rounded-3xl border border-surface-100 dark:border-dark-surface-200">
                    <p className="text-text-secondary dark:text-dark-text-secondary text-lg">No articles found matching "{query}".</p>
                    <p className="text-text-light dark:text-dark-text-light text-sm mt-2">Try searching for broader terms like "Stress" or "Yoga".</p>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Disclaimer - Floating Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 border border-amber-100 dark:border-amber-700 rounded-2xl p-6 text-center max-w-3xl mx-auto"
        >
          <p className="text-sm text-amber-800/80 dark:text-amber-200/80 font-medium">
            Disclaimer: Content on WellConnect is for informational purposes only and does not constitute medical advice. Always consult a professional for medical concerns.
          </p>
        </motion.div>

      </div>
    </div >
  );
};

export default MedicalArticles;

