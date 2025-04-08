import {
  getAllProducts,
  getProductPrice,
  getProductById,
  insertProduct,
  inertNewReview,
} from "./products.model.js";

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

    productsByPrice: (_, args) => {
      return getProductPrice(args.min, args.max);
    },
    productById: (_, args) => {
      const { id } = args;
      const product = getProductById(id);
      if (!product) {
        throw new Error(`Product with ID ${id} not found`);
      }
      return product;
    },
  },
  Mutation: {
    addProduct: (_, args) => {
      const { id, description, price } = args;
      console.log("new product received:", { id, description, price });
      return insertProduct(id, description, price);
    },
    addNewProductReview: (_, args) => {
      const { productId, id, rating, comment } = args;
      const review = { id, rating, comment };
      console.log("new review received:", { productId, review });
      return inertNewReview(productId, review);
    },
  },
};
