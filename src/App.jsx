import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Offers from "./pages/Offer";
import OrderTracking from "./pages/OrderTracking";
import OrderConfirmation from "./pages/OrderConfirmation";
import UserProfile from "./pages/UserProfile";

import { CartProvider } from "./context/CartContext";
import { OrderProvider } from "./context/OrderContext";
import ProtectedRoute from "./components/ProtectedRoute";

// ADMIN PAGES
import AdminDashboard from "./pages/admin/AdminDashboard";
import FoodList from "./pages/admin/FoodList";
import AddFood from "./pages/admin/AddFood";
import EditFood from "./pages/admin/EditFood";
import OrderList from "./pages/admin/OrderList"; // ✅ Added

function App() {
  const location = useLocation();

  // Hide navbar/footer on login/register
  const hideLayout = ["/login", "/register"].includes(location.pathname);

  return (
    <CartProvider>
      <OrderProvider>
        <div className="min-h-screen flex flex-col bg-yellow-50">
          {!hideLayout && <Navbar />}

          <main className="flex-1">
            <Routes>
              {/* AUTH */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* PUBLIC PAGES — PROTECTED */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/menu"
                element={
                  <ProtectedRoute>
                    <Menu />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/about"
                element={
                  <ProtectedRoute>
                    <About />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/offer"
                element={
                  <ProtectedRoute>
                    <Offers />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/track-order/:id"
                element={
                  <ProtectedRoute>
                    <OrderTracking />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/order-confirmation/:orderId"
                element={
                  <ProtectedRoute>
                    <OrderConfirmation />
                  </ProtectedRoute>
                }
              />

              {/* -------------------------------------- */}
              {/* ADMIN ROUTES (ADMIN ONLY) */}
              {/* -------------------------------------- */}

              <Route
                path="/admin"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/foods"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <FoodList />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/add-food"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <AddFood />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/edit-food/:id"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <EditFood />
                  </ProtectedRoute>
                }
              />

              {/* ✅ ADDED ADMIN ORDER ROUTE */}
              <Route
                path="/admin/orders"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <OrderList />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>

          {!hideLayout && <Footer />}
        </div>
      </OrderProvider>
    </CartProvider>
  );
}

export default App;
