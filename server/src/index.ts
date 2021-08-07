import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { resolvers, typeDefs } from './graphql';

export const app = express();
const port = 3000;

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app, path: '/api' });

if (process.env.NODE_ENV !== 'test') {
	app.listen(port, () => {
		console.log(`[tinyhouse]: http://localhost:${port}`);
	});
}
