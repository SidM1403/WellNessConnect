const SkeletonLoader = ({ lines = 3 }) => (
  <div className="animate-pulse space-y-2">
    {Array.from({ length: lines }).map((_, i) => (
      <div key={i} className="h-3 rounded-full bg-slate-800/70"></div>
    ))}
  </div>
);

export default SkeletonLoader;

