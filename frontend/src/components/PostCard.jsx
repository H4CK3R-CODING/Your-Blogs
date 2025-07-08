import { Link } from "react-router-dom";

const PostCard = ({ post, showActions, handleDelete, loadingSlug }) => {
  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h3 className="text-xl font-semibold mb-1">{post.title}</h3>
      <p className="text-sm text-gray-500 mb-2">By: {post.author?.username}</p>
      <Link to={`/post/${post.slug}`} className="text-blue-600 hover:underline">Read More</Link>
      {showActions && (
        <div className="mt-2 flex gap-4">
          <Link to={`/edit/${post.slug}`} className="text-green-600 hover:underline">Edit</Link>
          <button
            onClick={() => handleDelete(post.slug)}
            className={`text-red-600 hover:underline ${loadingSlug === post.slug ? 'opacity-50 pointer-events-none' : ''}`}
          >
            {loadingSlug === post.slug ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      )}
    </div>
  );
};

export default PostCard