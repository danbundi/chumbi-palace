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
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/blogs`);
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
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/blogs/${id}`, {
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
        `${import.meta.env.VITE_API_URL}/api/blogs`,
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-black">Blog Management</h2>
          <p className="text-sm text-gray-500 mt-1">Create and manage blog posts</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-2.5 bg-pink-600 text-white font-medium rounded-lg hover:bg-pink-700 transition-colors flex items-center gap-2 shadow-sm hover:shadow"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 4v16m8-8H4" 
            />
          </svg>
          Add Blog Post
        </button>
      </div>

      {/* Blog List */}
      <div className="space-y-4">
        {blogs.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-gray-300 rounded-xl bg-gray-50">
            <div className="text-gray-400 mb-3">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-12 w-12 mx-auto" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1} 
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" 
                />
              </svg>
            </div>
            <p className="text-gray-500 font-medium">No blog posts yet</p>
            <p className="text-gray-400 text-sm mt-1">Create your first blog post to get started</p>
          </div>
        ) : (
          blogs.map(blog => (
            <div 
              key={blog._id} 
              className="flex flex-col md:flex-row gap-4 border border-gray-200 p-4 rounded-xl hover:border-gray-300 transition-colors bg-white"
            >
              <div className="md:w-32 flex-shrink-0">
                <div className="w-full h-40 md:h-28 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                  <img
                    src={`${import.meta.env.VITE_API_URL}${blog.image}`}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='3' width='18' height='18' rx='2' ry='2'%3E%3C/rect%3E%3Ccircle cx='8.5' cy='8.5' r='1.5'%3E%3C/circle%3E%3Cpolyline points='21 15 16 10 5 21'%3E%3C/polyline%3E%3C/svg%3E";
                    }}
                  />
                </div>
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-lg text-black">{blog.title}</h3>
                <div className="flex items-center gap-2 mt-2 mb-3">
                  <span className="text-sm text-gray-600 flex items-center gap-1">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                      />
                    </svg>
                    By {blog.author}
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-600 flex items-center gap-1">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                      />
                    </svg>
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-600 line-clamp-2 text-sm">
                  {blog.content}
                </p>
              </div>

              <div className="flex flex-row md:flex-col gap-2 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100">
                {/* <button className="px-4 py-2 text-sm font-medium text-pink-600 hover:text-pink-700 hover:bg-pink-50 rounded-lg transition-colors flex items-center gap-2">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" 
                    />
                  </svg>
                  Edit
                </button> */}
                <button
                  onClick={() => deleteBlog(blog._id)}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                    />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl p-6 border border-gray-200">
            
            {/* Header */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-black flex items-center gap-2">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 text-pink-600" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" 
                  />
                </svg>
                Create New Blog Post
              </h3>
              <p className="text-sm text-gray-500 mt-1">Share your thoughts and updates</p>
            </div>

            <form onSubmit={submitBlog} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blog Title
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter blog title"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent transition-all placeholder-gray-400"
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Author Name
                </label>
                <input
                  type="text"
                  name="author"
                  placeholder="Enter author name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent transition-all placeholder-gray-400"
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-l-md file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blog Content
                </label>
                <textarea
                  name="content"
                  rows="5"
                  placeholder="Write your blog content here..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent transition-all placeholder-gray-400 resize-y"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-8 py-3 bg-pink-600 text-white font-medium rounded-lg hover:bg-pink-700 transition-colors shadow-sm hover:shadow"
                >
                  Publish Blog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}