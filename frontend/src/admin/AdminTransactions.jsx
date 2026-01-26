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
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-center h-40">
          <div className="text-gray-500">Loading transactions...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      {/* Header */}
      <div className="border-b border-gray-200 p-6">
        <h2 className="text-xl font-bold text-black">Transactions</h2>
        <p className="text-sm text-gray-500 mt-1">
          Customer payment transactions and status
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 text-left text-sm font-medium text-gray-700">Phone</th>
              <th className="p-4 text-left text-sm font-medium text-gray-700">Amount (KES)</th>
              <th className="p-4 text-left text-sm font-medium text-gray-700">Checkout ID</th>
              <th className="p-4 text-left text-sm font-medium text-gray-700">Status</th>
              <th className="p-4 text-left text-sm font-medium text-gray-700">Date</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {transactions.map((tx) => (
              <tr key={tx._id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 text-black font-medium">{tx.phoneNumber}</td>
                <td className="p-4">
                  <div className="font-bold text-black">KES {tx.amount}</div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-gray-600 font-mono bg-gray-50 px-3 py-1 rounded border border-gray-200">
                    {tx.checkoutRequestId.substring(0, 10)}...
                  </div>
                </td>
                <td className="p-4">
                  <StatusBadge status={tx.status} />
                </td>
                <td className="p-4 text-sm text-gray-600">
                  {new Date(tx.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {transactions.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-3">
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
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            </div>
            <p className="text-gray-500 font-medium">No transactions found</p>
            <p className="text-gray-400 text-sm mt-1">Transactions will appear here when customers make payments</p>
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    pending: "bg-yellow-100 text-yellow-800 border border-yellow-200",
    success: "bg-green-100 text-green-800 border border-green-200",
    failed: "bg-red-100 text-red-800 border border-red-200",
  };

  return (
    <span
      className={`px-3 py-1.5 rounded-full text-xs font-medium ${styles[status] || "bg-gray-100 text-gray-800 border border-gray-200"}`}
    >
      {status}
    </span>
  );
}