import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminOrders() {
  const token = localStorage.getItem("adminToken");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/orders", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Orders</h2>

      {orders.map(order => (
        <div key={order._id} className="border-b py-4 space-y-2">
          <p><strong>Total:</strong> KES {order.totalAmount}</p>
          <p><strong>Status:</strong> {order.status}</p>

          {/* ITEMS */}
          <div className="mt-2">
            <p className="font-semibold">Items:</p>

            {order.items.map((item, index) => (
              <div
                key={index}
                className="ml-4 text-sm text-gray-700"
              >
                <p>
                  • SKU: <strong>{item.variant?.sku}</strong>
                </p>
                <p>
                  {item.name} ({item.variant?.name}) × {item.quantity}
                </p>
                <p>
                  Subtotal: KES {item.subtotal}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
