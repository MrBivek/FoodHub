import AdminSidebar from "../../components/admin/AdminSidebar";

export default function AdminDashboard() {
  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 p-10">
        <h1 className="text-4xl font-bold mb-6 text-[#E94E1B]">Admin Dashboard</h1>

        <div className="grid grid-cols-3 gap-6">
          <div className="p-6 bg-white shadow rounded-xl border border-[#FF7A38]">
            <h2 className="text-xl font-bold">Total Foods</h2>
            <p className="text-3xl mt-3">—</p>
          </div>

          <div className="p-6 bg-white shadow rounded-xl border border-[#FF7A38]">
            <h2 className="text-xl font-bold">Orders</h2>
            <p className="text-3xl mt-3">—</p>
          </div>

          <div className="p-6 bg-white shadow rounded-xl border border-[#FF7A38]">
            <h2 className="text-xl font-bold">Users</h2>
            <p className="text-3xl mt-3">—</p>
          </div>
        </div>
      </div>
    </div>
  );
}
