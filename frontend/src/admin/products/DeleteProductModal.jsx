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
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl shadow-2xl p-6">

        {/* Header */}
        <h3 className="text-xl font-bold text-red-800 mb-4">
          Delete Product
        </h3>

        {/* Warning */}
        <p className="text-gray-700 mb-6">
          Are you sure you want to permanently delete{" "}
          <span className="font-semibold">{product.name}</span>?
          <br />
          <span className="text-sm text-red-600">
            This action cannot be undone.
          </span>
        </p>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="px-5 py-2 bg-gradient-to-r from-red-700 to-red-800 text-white rounded shadow"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
