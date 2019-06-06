import bcrypt from 'bcryptjs';
import Config from '../../../../config';

export const hashPass = (password: string) =>
	new Promise((resolve, reject) => {
		const slatRounds = 10;
		bcrypt.hash(password, slatRounds, (err: any, hash: string) => {
			if (err) {
				reject(err);
			} else {
				resolve(hash);
			}
		});
	});
export const comparePassword = (password: string, hash: string) => bcrypt.compare(password, hash);
export const config = Config;
