import { useEffect, useState } from "react";
import API from "../../utils/API";
import AdminSidebar from "../../components/admin/AdminSidebar";

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await API.get("/orders");
      setOrders(res.data);
    } catch (err) {
      console.error("Load orders error:", err);
      setError(err.response?.data?.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    if (!status) return;
    setUpdatingId(id);
    try {
      await API.put(`/orders/${id}/status`, { status });
      await loadOrders();
    } catch (err) {
      console.error("Update status error:", err);
      alert(err.response?.data?.message || "Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <div className="flex-1 p-10 bg-[#FFF7F3]">
        <h1 className="text-4xl font-bold text-[#E94E1B] mb-6">Orders Management</h1>

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#FF7A38] border-t-transparent"></div>
            <p className="mt-4 text-gray-700">Loading orders...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {!loading && !error && orders.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow">
            <p className="text-gray-600 text-lg">No orders yet</p>
          </div>
        )}

        {!loading && !error && orders.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg overflow-auto">
            <table className="w-full min-w-[700px]">
              <thead className="bg-gradient-to-r from-[#FF7A38] to-[#E94E1B] text-white">
                <tr>
                  <th className="p-4 text-left">Order ID</th>
                  <th className="p-4 text-left">Customer</th>
                  <th className="p-4 text-left">Total</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Items</th>
                  <th className="p-4 text-left">Date</th>
                  <th className="p-4 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((o) => (
                  <tr key={o._id} className="border-b hover:bg-orange-50 transition">
                    <td className="p-4 font-mono text-sm">#{o._id.slice(-8)}</td>
                    <td className="p-4">
                      <div>
                        <p className="font-semibold">{o.userId?.name || "N/A"}</p>
                        <p className="text-sm text-gray-600">{o.userId?.email || ""}</p>
                      </div>
                    </td>
                    <td className="p-4 font-bold text-[#FF7A38]">
                      Rs {(o.total || o.totalAmount || 0).toFixed(2)}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${
                          o.status === "delivered"
                            ? "bg-green-100 text-green-700"
                            : o.status === "cancelled"
                            ? "bg-red-100 text-red-700"
                            : o.status === "on the way"
                            ? "bg-blue-100 text-blue-700"
                            : o.status === "preparing"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {o.status}
                      </span>
                    </td>
                    <td className="p-4">{o.items?.length || 0} items</td>
                    <td className="p-4 text-sm text-gray-600">
                      {new Date(o.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <select
                        aria-label={`Update status for order #${o._id.slice(-8)}`}
                        onChange={(e) => updateStatus(o._id, e.target.value)}
                        className="border-2 border-[#FF7A38] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7A38]"
                        disabled={updatingId === o._id}
                        value={o.status || ""}
                      >
                        <option value="" disabled>
                          Update Status
                        </option>
                        <option key="pending" value="pending">
                          Pending
                        </option>
                        <option key="preparing" value="preparing">
                          Preparing
                        </option>
                        <option key="on-the-way" value="on the way">
                          On the Way
                        </option>
                        <option key="delivered" value="delivered">
                          Delivered
                        </option>
                        <option key="cancelled" value="cancelled">
                          Cancelled
                        </option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
