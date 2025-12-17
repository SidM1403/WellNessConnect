import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api.js';
import CommentSection from '../components/CommentSection.jsx';
import { Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

const PostDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data } = await api.get(`/posts/${id}`);
    setPost(data.post);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [id]);

  const addComment = async (text) => {
    await api.post(`/posts/${id}/comment`, { text });
    load();
  };

  if (loading || !post) return <p>Loading...</p>;

  return (
    <div className="space-y-3">
      <div className="glass p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{post.title}</h2>
          <button className="flex items-center gap-1" onClick={async () => { await api.patch(`/posts/${id}/like`); load(); }}>
            <Heart size={18} /> {post.likes}
          </button>
        </div>
        <p className="text-sm text-slate-300">by {post.author?.name}</p>
        <p className="mt-3 text-slate-200 whitespace-pre-wrap">{post.content}</p>
        <div className="flex gap-2 mt-3">
          {post.tags?.map((t) => (
            <span key={t} className="text-xs px-2 py-1 rounded-full bg-slate-800 text-accent">
              {t}
            </span>
          ))}
        </div>
      </div>
      <CommentSection comments={post.comments || []} onAdd={user ? addComment : null} />
    </div>
  );
};

export default PostDetail;

