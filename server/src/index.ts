// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { connectDatabase } from './database';
import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { resolvers, typeDefs } from './graphql';

const mount = async (app: Application) => {
	const db = await connectDatabase();
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		context: () => ({ db }),
	});
	server.applyMiddleware({ app, path: '/api' });

	if (process.env.NODE_ENV !== 'test') {
		app.listen(process.env.PORT, () => {
			console.log(`[tinyhouse]: http://localhost:${process.env.PORT}`);
		});
	}
};

mount(express());
