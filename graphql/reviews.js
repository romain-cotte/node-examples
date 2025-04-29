import gql from 'graphql-tag';
import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = gql`
  extend schema @link(url: "https://specs.apollo.dev/federation/v2.3",
    import: ["@external", "@key", "@override", "@shareable"])
    extend type User @key(fields: "id") {
      id: ID!
      username: String! @shareable
      reviews: [Review]
    }
    type Review {
      id: ID!
      content: String!
      author: User
    }
`;

const resolvers = {
  User: {
    reviews(user) {
      console.log('user:', user)
      return reviews.filter(r => r.userId === user.id);
    },
  },
  Review: {
    author(review) {
      console.log('review:', review)
      return { id: review.userId };
    },
  },
};

const reviews = [
  { id: "101", content: "Excellent", userId: "1" },
  { id: "102", content: "Pas mal", userId: "2" },
];

const server = new ApolloServer({
  schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
});


const { url } = await startStandaloneServer(server, {
  listen: { port: 4002 },
});

console.log(`🚀 Server ready at ${url}`);
