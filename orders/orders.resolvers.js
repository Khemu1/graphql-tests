import { getAllOrders, insertOrder } from "./orders.model.js";

export default {
  Query: {
    orders: () => {
      console.log("Fetching orders...");
      try {
        const orders = getAllOrders();
        if (!orders || orders.length === 0) {
          throw new Error("No orders found");
        }
        return orders;
      } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
      }
    },
  },
  Mutation: {
    addOrder: (_, args) => {
      const newOrder = args;
      console.log("new order recvied, ",newOrder)
      return insertOrder(newOrder);
    },
  },
};
