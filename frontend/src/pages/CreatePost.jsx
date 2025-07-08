import { useEffect, useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import slugify from "slugify";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [slug, setSlug] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  const handleCreate = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/posts/create`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Post created successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error(
        "Error creating post:",
        error.response?.data || error.message
      );
      toast.error("Failed to create post. Please try again.");
    }
  };

  const generateSlug = (title) => {
    const s = slugify(title, { lower: true, strict: true });
    setSlug(s);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow mt-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        ✍️ Create New Post
      </h2>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            generateSlug(e.target.value);
          }}
          className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <input
          type="text"
          value={slug}
          readOnly
          className="w-full border border-gray-200 bg-gray-100 px-4 py-2 rounded text-sm"
        />

        <ReactQuill
          value={content}
          onChange={setContent}
          className="bg-white"
        />

        <button
          onClick={handleCreate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
        >
          Create Post
        </button>
      </div>
    </div>
  );
}
