import { Model } from 'mongoose';

export interface IContext {
	User: Model<any, any>;
	File: Model<any, any>;
	Post: Model<any, any>;
    Comment: Model<any, any>;
    Like: Model<any, any>;

	authScope: string;
}

export type Resolver = (parent: any, args: any, context: IContext, info: any) => any;

export type GraphqlMiddlewareFunc = (resolver: Resolver, parent: any, args: any, context: IContext, info: any) => any;

export interface IResolverMap {
	[key: string]: {
		[key: string]: Resolver;
	};
}