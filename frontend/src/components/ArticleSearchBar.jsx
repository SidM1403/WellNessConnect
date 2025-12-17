import { FiSearch, FiLoader } from 'react-icons/fi';

const ArticleSearchBar = ({ value, onChange, onSubmit, loading }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center"
    >
      <div className="relative flex-1">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search medical or wellness articles..."
          className="w-full rounded-xl bg-slate-900/60 border border-white/10 px-10 py-3 text-sm sm:text-base text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
          disabled={loading}
        />
      </div>
      <button
        type="submit"
        disabled={!value.trim() || loading}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 via-sky-300 to-teal-300 px-4 py-3 text-sm font-semibold text-slate-950 shadow-soft-xl transition hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? <FiLoader className="h-4 w-4 animate-spin" /> : <FiSearch className="h-4 w-4" />}
        <span>{loading ? 'Searching...' : 'Search'}</span>
      </button>
    </form>
  );
};

export default ArticleSearchBar;

