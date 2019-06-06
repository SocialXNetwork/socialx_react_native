import mongoose from 'mongoose';
import Modules from '../database/Modules';

import config from '../config';

export const genDBInterface = async () => {
	await mongoose.connect(config.mongoose_path, {
		useNewUrlParser: true,
		user: process.env.MONGO_USER,
		pass: process.env.MONGO_PASS,
		auth: {
			authdb: process.env.MONGO_AUTH_DB || process.env.MONGO_TABLE,
		} as any,
	});
	return Modules(mongoose);
};
