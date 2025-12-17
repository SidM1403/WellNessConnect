import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api.js';
import PostCard from '../components/PostCard.jsx';

const Profile = () => {
  const { id } = useParams();
  const [data, setData] = useState({ user: null, posts: [] });

  const load = async () => {
    const { data } = await api.get(`/users/${id}`);
    setData(data);
  };

  useEffect(() => {
    load();
  }, [id]);

  return (
    <div className="space-y-3">
      <div className="glass p-4 rounded-lg">
        <h2 className="text-2xl font-bold">{data.user?.name}</h2>
        <p className="text-slate-300">{data.user?.bio || 'No bio yet.'}</p>
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold">Posts</h3>
        {data.posts.map((p) => (
          <PostCard key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
};

export default Profile;

