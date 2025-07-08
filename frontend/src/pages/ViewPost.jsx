import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

export default function ViewPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/posts/${slug}`)
      .then((res) => setPost(res.data))
      .catch((err) => console.error('Failed to load post:', err))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="text-center text-gray-600 py-8 text-lg">
        Loading post...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center text-red-500 py-8">
        Post not found or an error occurred.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow mt-6">
      {/* 🔹 SEO Meta Tags */}
      <Helmet>
        <title>{post.title} - My Blog</title>
        <meta name="description" content={post.content?.slice(0, 150).replace(/<[^>]+>/g, '') + '...'} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.content?.slice(0, 150).replace(/<[^>]+>/g, '') + '...'} />
        <meta property="og:url" content={`${window.location.href}`} />
        {/* Optional: If you store cover images */}
        {/* <meta property="og:image" content={post.coverImageUrl} /> */}
      </Helmet>

      <h1 className="text-3xl font-bold text-gray-800 mb-6">{post.title}</h1>
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
}
