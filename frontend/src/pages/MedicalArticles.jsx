import { useState } from 'react';
import { motion } from 'framer-motion';
import api from '../api/api.js';
import ArticleSearchBar from '../components/ArticleSearchBar.jsx';
import ArticleList from '../components/ArticleList.jsx';
import ArticleEmptyState from '../components/ArticleEmptyState.jsx';

const MedicalArticles = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e?.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    setSearched(true);

    try {
      const { data } = await api.get('/articles/search', {
        params: { q: query.trim() }
      });
      setResults(data.articles || []);
    } catch (err) {
      console.error('Article search failed', err);
      const message = err.response?.data?.message || 'Unable to fetch articles right now.';
      setError(message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-3xl p-5 sm:p-6 space-y-3"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-wide text-emerald-200/80">Medical Articles Search</p>
            <h1 className="text-xl sm:text-2xl font-semibold text-slate-50">Discover trusted health resources</h1>
            <p className="mt-1 text-sm text-slate-200/90">
              Search the web for credible medical and wellness articles. We only redirect you to the original sources and never store article content.
            </p>
          </div>
          <div className="hidden sm:block rounded-full border border-white/10 px-3 py-2 text-[11px] text-emerald-100 bg-emerald-300/10">
            Safe search on
          </div>
        </div>

        <ArticleSearchBar
          value={query}
          onChange={setQuery}
          onSubmit={handleSearch}
          loading={loading}
        />

        <div className="rounded-xl border border-white/5 bg-slate-900/60 p-4 text-xs text-slate-300">
          <p className="font-semibold text-slate-100">Disclaimer</p>
          <p className="mt-1">
            This feature only redirects to external medical resources. This platform does not provide medical advice or diagnosis.
            Please consult licensed professionals for personal medical concerns.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-3xl p-5 sm:p-6 space-y-4"
      >
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-wide text-emerald-200/80">Results</p>
            <h2 className="text-lg font-semibold text-slate-50">
              {results.length ? `${results.length} article${results.length > 1 ? 's' : ''} found` : 'Browse health insights'}
            </h2>
          </div>
          {loading && <span className="text-xs text-emerald-200 animate-pulse">Fetching articles...</span>}
        </div>

        {error && (
          <div className="rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-100">
            {error}
          </div>
        )}

        {!loading && results.length > 0 && <ArticleList results={results} />}

        {!loading && !results.length && searched && (
          <ArticleEmptyState message="No articles matched that search. Try a more specific health topic." />
        )}

        {!loading && !searched && (
          <ArticleEmptyState message="Start by searching for symptoms, conditions, healthy habits, or wellness topics." />
        )}
      </motion.div>
    </div>
  );
};

export default MedicalArticles;

