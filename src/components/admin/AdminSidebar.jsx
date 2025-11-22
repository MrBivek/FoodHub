// components/admin/AdminSidebar.jsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  UtensilsCrossed,
  Plus,
  ListOrdered,
  Menu,
  X,
} from "lucide-react";

export default function AdminSidebar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const navItems = [
    { path: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/admin/foods", icon: UtensilsCrossed, label: "Food Items" },
    { path: "/admin/add-food", icon: Plus, label: "Add Food" },
    { path: "/admin/orders", icon: ListOrdered, label: "Orders" },
  ];

  const NavMenu = () => (
    <>
      {/* Header */}
      <h2 className="text-2xl font-bold mb-8 text-center tracking-wide border-b-2 border-white/30 pb-4">
        Admin Panel
      </h2>

      {/* Navigation */}
      <nav className="space-y-2">
        {navItems.map(({ path, icon: Icon, label }) => {
          const active = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                active
                  ? "bg-white text-red-500 font-bold shadow-lg"
                  : "hover:bg-white/20 hover:text-red-100 hover:pl-6"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Tagline */}
      <div className="mt-12 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
        <p className="text-sm text-white/80 text-center">
          Manage your restaurant efficiently
        </p>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden fixed top-20 left-4 z-50 bg-gradient-to-b from-[#FF7A38] to-[#E94E1B] text-white p-3 rounded-lg shadow-lg"
        aria-label="Toggle Sidebar"
      >
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 bg-gradient-to-b from-[#FF7A38] to-[#E94E1B] min-h-screen text-white p-6 shadow-2xl sticky top-0">
        <NavMenu />
      </aside>

      {/* Mobile Sidebar */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setOpen(false)}
          />

          {/* Sidebar Panel */}
          <aside className="lg:hidden fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-[#FF7A38] to-[#E94E1B] text-white p-6 shadow-2xl z-50 overflow-y-auto">
            <NavMenu />
          </aside>
        </>
      )}
    </>
  );
}
