import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaTrash, FaEdit, FaEye } from 'react-icons/fa';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loadingSlug, setLoadingSlug] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return navigate('/login');
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/user/posts`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err));
  }, [token, navigate]);

  const handleDelete = async (slug) => {
    setLoadingSlug(slug);
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/posts/${slug}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(posts.filter((post) => post.slug !== slug));
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingSlug('');
    }
  };

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          🛠️ Your Blog Dashboard
        </h2>

        {posts.length === 0 ? (
          <p className="text-center text-gray-500 italic">No posts found.</p>
        ) : (
          <div className="space-y-4">
            {Array.isArray(posts) &&
              posts.map((post) => (
                <div
                  key={post._id}
                  className="bg-white p-5 rounded shadow flex flex-col sm:flex-row justify-between items-start sm:items-center"
                >
                  <div className="flex-1 mb-3 sm:mb-0">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Slug: <span className="italic">{post.slug}</span>
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <Link
                      to={`/post/${post.slug}`}
                      className="text-blue-600 hover:text-blue-800"
                      title="View Post"
                    >
                      <FaEye size={18} />
                    </Link>
                    <Link
                      to={`/edit/${post.slug}`}
                      className="text-green-600 hover:text-green-800"
                      title="Edit Post"
                    >
                      <FaEdit size={18} />
                    </Link>
                    <button
                      onClick={() => handleDelete(post.slug)}
                      disabled={loadingSlug === post.slug}
                      title="Delete Post"
                      className={`text-red-600 hover:text-red-800 ${
                        loadingSlug === post.slug
                          ? 'opacity-50 cursor-not-allowed'
                          : ''
                      }`}
                    >
                      {loadingSlug === post.slug ? (
                        <span className="text-sm">Deleting...</span>
                      ) : (
                        <FaTrash size={18} />
                      )}
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default Dashboard;
