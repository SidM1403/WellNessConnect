import { useState } from 'react';
import PageHeader from '../components/PageHeader.jsx';
import EmptyState from '../components/EmptyState.jsx';
import SkeletonLoader from '../components/SkeletonLoader.jsx';

const Journal = () => {
  const [loading] = useState(false);
  const [entries] = useState([]); // TODO: connect to /api/journal when available

  return (
    <div className="space-y-6">
      <PageHeader
        title="Journal"
        subtitle="Your private reflections. Connect this to your secure journal API."
      />
      {loading ? (
        <SkeletonLoader lines={4} />
      ) : entries.length ? (
        <div className="space-y-3">
          {entries.map((e) => (
            <div key={e._id} className="glass rounded-2xl p-4">
              <p className="text-sm text-slate-100">{e.content}</p>
              <p className="text-[11px] text-slate-400 mt-1">{e.createdAt}</p>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No entries yet"
          message="POST your entries once the journal endpoint is live."
        />
      )}
    </div>
  );
};

export default Journal;

