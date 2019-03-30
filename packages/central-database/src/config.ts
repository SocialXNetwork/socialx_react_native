export default {
	jwt_secret: process.env.JWT_SECRET || 'defaultSecret',
	port: parseInt(process.env.PORT || '1337', undefined),
	sslPort: parseInt(process.env.SSL_PORT || '17772', undefined),
	mongoose_path: `mongodb://${process.env.MONGO_URL || '127.0.0.1'}/${process.env.MONGO_TABLE}`,
};
