import { getAllProducts } from "./products.model.js";

export default {
  Query: {
    products: () => {
      console.log("Fetching products...");
      try {
        const products = getAllProducts();
        if (!products || products.length === 0) {
          throw new Error("No products found");
        }
        return products;
      } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
      }
    },
  },
};
