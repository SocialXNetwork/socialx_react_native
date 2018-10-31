import { Ipfslib } from './ipfslib';
import { IListenerProgess, IProviderParams } from './types';

export const storageApiFactory = (
	config: IProviderParams = {
		host: '0.0.0.0',
		port: '8080',
		protocol: 'http',
		root: '/api/v0',
	},
) => {
	const ipfs = new Ipfslib(config);

	return {
		uploadFile: (
			path: string,
			onStart?: (uploadId: string) => void,
			onProgress?: (data: IListenerProgess & { uploadId: string }) => void,
		): Promise<{ Hash: string; Name: string; Size: string }> =>
			ipfs.addFileBN(path, onStart, onProgress),
	};
};

export type IStorageApiFactory = ReturnType<typeof storageApiFactory>;
