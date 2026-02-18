import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminOrders() {
  const token = localStorage.getItem("adminToken");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/admin/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-black mb-6">Orders</h2>

      <div className="space-y-6">
        {orders.map(order => (
          <div key={order._id} className="p-5 border border-gray-300 rounded-xl">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-2xl font-bold text-black">KES {order.totalAmount}</div>
                <div className="text-gray-500 text-sm mt-1">
                  Order #{order._id.substring(0, 8)}
                </div>
              </div>
              <div className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                order.status === 'completed' ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {order.status}
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="text-gray-700 font-medium mb-3">Items:</div>
              
              {order.items.map((item, index) => (
                <div key={index} className="mb-3 last:mb-0">
                  <div className="flex justify-between">
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-gray-600 text-sm">
                        SKU: {item.variant?.sku} • {item.variant?.name} × {item.quantity}
                      </div>
                    </div>
                    <div className="text-pink-600 font-medium">
                      KES {item.subtotal}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}