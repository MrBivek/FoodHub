// components/admin/AdminSidebar.jsx
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, UtensilsCrossed, Plus, ListOrdered } from "lucide-react";

export default function AdminSidebar() {
  const location = useLocation();

  const navItems = [
    { path: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/admin/foods", icon: UtensilsCrossed, label: "Food Items" },
    { path: "/admin/add-food", icon: Plus, label: "Add Food" },
    { path: "/admin/orders", icon: ListOrdered, label: "Orders" },
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-[#FF7A38] to-[#E94E1B] min-h-screen text-white p-6 shadow-2xl">
      <h2 className="text-2xl font-bold mb-8 text-center tracking-wide border-b-2 border-white/30 pb-4">
        Admin Panel
      </h2>

      <nav className="space-y-2">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-white text-[#E94E1B] font-bold shadow-lg"
                  : "hover:bg-white/20 hover:pl-6"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-12 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
        <p className="text-sm text-white/80 text-center">
          Manage your restaurant efficiently
        </p>
      </div>
    </div>
  );
}