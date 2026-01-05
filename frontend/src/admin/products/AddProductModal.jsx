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
        "http://localhost:5000/api/admin/products",
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
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl p-6 overflow-y-auto max-h-[90vh]">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-amber-900">Add New Product</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-black">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Codes */}
          <div className="grid grid-cols-2 gap-4">
            <input
              name="productCode"
              placeholder="Product Code (prod_001)"
              className="input"
              onChange={handleChange}
              required
            />
            <input
              name="sku"
              placeholder="Main SKU (CHIA-001)"
              className="input"
              onChange={handleChange}
              required
            />
          </div>

          <input
            name="name"
            placeholder="Product Name"
            className="input w-full"
            onChange={handleChange}
            required
          />

          {/* Categories */}
          <div>
            <p className="font-semibold mb-2">Categories</p>
            <div className="flex gap-3 flex-wrap">
              {CATEGORY_OPTIONS.map(cat => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => handleCategoryToggle(cat)}
                  className={`px-4 py-2 rounded-full border
                    ${form.category.includes(cat)
                      ? "bg-emerald-600 text-white"
                      : "bg-white text-gray-700"}
                  `}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
            <textarea
            name="description"
            placeholder="Product description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            />

          {/* Image */}
          <div>
            <p className="font-semibold mb-2">Product Image</p>
            <input
              type="file"
              accept="image/*"
              onChange={e => setImage(e.target.files[0])}
            />
          </div>

          {/* Variants */}
          <div>
            <h4 className="font-semibold mb-3">Variants</h4>
            <div className="space-y-4">
              {form.variants.map((v, i) => (
                <div key={i} className="grid grid-cols-4 gap-3 bg-amber-50 p-4 rounded-xl">
                  <input value={v.name} disabled className="input bg-gray-100" />
                  <input value={v.weight} disabled className="input bg-gray-100" />
                  <input
                    placeholder="Price"
                    type="number"
                    className="input"
                    required
                    onChange={e => handleVariantChange(i, "price", e.target.value)}
                  />
                  <input
                    placeholder="Variant SKU"
                    className="input"
                    required
                    onChange={e => handleVariantChange(i, "sku", e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
        <div>
        <p className="font-semibold mb-2">Tags</p>
        <input
            type="text"
            name="tags"
            placeholder="e.g. chia, seeds, superfood"
            value={form.tags}
            onChange={handleChange}
            className="input w-full"
        />
        <p className="text-sm text-gray-500 mt-1">
            Separate tags with commas
        </p>
        </div>


          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="px-5 py-2 rounded-lg border">
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-lg shadow"
            >
              {loading ? "Saving..." : "Save Product"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
