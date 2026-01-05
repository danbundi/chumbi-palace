import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminBlogs() {
  const token = localStorage.getItem("adminToken");

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    title: "",
    author: "",
    content: "",
    image: null,
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/blogs");
      setBlogs(res.data);
    } catch (err) {
      console.error("Failed to fetch blogs", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (id) => {
    if (!window.confirm("Delete this blog permanently?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBlogs(prev => prev.filter(b => b._id !== id));
    } catch {
      alert("Failed to delete blog");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const submitBlog = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", form.title);
    data.append("authorName", form.author);
    data.append("content", form.content);
    data.append("image", form.image);

    try {
      console.log("Submitting blog:", form);
      console.log(token)
      const res = await axios.post(
        "http://localhost:5000/api/blogs",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setBlogs(prev => [res.data, ...prev]);
      setShowModal(false);
      setForm({ title: "", authorName: "", content: "", image: null });
    } catch {
      alert("Failed to create blog");
    }
  };

  if (loading) return <div>Loading blogs...</div>;

  return (
    <div className="bg-white p-6 rounded-xl shadow relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Blogs</h2>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          + Add Blog
        </button>
      </div>

      {/* Blog List */}
      <div className="space-y-4">
        {blogs.map(blog => (
          <div key={blog._id} className="flex gap-4 border p-4 rounded-lg">
            <img
              src={`http://localhost:5000${blog.image}`}
              className="w-28 h-20 object-cover rounded"
            />

            <div className="flex-1">
              <h3 className="font-semibold">{blog.title}</h3>
              <p className="text-sm text-gray-500">
                By {blog.author} •{" "}
                {new Date(blog.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600 line-clamp-2">
                {blog.content}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <button className="text-blue-600 text-sm">Edit</button>
              <button
                onClick={() => deleteBlog(blog._id)}
                className="text-red-600 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <form
            onSubmit={submitBlog}
            className="bg-white p-6 rounded-xl w-full max-w-lg space-y-4"
          >
            <h3 className="text-xl font-semibold">Add Blog</h3>

            <input
              type="text"
              name="title"
              placeholder="Blog title"
              className="w-full border p-2 rounded"
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="author"
              placeholder="Author name"
              className="w-full border p-2 rounded"
              onChange={handleChange}
              required
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />

            <textarea
              name="content"
              rows="5"
              placeholder="Blog content..."
              className="w-full border p-2 rounded"
              onChange={handleChange}
              required
            />

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-4 py-2 bg-black text-white rounded"
              >
                Publish
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
