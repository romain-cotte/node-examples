import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import gql from 'graphql-tag';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = gql`
  schema @link(url: "https://specs.apollo.dev/federation/v2.3", import: ["@external", "@key", "@override", "@shareable"]) {
    query: Query
  }

  type Query {
    user(id: ID!): User @shareable
  }

  type User @key(fields: "id") {
    id: ID!
    username: String! @shareable
    birthdate: String!
  }
`;

const resolvers = {

  Query: {
    user: (_, { id }) => {
      console.log(`resolving user by id '${id}'`);
      return users.find(user => user.id === id);
    }
  },

  User: {
    __resolveReference(user) {
      console.log('user:', user)
      return users.find(u => u.id === user.id);
    },
  },
};

const users = [
  { id: "1", username: "alice", birthdate: "1990-01-01" },
  { id: "2", username: "bob", birthdate: "1985-05-12" },
];

const server = new ApolloServer({
  schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4001 },
});

console.log(`🚀 Server ready at ${url}`);
