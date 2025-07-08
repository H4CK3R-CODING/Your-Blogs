import React, { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import axios from 'axios';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/posts`)
      .then(res => setPosts(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  
  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          📝 All Blog Posts
        </h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-500 italic">No posts available. Check back later!</p>
        ) : (
          <div className="space-y-4">
            {Array.isArray(posts) && posts.map(post => (
              <PostCard key={post._id} post={post} showActions={false} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
