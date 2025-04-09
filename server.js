import express from "express";
import http from "node:http";
import { ApolloServer } from "apollo-server-express";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { loadFilesSync } from "@graphql-tools/load-files";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const typeDefs = loadFilesSync(path.join(__dirname, "**/*.graphql"));
const resolversArray = loadFilesSync(path.join(__dirname, "**/*.resolvers.js"));

const startApolloServer = async () => {
  const app = express();

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers: [...resolversArray],
  });

  const apolloServer = new ApolloServer({
    schema,
    playground: true, 
    formatError: (error) => ({
      message: error.message,
      locations: error.locations,
      stack: error.stack,
    }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: "/graphql" });

  const server = http.createServer(app);

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
    console.log(`server running on http://localhost:${PORT}`);
    console.log(
      `graphQL Playground available at http://localhost:${PORT}/graphql`
    );
  });
};

startApolloServer();
