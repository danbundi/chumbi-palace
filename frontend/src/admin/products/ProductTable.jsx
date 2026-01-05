export default function ProductTable({ products, onEdit, onDelete }) {
  return (
    <table className="w-full bg-white rounded shadow">
      <thead>
        <tr className="border-b text-left">
          <th className="p-3">Name</th>
          <th className="p-3">Image</th>
          <th className="p-3">Category</th>
          <th className="p-3">Variants</th>
          <th className="p-3">Actions</th>
        </tr>
      </thead>

      <tbody>
        {products.map(product => (
          <tr key={product._id} className="border-b align-top">
            <td className="p-3 font-medium">{product.name}</td>

            <td className="p-3">
              <img
                src={product.image}
                alt={product.name}
                className="w-14 h-14 object-cover rounded"
              />
            </td>

            <td className="p-3">
              {product.category.join(", ")}
            </td>

            <td className="p-3 space-y-1">
              {product.variants.map(v => (
                <div key={v.sku} className="text-sm">
                  {v.name} ({v.weight}) – KES {v.price}
                </div>
              ))}
            </td>

            <td className="p-3 space-x-2">
              <button
                onClick={() => onEdit(product)}
                className="px-3 py-1 bg-blue-600 text-white rounded"
              >
                Edit
              </button>

              <button
                onClick={() => onDelete(product._id)}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
