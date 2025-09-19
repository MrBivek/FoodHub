import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // {id, name, price, img, quantity}

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

  const removeItem = (id) => setItems((prev) => prev.filter((p) => p.id !== id));

  const setQuantity = (id, qty) => {
    setItems((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, quantity: Math.max(0, qty) } : p))
        .filter((p) => p.quantity > 0)
    );
  };

  const clear = () => setItems([]);

  const totals = useMemo(() => {
    const count = items.reduce((s, i) => s + i.quantity, 0);
    const amount = items.reduce((s, i) => s + i.quantity * i.price, 0);
    return { count, amount };
  }, [items]);

  const value = { items, addItem, removeItem, setQuantity, clear, totals };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
