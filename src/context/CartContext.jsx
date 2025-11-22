// context/CartContext.jsx - Enhanced with localStorage persistence
import { createContext, useContext, useMemo, useState, useEffect } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("foodhub_cart");
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        } else {
          console.warn("Invalid cart data in localStorage, resetting.");
          localStorage.removeItem("foodhub_cart");
        }
      }
    } catch (err) {
      console.error("Failed to load cart:", err);
      localStorage.removeItem("foodhub_cart");
    }
    setIsHydrated(true);
  }, []);

  // Save cart to localStorage whenever it changes and after hydration
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem("foodhub_cart", JSON.stringify(items));
      } catch (err) {
        console.error("Failed to save cart:", err);
      }
    }
  }, [items, isHydrated]);

  // Add product or increase quantity if exists
  const addItem = (product) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Remove product completely by id
  const removeItem = (id) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  // Set quantity for a specific product; remove if qty <= 0
  const setQuantity = (id, qty) => {
    setItems((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, quantity: Math.max(0, qty) } : p))
        .filter((p) => p.quantity > 0)
    );
  };

  // Increment or decrement quantity by delta; remove if qty <= 0
  const updateQuantity = (id, delta) => {
    setItems((prev) =>
      prev
        .map((p) =>
          p.id === id ? { ...p, quantity: Math.max(0, p.quantity + delta) } : p
        )
        .filter((p) => p.quantity > 0)
    );
  };

  // Clear the entire cart
  const clear = () => {
    setItems([]);
    // localStorage will be updated automatically by the useEffect above
  };

  // Calculate totals: count and total amount
  const totals = useMemo(() => {
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const amount = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    return { count, amount };
  }, [items]);

  const value = {
    items,
    addItem,
    removeItem,
    setQuantity,
    updateQuantity,
    clear,
    totals,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
