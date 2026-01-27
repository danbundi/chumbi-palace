import { useState } from "react";
import axios from "axios";

const CATEGORY_OPTIONS = [
  "Seeds and Nuts",
  "Spices & Salt",
  "Teas & Detox",
];

export default function AddProductModal({ onClose, onSuccess }) {
  const token = localStorage.getItem("adminToken");

  const [form, setForm] = useState({
    productCode: "",
    sku: "",
    name: "",
    category: [],
    tags: [],
    description: "",
    short_description: "",
    brand: "Chumbi Palace",
    variants: [
      { name: "Small Pack", weight: "0.25 kg", price: "", sku: "" },
      { name: "Mid Pack", weight: "0.5 kg", price: "", sku: "" },
      { name: "Large Pack", weight: "1 kg", price: "", sku: "" },
    ],
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCategoryToggle = (cat) => {
    setForm((prev) => ({
      ...prev,
      category: prev.category.includes(cat)
        ? prev.category.filter(c => c !== cat)
        : [...prev.category, cat],
    }));
  };

  const handleVariantChange = (index, field, value) => {
    const updated = [...form.variants];
    updated[index][field] = value;
    setForm({ ...form, variants: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();

      data.append("productCode", form.productCode);
      data.append("sku", form.sku);
      data.append("name", form.name);
      data.append("description", form.description);
      data.append("short_description", form.short_description);
      data.append("brand", form.brand);

      // IMPORTANT: backend expects JSON strings
      data.append("category", JSON.stringify(form.category));
      data.append("variants", JSON.stringify(form.variants));
      data.append(
        "tags",
        JSON.stringify(
            form.tags
            .split(",")
            .map(t => t.trim())
            .filter(Boolean)
        )
        );

      if (image) {
        data.append("image", image);
      }

      await axios.post(
        "api/api/admin/products",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      onSuccess();   // refresh products
      onClose();     // close modal
    } catch (err) {
      console.error(err);
      alert("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-2xl p-6 overflow-y-auto max-h-[90vh] border border-gray-200">

        {/* Header */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
          <h3 className="text-2xl font-bold text-black">Add New Product</h3>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-black hover:bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Codes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                name="productCode"
                placeholder="Product Code (prod_001)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent transition-all placeholder-gray-400"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <input
                name="sku"
                placeholder="Main SKU (CHIA-001)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent transition-all placeholder-gray-400"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <input
              name="name"
              placeholder="Product Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent transition-all placeholder-gray-400"
              onChange={handleChange}
              required
            />
          </div>

          {/* Categories */}
          <div>
            <p className="font-semibold mb-3 text-gray-800">Categories</p>
            <div className="flex gap-2 flex-wrap">
              {CATEGORY_OPTIONS.map(cat => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => handleCategoryToggle(cat)}
                  className={`px-4 py-2 rounded-full border transition-all duration-200 font-medium
                    ${form.category.includes(cat)
                      ? "bg-pink-600 text-white border-pink-600 shadow-sm"
                      : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"}
                  `}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <textarea
              name="description"
              placeholder="Product description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent transition-all placeholder-gray-400 resize-y"
            />
          </div>

          {/* Image */}
          <div>
            <p className="font-semibold mb-3 text-gray-800">Product Image</p>
            <input
              type="file"
              accept="image/*"
              onChange={e => setImage(e.target.files[0])}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-l-md file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
            />
          </div>

          {/* Variants */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-800">Variants</h4>
            <div className="space-y-4">
              {form.variants.map((v, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <input 
                    value={v.name} 
                    disabled 
                    className="px-3 py-2.5 border border-gray-300 rounded bg-gray-100 text-gray-700 cursor-not-allowed"
                  />
                  <input 
                    value={v.weight} 
                    disabled 
                    className="px-3 py-2.5 border border-gray-300 rounded bg-gray-100 text-gray-700 cursor-not-allowed"
                  />
                  <input
                    placeholder="Price"
                    type="number"
                    className="px-3 py-2.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent transition-all placeholder-gray-400"
                    required
                    onChange={e => handleVariantChange(i, "price", e.target.value)}
                  />
                  <input
                    placeholder="Variant SKU"
                    className="px-3 py-2.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent transition-all placeholder-gray-400"
                    required
                    onChange={e => handleVariantChange(i, "sku", e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <p className="font-semibold mb-3 text-gray-800">Tags</p>
            <input
              type="text"
              name="tags"
              placeholder="e.g. chia, seeds, superfood"
              value={form.tags}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent transition-all placeholder-gray-400"
            />
            <p className="text-sm text-gray-500 mt-2">
              Separate tags with commas
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
              disabled={loading}
              className="px-8 py-3 bg-pink-600 text-white font-medium rounded-lg hover:bg-pink-700 transition-colors shadow-sm hover:shadow disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px]"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin h-4 w-4 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
              ) : "Save Product"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}