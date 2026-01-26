import { useState } from "react";
import axios from "axios";

export default function EditProductModal({ product, onClose, onSuccess }) {
  const token = localStorage.getItem("adminToken");

  const [name, setName] = useState(product.name);
  const [category, setCategory] = useState(product.category);
  const [variants, setVariants] = useState(
    product.variants.map(v => ({ ...v }))
  );
  const [image, setImage] = useState(null);

  const updateVariantPrice = (index, price) => {
    const updated = [...variants];
    updated[index].price = Number(price);
    setVariants(updated);
  };

  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", JSON.stringify(category));
    formData.append("variants", JSON.stringify(variants));
    if (image) formData.append("image", image);

    await axios.put(
      `http://localhost:5000/api/admin/products/${product._id}`,
      formData,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-100 p-4">
      <div className="bg-white w-max h-max max-w-lg rounded-xl shadow-2xl p-6 border border-gray-200">
        
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
            Edit Product
          </h3>
          <p className="text-sm text-gray-500 mt-1">Update product details and pricing</p>
        </div>

        <form onSubmit={submit} className="space-y-6">

          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name
            </label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent transition-all placeholder-gray-400"
              placeholder="Enter product name"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={category[0]}
              onChange={e => setCategory([e.target.value])}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent transition-all appearance-none bg-white"
            >
              <option value="Seeds and Nuts">Seeds & Nuts</option>
              <option value="Spices & Salt">Spices & Salts</option>
              <option value="Teas & Detox">Teas & Detox</option>
            </select>
          </div>

          {/* Variants */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Variant Prices</h4>
            <div className="space-y-4">
              {variants.map((v, idx) => (
                <div
                  key={v.sku}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="mb-3 sm:mb-0">
                    <div className="font-medium text-black">{v.name}</div>
                    <div className="text-sm text-gray-500">
                      {v.weight} • {v.sku}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">₹</span>
                    <input
                      type="number"
                      value={v.price}
                      onChange={e => updateVariantPrice(idx, e.target.value)}
                      className="w-28 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent transition-all"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Update Product Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={e => setImage(e.target.files[0])}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-l-md file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
            />
            <p className="text-xs text-gray-500 mt-2">
              Leave empty to keep current image
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-8 py-3 bg-pink-600 text-white font-medium rounded-lg hover:bg-pink-700 transition-colors shadow-sm hover:shadow"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}