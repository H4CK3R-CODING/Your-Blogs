import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import slugify from "slugify";
import { toast } from "react-toastify";

export default function EditPost() {
  const { slug } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [newSlug, setNewSlug] = useState(slug);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  
  useEffect(() => {
    if (!token) return navigate("/login");

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/posts/${slug}`)
      .then((res) => {
        setTitle(res.data.title);
        setContent(res.data.content);
      })
      .catch((err) => {
        console.error("Error loading post:", err);
        toast.error("Failed to load post details.");
      });
  }, [slug, navigate, token]);

  const handleUpdate = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/posts/${slug}`,
        {
          title,
          content,
          slug: newSlug,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("✅ Post updated successfully!");
      navigate(`/post/${newSlug}`);
    } catch (error) {
      console.error(" Update failed:", error.response?.data || error.message);
      toast.error("Failed to update the post.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow mt-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        ✏️ Edit Post
      </h2>

      <div className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setNewSlug(slugify(e.target.value, { lower: true, strict: true }));
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />

        <input
          value={newSlug}
          readOnly
          className="w-full px-4 py-2 border border-gray-200 bg-gray-100 text-sm rounded"
        />

        <ReactQuill
          value={content}
          onChange={setContent}
          className="bg-white"
        />

        <button
          onClick={handleUpdate}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded transition"
        >
          Update Post
        </button>
      </div>
    </div>
  );
}
