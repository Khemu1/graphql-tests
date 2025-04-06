import express from "express";
import http from "node:http";
import { graphqlHTTP } from "express-graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { loadFilesSync } from "@graphql-tools/load-files";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";

// 1. Import your data models properly
import { orders } from "./orders/orders.model.js";
import { products } from "./products/products.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const typeDefs = loadFilesSync(path.join(__dirname, "**/*.graphql"));

const resolvers = {
  Query: {
    products: () => {
      console.log("Fetching products...");
      try {
        if (!products || products.length === 0) {
          throw new Error("No products found");
        }
        return products;
      } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
      }
    },
    orders: () => {
      console.log("Fetching orders...");
      try {
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
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express();
const server = http.createServer(app);

app.use(express.json());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
    customFormatErrorFn: (error) => ({
      message: error.message,
      locations: error.locations,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    }),
  })
);

app.get("/", (req, res) => {
  res.json({
    status: "running",
    graphqlEndpoint: "/graphql",
    timestamp: new Date().toISOString(),
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(
    `GraphQL playground available at http://localhost:${PORT}/graphql`
  );
});
