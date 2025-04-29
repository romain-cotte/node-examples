import { ApolloServer } from '@apollo/server';
import { ApolloGateway } from '@apollo/gateway';
import { startStandaloneServer } from '@apollo/server/standalone';

const gateway = new ApolloGateway({
  serviceList: [
    { name: 'users', url: 'http://localhost:4001' },
    { name: 'reviews', url: 'http://localhost:4002' },
  ],
});

const server = new ApolloServer({
  gateway,
  subscriptions: false,
});


const { url } = await startStandaloneServer(server, {
  listen: { port: 4010 },
});

console.log(`🚀 Server ready at ${url}`);
