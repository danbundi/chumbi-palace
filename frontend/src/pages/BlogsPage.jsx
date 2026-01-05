import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../api/api";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/blogs`);
        setBlogs(res.data);
      } catch (err) {
        console.error("Failed to fetch blogs", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading blogs…
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-amber-50 to-white min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold text-amber-900 font-display">
            Chumbi Palace Journal
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Stories, wellness insights, and product knowledge from our kitchen to yours.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map(blog => (
            <article
              key={blog._id}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              {/* Image */}
              <div className="h-56 overflow-hidden">
                <img
                  src={`${API_BASE_URL}${blog.image}`}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col h-full">
                <div className="mb-3 text-sm text-emerald-700 font-medium">
                  {blog.author || "Chumbi Palace"} •{" "}
                  {new Date(blog.createdAt).toLocaleDateString()}
                </div>

                <h2 className="text-xl font-bold text-amber-900 mb-3 group-hover:text-amber-700 transition-colors">
                  {blog.title}
                </h2>

                <p className="text-gray-600 line-clamp-3 mb-6">
                  {blog.content}
                </p>

                <div className="mt-auto">
                  <span className="inline-flex items-center text-emerald-700 font-semibold group-hover:underline">
                    Read more →
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {blogs.length === 0 && (
          <div className="text-center text-gray-500 mt-20">
            No blogs published yet.
          </div>
        )}
      </div>
    </div>
  );
}
