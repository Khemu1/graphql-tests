import express from "express";
import http from "node:http";
import { graphqlHTTP } from "express-graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { loadFilesSync } from "@graphql-tools/load-files";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { products } from "./products/products.model.js";
import { orders } from "./orders/orders.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const TypesArr = loadFilesSync(path.join(__dirname, `**/*.graphql`));

const schema = makeExecutableSchema({
  typeDefs: [...TypesArr],
});

const root = {
  products: () => products,
  orders: () => orders,
};

const app = express();
const server = http.createServer(app);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.get("/", (req, res) => {
  res.send("GraphQL API running! Visit /graphql");
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
