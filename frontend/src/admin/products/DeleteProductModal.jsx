import axios from "axios";
import { API_BASE_URL } from "../../config/api";

export default function DeleteProductModal({
  product,
  onClose,
  onDeleted,
}) {
  const token = localStorage.getItem("adminToken");

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${API_BASE_URL}/api/admin/products/${product._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onDeleted(); // refetch products
      onClose();
    } catch (error) {
      alert("Failed to delete product");
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-2xl p-6 border border-gray-200">

        {/* Header */}
        <div className="mb-6">
          <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-4 mx-auto">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-red-600" 
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
          </div>
          <h3 className="text-xl font-bold text-black text-center">
            Delete Product
          </h3>
        </div>

        {/* Warning */}
        <div className="mb-8">
          <p className="text-gray-700 mb-4 text-center">
            Are you sure you want to permanently delete
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
            <p className="font-semibold text-black text-center">
              {product.name}
            </p>
            <p className="text-sm text-gray-500 text-center mt-1">
              ID: {product._id.substring(0, 8)}...
            </p>
          </div>
          <p className="text-sm text-gray-600 text-center">
            This action <span className="font-semibold text-red-600">cannot be undone</span> and all product data will be lost.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-5 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="flex-1 px-5 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors shadow-sm hover:shadow"
          >
            Delete Product
          </button>
        </div>
      </div>
    </div>
  );
}