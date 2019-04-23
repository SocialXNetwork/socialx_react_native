import { Document, Model } from 'mongoose';

export interface IDbInstance {
	User: Model<any, any>;
	File: Model<any, any>;
	Post: Model<any, any>;
    Comment: Model<any, any>;
    Like: Model<any, any>;
}