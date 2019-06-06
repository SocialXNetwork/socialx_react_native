import { ApolloServer } from 'apollo-server-express';

import { genDBInterface } from '../util/genDbInterface';
import { genSchemaServer } from '../util/genSchema';

export default async (app: any) => {
	console.log('database: Starting..');

	const schema = genSchemaServer();
	const db = await genDBInterface();

	const server = new ApolloServer({
		...schema,
		context: ({ req }) => ({
			authScope: req.headers.authorization,
			...db,
		}),
		uploads: {
			maxFieldSize: 1000000000,
			maxFiles: 20,
		},
		playground: true,
		introspection: true,
	});

	server.applyMiddleware({ app });

	console.log('database: Started');
};
