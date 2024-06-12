import express from "express";
import sequelize from "./database/connect";
import { createHandler } from "graphql-http";
import schema from "./graphql/schema";
import { ApolloServer } from "@apollo/server";
import resolvers from "./graphql/resolvers";
import { sequelizeSync } from "./models";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

(async () => {
  await server.start();
  app.all(
    "/graphql",
    express.json(),
    expressMiddleware(server),
    createHandler({
      schema,
      rootValue: resolvers,
    })
  );
})();

const PORT = 3000;

sequelize
  .authenticate()
  .then(async () => {
    await sequelizeSync();
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
