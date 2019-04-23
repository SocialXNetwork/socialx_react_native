import { gql } from 'apollo-server';
import * as fs from 'fs';
import * as glob from 'glob';
import { makeExecutableSchema } from 'graphql-tools';
import { mergeResolvers, mergeTypes } from 'merge-graphql-schemas';
import * as path from 'path';

export const genSchema = () => {
	const pathToModules = path.join(__dirname, '../database/modules');

	const graphqlTypes = glob.sync(`${pathToModules}/**/*.gql`).map((x) => fs.readFileSync(x, { encoding: 'utf8' }));

	const resolvers = glob.sync(`${pathToModules}/**/resolver?.?s`).map((resolver) => require(resolver).resolvers);

	return makeExecutableSchema({
		typeDefs: gql`
			scalar Upload
			scalar DateTime
			${mergeTypes(graphqlTypes)}
		`,
		resolvers: mergeResolvers(resolvers) as any,
	});
};

export const genSchemaServer = () => {
	const pathToModules = path.join(__dirname, '../database/modules');

	const graphqlTypes = glob.sync(`${pathToModules}/**/*.gql`).map((x) => fs.readFileSync(x, { encoding: 'utf8' }));

	const resolvers = glob.sync(`${pathToModules}/**/resolver?.?s`).map((resolver) => require(resolver).resolvers);

	return {
		typeDefs: gql`
			${mergeTypes(graphqlTypes)}
		`,
		resolvers: mergeResolvers(resolvers) as any,
	};
};

export const gqlSchema = () => {
	const pathToModules = path.join(__dirname, '../database/modules');

	const graphqlTypes = glob.sync(`${pathToModules}/**/*.gql`).map((x) => fs.readFileSync(x, { encoding: 'utf8' }));

	return mergeTypes(graphqlTypes);
};