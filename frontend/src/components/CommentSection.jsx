import { useState } from 'react';
import LoadingSkeleton from './LoadingSkeleton.jsx';

const CommentSection = ({ comments = [], onAdd, loading }) => {
  const [text, setText] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await onAdd(text);
    setText('');
  };

  return (
    <div className="glass p-4 rounded-lg mt-4">
      <h4 className="font-semibold mb-2">Comments</h4>
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <div className="space-y-3">
          {comments.map((c, idx) => (
            <div key={idx} className="text-sm">
              <p className="font-semibold">{c.user?.name || 'Member'}</p>
              <p className="text-slate-300">{c.text}</p>
            </div>
          ))}
          {!comments.length && <p className="text-slate-400 text-sm">No comments yet.</p>}
        </div>
      )}
      {onAdd && (
        <form onSubmit={submit} className="mt-3 flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a comment"
            className="flex-1 px-3 py-2 rounded bg-slate-800 border border-slate-700"
          />
          <button type="submit" className="px-3 py-2 rounded bg-accent text-slate-900 font-semibold">
            Post
          </button>
        </form>
      )}
    </div>
  );
};

export default CommentSection;

