import SVGIllustration from './SVGIllustration.jsx';

const EmptyState = ({ title = 'Nothing here yet', message = 'Content will appear once available.' }) => (
  <div className="glass rounded-3xl p-4 sm:p-5 text-center space-y-2">
    <div className="flex justify-center">
      <SVGIllustration />
    </div>
    <p className="text-sm font-semibold text-slate-100">{title}</p>
    <p className="text-xs text-slate-400">{message}</p>
  </div>
);

export default EmptyState;

