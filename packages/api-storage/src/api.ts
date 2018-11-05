import { Ipfslib } from './ipfslib';
import { IProviderParams } from './types';

export const storageApiFactory = (
	config: IProviderParams = {
		host: '0.0.0.0',
		port: '8080',
		protocol: 'http',
		root: '/api/v0',
	},
	platform: string,
) => {
	const ipfs = new Ipfslib(config, platform);

	return {
		uploadFile: ipfs.addFileBN,
	};
};

export type IStorageApiFactory = ReturnType<typeof storageApiFactory>;
