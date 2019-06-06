import jwt from 'jsonwebtoken';
import { config } from './sensitiveData';

const Verifyjw: any = (token: string, secret: string) =>
	new Promise((resolve) => {
		jwt.verify(token, secret, (err: any, res: any) => {
			if (err) {
				resolve({ error: true, result: err });
			}
			resolve({ error: false, result: res });
		});
	});

export const decryptUserId = async (authScope: string) => {
	const authorization = authScope;
	const bearerLength = 'Bearer '.length;
	if (!authorization) {
		return null;
	}
	if (authorization.length <= bearerLength) {
		return null;
	}

	const token = authorization.slice(bearerLength);
	const { error, result } = await Verifyjw(token, config.jwt_secret);
	if (error) {
		return null;
	}

	return result._id;
};
