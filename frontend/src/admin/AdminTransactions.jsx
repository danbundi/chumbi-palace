import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/transactions",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTransactions(res.data);
    } catch (error) {
      console.error(
        "Failed to fetch transactions:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-gray-500">Loading transactions...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold mb-6">Transactions</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100 text-sm">
            <tr>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Amount (KES)</th>
              <th className="p-3 text-left">Checkout ID</th>
              <th className="p-3 text-left">Merchant ID</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Date</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {transactions.map((tx) => (
              <tr key={tx._id} className="hover:bg-gray-50">
                <td className="p-3">{tx.phoneNumber}</td>
                <td className="p-3 font-medium">{tx.amount}</td>
                <td className="p-3 text-xs text-gray-600">
                  {tx.checkoutRequestId}
                </td>
                <td className="p-3 text-xs text-gray-600">
                  {tx.merchantRequestID}
                </td>
                <td className="p-3">
                  <StatusBadge status={tx.status} />
                </td>
                <td className="p-3 text-sm text-gray-500">
                  {new Date(tx.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {transactions.length === 0 && (
          <p className="text-center text-gray-500 py-6">
            No transactions found
          </p>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    pending: "bg-yellow-100 text-yellow-800",
    success: "bg-green-100 text-green-800",
    failed: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        styles[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}
