// components/BlogModal.jsx
import { API_BASE_URL } from "../../api/api";

export default function BlogModal({ blog, onClose }) {
  if (!blog) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
      <div className="bg-white max-w-4xl w-full max-h-[90vh] rounded-xl border border-gray-200 shadow-2xl overflow-hidden relative">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-gray-500 hover:text-black w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-sm"
        >
          ✕
        </button>

        {/* Image */}
        <div className="w-full h-64 bg-gray-100 overflow-hidden">
          <img
            src={`${API_BASE_URL}${blog.image}`}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <div className="text-sm text-gray-500 mb-3">
            <span className="font-medium text-gray-700">{blog.authorName || "Chumbi Palace"}</span>
            <span className="mx-2">•</span>
            <span>{new Date(blog.createdAt).toDateString()}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-black mb-6">
            {blog.title}
          </h1>

          <div className="text-gray-700 leading-relaxed whitespace-pre-line border-t border-gray-100 pt-6">
            {blog.content}
          </div>
        </div>
      </div>
    </div>
  );
}