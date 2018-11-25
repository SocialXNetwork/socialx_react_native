import { eos } from '../api';

export default (config: { [prop: string]: any }) => ({
	getBlockHeight: () =>
		new Promise((resolve, reject) => {
			eos(config).getInfo((error: any, info: any) => {
				if (error) {
					reject(error);
				} else {
					resolve(info);
				}
			});
		}),
	getCurrentBlockInfo: () =>
		new Promise((resolve, reject) => {
			eos(config).getInfo((error: any, info: any) => {
				if (error) {
					reject(error);
				}
				resolve(info);
			});
		}),
});
