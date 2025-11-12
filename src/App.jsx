import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Offers from "./pages/Offers";
import OrderTracking from "./pages/OrderTracking";
import { CartProvider } from "./context/CartContext";
import { OrderProvider } from "./context/OrderContext";

export default function App() {
  return (
    <CartProvider>
      <OrderProvider>
        <div className="min-h-screen flex flex-col bg-yellow-50">
          <Navbar />
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
              {/* Add other routes as needed */}
            </Routes>
          </main>
          <Footer />
        </div>
      </OrderProvider>
    </CartProvider>
  );
}
