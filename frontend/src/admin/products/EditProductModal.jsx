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
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <form
        onSubmit={submit}
        className="bg-white p-6 rounded-lg w-[480px] space-y-4"
      >
        <h3 className="text-xl font-bold">Edit Product</h3>

        {/* Product Name */}
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full border p-2 rounded"
          placeholder="Product name"
        />

        {/* Category */}
        <select
          value={category[0]}
          onChange={e => setCategory([e.target.value])}
          className="w-full border p-2 rounded"
        >
          <option value="Seeds and Nuts">Seeds & Nuts</option>
          <option value="Spices & Salt">Spices & Salts</option>
          <option value="Teas & Detox">Teas & Detox</option>
        </select>

        {/* Variants */}
        <div className="space-y-3">
          <h4 className="font-semibold">Variant Prices</h4>

          {variants.map((v, idx) => (
            <div
              key={v.sku}
              className="flex justify-between items-center border p-2 rounded"
            >
              <div>
                <div className="font-medium">{v.name}</div>
                <div className="text-xs text-gray-500">
                  {v.weight} • {v.sku}
                </div>
              </div>

              <input
                type="number"
                value={v.price}
                onChange={e => updateVariantPrice(idx, e.target.value)}
                className="w-24 border p-1 rounded"
              />
            </div>
          ))}
        </div>

        {/* Image */}
        <input
          type="file"
          onChange={e => setImage(e.target.files[0])}
        />

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
