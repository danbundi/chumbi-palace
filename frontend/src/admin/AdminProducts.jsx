import { useEffect, useState } from "react";
import axios from "axios";
import ProductTable from "./products/ProductTable";
import AddProductModal from "./products/AddProductModal";
import EditProductModal from "./products/EditProductModal";

export default function AdminProducts() {
  const token = localStorage.getItem("adminToken");

  const [products, setProducts] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/products`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setProducts(res.data);
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/admin/products/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-black">Product Management</h2>
        </div>

        <button
          onClick={() => setShowAdd(true)}
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
          Add Product
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="text-gray-500 text-sm font-medium">Total Products</div>
          <div className="text-2xl font-bold text-black mt-1">{products.length}</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="text-gray-500 text-sm font-medium">Categories</div>
          <div className="text-2xl font-bold text-black mt-1">
            {Array.from(new Set(products.flatMap(p => p.category))).length}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <ProductTable
          products={products}
          onEdit={setEditingProduct}
          onDelete={deleteProduct}
        />
      </div>

      {/* Modals */}
      {showAdd && (
        <AddProductModal
          onClose={() => setShowAdd(false)}
          onSuccess={fetchProducts}
        />
      )}

      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSuccess={fetchProducts}
        />
      )}
    </div>
  );
}