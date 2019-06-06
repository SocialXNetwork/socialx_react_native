import { GraphQLScalarType, Kind, KindEnum } from 'graphql';

export const DateTime = new GraphQLScalarType({
	name: 'DateTime',
	description: 'DateTime data type to store date time data types',
	serialize: (value: number) => {
		return new Date(value);
	},
	parseValue: (value: Date | string) => {
		if (typeof value === 'string') {
			return new Date(value).getTime();
		}
		return value.getTime();
	},
	parseLiteral: (ast) => {
		if (ast.kind === Kind.INT) {
			return parseInt(ast.value, 10);
		}
		return null;
	},
});
