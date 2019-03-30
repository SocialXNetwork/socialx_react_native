import { ApolloServer } from 'apollo-server-express';

import mongoose from 'mongoose';

import config from '../config';

export default async (app: any) => {
	console.log('database: Starting..');

	await mongoose.connect(config.mongoose_path, {
		useNewUrlParser: true,
		user: process.env.MONGO_USER,
		pass: process.env.MONGO_PASS,
		auth: {
			authdb: process.env.MONGO_AUTH_DB || process.env.MONGO_TABLE,
		},
	});

	const server = new ApolloServer({
		typeDefs: {} as any,
		resolvers: {} as any,
		context: ({ req }) => ({
			authScope: req.headers.authorization,
			...{},
		}),
		playground: true,
		introspection: true,
	});

	server.applyMiddleware({ app });

	console.log('database: Started');
};
