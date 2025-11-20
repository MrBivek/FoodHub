import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <div className="w-64 bg-[#FF7A38] min-h-screen text-white p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>

      <nav className="space-y-4">
        <Link to="/admin" className="block hover:text-black">Dashboard</Link>
        <Link to="/admin/foods" className="block hover:text-black">Food Items</Link>
        <Link to="/admin/add-food" className="block hover:text-black">Add Food</Link>
      </nav>
    </div>
  );
}
