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
      "http://localhost:5000/api/admin/products",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setProducts(res.data);
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    await axios.delete(
      `http://localhost:5000/api/admin/products/${id}`,
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
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-amber-900">
          Product Management
        </h2>

        <button
          onClick={() => setShowAdd(true)}
          className="px-5 py-2 bg-green-600 text-white rounded"
        >
          + Add Product
        </button>
      </div>

      {/* Table */}
      <ProductTable
        products={products}
        onEdit={setEditingProduct}
        onDelete={deleteProduct}
      />

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
