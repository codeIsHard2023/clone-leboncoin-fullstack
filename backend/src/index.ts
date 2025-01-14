import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { datasource } from "./datasource";
import { CategoriesResolver } from "./resolvers/CategoriesResolver";
import { AdsResolver } from "./resolvers/AdsResolver";
import { TagsResolver } from "./resolvers/TagsResolver";
import { User } from "./entities/User";
import { UserResolver } from "./resolvers/UserResolver";

const port: number = 3000;
const portClient: number = 5173;

async function initialize() {
  await datasource.initialize(); // wait connection to db before server start
  console.log("Datasource is connected");
  const schema = await buildSchema({
    resolvers: [CategoriesResolver, AdsResolver, TagsResolver, UserResolver],
  });

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, { listen: { port } });
  console.log(`GraphQL server ready at ${url} 🚀`);
}

initialize();
