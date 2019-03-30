import { IResolvers } from 'graphql-tools';
import { MongoClient } from 'mongodb';
import { Model } from 'mongoose';

interface IResolverContext {
    User: Model<any, any>;
    authScope: string;
}

export type IResolverType = IResolvers<any, IResolverContext>;
