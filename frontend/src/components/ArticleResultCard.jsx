import { FiExternalLink } from 'react-icons/fi';

const ArticleResultCard = ({ title, snippet, source, link }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block group rounded-2xl border border-white/5 bg-slate-900/60 p-4 transition transform hover:-translate-y-1 hover:border-emerald-300/40 hover:bg-slate-900/80"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-wide text-emerald-200/80">{source || 'External source'}</p>
          <h3 className="mt-1 text-base sm:text-lg font-semibold text-slate-50 group-hover:text-emerald-100">
            {title}
          </h3>
        </div>
        <span className="rounded-full bg-emerald-300/15 p-2 text-emerald-200 group-hover:bg-emerald-300/25">
          <FiExternalLink className="h-4 w-4" />
        </span>
      </div>
      <p className="mt-2 text-sm text-slate-300/90 leading-relaxed">{snippet}</p>
      <p className="mt-2 text-xs text-emerald-200/80 break-all">{link}</p>
    </a>
  );
};

export default ArticleResultCard;

