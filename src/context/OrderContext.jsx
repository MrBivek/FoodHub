import { createContext, useContext, useState } from "react";

const OrderContext = createContext();

export const ORDER_STATUS = {
  PLACED: 0,
  PREPARING: 1,
  READY: 2,
  COMPLETED: 3,
  CANCELLED: 4,
};

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);

  // Place a new order with items and totals; returns new order ID
  const placeOrder = ({ items, totals }) => {
    const orderId = Date.now().toString(); // simple unique id
    const newOrder = {
      id: orderId,
      items,
      totals,
      status: ORDER_STATUS.PLACED,
      createdAt: new Date(),
    };
    setOrders((prev) => [...prev, newOrder]);
    return orderId;
  };

  // Get order details by id
  const getOrderById = (id) => {
    return orders.find((o) => o.id === id) || null;
  };

  return (
    <OrderContext.Provider value={{ orders, placeOrder, getOrderById, ORDER_STATUS }}>
      {children}
    </OrderContext.Provider>
  );
}

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within OrderProvider");
  }
  return context;
};
