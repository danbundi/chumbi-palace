import { useEffect, useState } from "react";
import axios from "axios";
import BlogModal from "../components/Blogs/BlogModal";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeBlog, setActiveBlog] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${api}/api/blogs`);
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-black mb-4">
            Chumbi Palace Journal
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stories, wellness insights, and product knowledge from our kitchen to yours.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map(blog => (
            <article
              key={blog._id}
              onClick={() => setActiveBlog(blog)}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-gray-300 transition-all cursor-pointer"
            >

              {/* Image */}
              <div className="h-48 bg-gray-100 overflow-hidden">
                <img
                  src={`/api${blog.image}`}
                  alt={blog.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="text-sm text-gray-500 mb-2">
                  <span className="font-medium text-gray-700">{blog.authorName || "Chumbi Palace"}</span>
                  <span className="mx-2">•</span>
                  <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                </div>

                <h2 className="text-lg font-bold text-black mb-3 line-clamp-2">
                  {blog.title}
                </h2>

                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {blog.content}
                </p>

                <div className="text-pink-600 text-sm font-medium flex items-center">
                  Read more
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 ml-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M14 5l7 7m0 0l-7 7m7-7H3" 
                    />
                  </svg>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {blogs.length === 0 && (
          <div className="text-center py-12">
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
            <p className="text-gray-500 font-medium">No blogs published yet</p>
            <p className="text-gray-400 text-sm mt-1">Check back later for new stories</p>
          </div>
        )}
      </div>

      {activeBlog && (
        <BlogModal
          blog={activeBlog}
          onClose={() => setActiveBlog(null)}
        />
      )}
    </div>
  );
}