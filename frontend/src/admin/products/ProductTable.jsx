export default function ProductTable({ products, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-4 text-left text-sm font-semibold text-gray-800">
              Name
            </th>
            <th className="p-4 text-left text-sm font-semibold text-gray-800">
              Image
            </th>
            <th className="p-4 text-left text-sm font-semibold text-gray-800">
              Category
            </th>
            <th className="p-4 text-left text-sm font-semibold text-gray-800">
              Variants
            </th>
            <th className="p-4 text-left text-sm font-semibold text-gray-800">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {products.map(product => (
            <tr 
              key={product._id} 
              className="hover:bg-gray-50 transition-colors duration-150"
            >
              <td className="p-4">
                <div className="font-medium text-black">{product.name}</div>
                <div className="text-xs text-gray-500 mt-1">
                  SKU: {product.sku}
                </div>
              </td>

              <td className="p-4">
                <div className="w-16 h-16 rounded-lg border border-gray-200 overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='3' width='18' height='18' rx='2' ry='2'%3E%3C/rect%3E%3Ccircle cx='8.5' cy='8.5' r='1.5'%3E%3C/circle%3E%3Cpolyline points='21 15 16 10 5 21'%3E%3C/polyline%3E%3C/svg%3E";
                    }}
                  />
                </div>
              </td>

              <td className="p-4">
                <div className="flex flex-wrap gap-1">
                  {product.category.map((cat, index) => (
                    <span 
                      key={index} 
                      className="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700 border border-gray-200"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </td>

              <td className="p-4">
                <div className="flex flex-col lg:flex-row gap-2">
                  {product.variants.map(v => (
                    <div 
                      key={v.sku} 
                      className="min-w-[120px] border border-gray-200 rounded-lg p-3 bg-gray-50"
                    >
                      <div className="font-medium text-gray-800 text-sm">{v.name}</div>
                      <div className="text-xs text-gray-600 mt-1">{v.weight}</div>
                      <div className="font-semibold text-pink-600 text-sm mt-2">
                        ₹{v.price}
                      </div>
                      <div className="text-xs text-gray-500 truncate mt-1">{v.sku}</div>
                    </div>
                  ))}
                </div>
              </td>

              <td className="p-4">
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => onEdit(product)}
                    className="px-4 py-2 bg-pink-600 text-white text-sm font-medium rounded-lg hover:bg-pink-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4" 
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
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(product._id)}
                    className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4" 
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
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {products.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-2">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-12 w-12 mx-auto" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1} 
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" 
              />
            </svg>
          </div>
          <p className="text-gray-500 font-medium">No products found</p>
          <p className="text-gray-400 text-sm mt-1">Add your first product to get started</p>
        </div>
      )}
    </div>
  );
}