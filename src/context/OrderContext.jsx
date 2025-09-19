import { createContext, useContext, useState } from "react";

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);

  // Place a new order
  const placeOrder = ({ items, totals }) => {
    const orderId = Date.now().toString(); // unique ID
    const newOrder = {
      id: orderId,
      items,
      totals,
      status: 0, // 0 = Placed, 1 = Preparing, 2 = On the Way, 3 = Delivered
      createdAt: new Date(),
    };
    setOrders((prev) => [...prev, newOrder]);
    return orderId;
  };

  // Get a specific order
  const getOrderById = (id) => orders.find((o) => o.id === id);

  return (
    <OrderContext.Provider value={{ orders, placeOrder, getOrderById }}>
      {children}
    </OrderContext.Provider>
  );
}

export const useOrder = () => useContext(OrderContext);
