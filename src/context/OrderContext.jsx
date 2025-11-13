import { createContext, useContext, useState } from "react";

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);

  const placeOrder = ({ items, totals }) => {
    const orderId = Date.now().toString();
    const newOrder = {
      id: orderId,
      items,
      totals,
      status: 0, // 0: placed, 1: preparing, etc.
      createdAt: new Date(),
    };
    setOrders((prev) => [...prev, newOrder]);
    return orderId;
  };

  const getOrderById = (id) => orders.find((o) => o.id === id);

  return (
    <OrderContext.Provider value={{ orders, placeOrder, getOrderById }}>
      {children}
    </OrderContext.Provider>
  );
}

export const useOrder = () => useContext(OrderContext);
