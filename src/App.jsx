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

function App() {
  const location = useLocation();

  // Hide header + footer on login & register pages
  const hideLayout = ["/login", "/register"].includes(location.pathname);

  return (
    <CartProvider>
      <OrderProvider>
        <div className="min-h-screen flex flex-col bg-yellow-50">

          {/* Show Navbar only if NOT login/register */}
          {!hideLayout && <Navbar />}

          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/offer" element={<Offers />} />
              <Route path="/track-order/:id" element={<OrderTracking />} />
              <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
              <Route path="/profile" element={<UserProfile />} />
            </Routes>
          </main>

          {/* Show Footer only if NOT login/register */}
          {!hideLayout && <Footer />}
        </div>
      </OrderProvider>
    </CartProvider>
  );
}

export default App;
